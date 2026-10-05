import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import { BASE_DIR, OUTPUT_DIR, getRawChatFilePath, getCleanChatFilePath } from '../utils.js';
import { getConversationTitle } from './chat_title_extractor.js'

async function getRawChatsDirNames() {
    try {
        const entries = await readdir(BASE_DIR, { withFileTypes: true });
        const folderNames = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
        return folderNames;
    }
    catch (error) {
        console.log('Error reading raw chat files directory:', error);
    }
}

async function readRawChats(conversationId) {
    try {
        const content = await readFile(getRawChatFilePath(conversationId), 'utf-8');
        return content;
    }
    catch (err) {
        console.log('Error reading raw chat file:', err);
    }
}

async function writeCleanChats(conversationId, content) {
    try {
        await writeFile(getCleanChatFilePath(conversationId), JSON.stringify(content, null, 2), 'utf-8');
    }
    catch (err) {
        console.log('Error writing clean chat file:', err);
    }
}

function generateCleanContent(conversationId, chatTitle, rawContent) {
    try {
        const jsonArray = rawContent.trim().split('\n').filter(Boolean).map(line => JSON.parse(line));
        const filteredStepsList = jsonArray.filter(step => step.type === "USER_INPUT" || (step.type === "PLANNER_RESPONSE" && step.content));

        const cleanedFilteredStepsList = filteredStepsList.map(step => {
            let sender;
            let text;

            if (step.type === "USER_INPUT") {
                sender = "user";
                const userRequestMatch = step.content?.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);
                text = userRequestMatch ? userRequestMatch[1].trim() : step.content;
            }
            else if (step.type === "PLANNER_RESPONSE") {
                sender = "assistant";
                text = step.content;
            }

            return { sender, text, time: new Date(step.created_at).toLocaleString() }
        })
        return { id: conversationId, title: chatTitle, messages: cleanedFilteredStepsList };
    }
    catch (err) {
        console.log('Error generating clean content: ', err);
    }
}

export default async function normalize_chats() {
    try {
        await mkdir(OUTPUT_DIR, { recursive: true });

        const folderNames = await getRawChatsDirNames() || [];
        const BATCH_SIZE = 15;
        let outputFilesList = [];

        for (let i = 0; i < folderNames.length; i += BATCH_SIZE) {
            const batch = folderNames.slice(i, i + BATCH_SIZE);
            const promises = batch.map(async (folderName) => {
                const rawContent = await readRawChats(folderName);
                if (!rawContent) return;
                const chatTitle = getConversationTitle(folderName);
                const cleanContent = generateCleanContent(folderName, chatTitle, rawContent);
                if (!cleanContent) return;
                await writeCleanChats(folderName, cleanContent);
                return { conversationId: folderName, chatTitle };
            });
            outputFilesList = [...outputFilesList, ...await Promise.allSettled(promises)];
        }
        const finalOutputFilesList = outputFilesList.filter(item => item.status === "fulfilled" && item.value).map(item => item.value);
        return finalOutputFilesList;
    }
    catch (err) {
        console.log('Error running normalizing process: ', err);
    }
}