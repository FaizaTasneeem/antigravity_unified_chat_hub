import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const BASE_DIR = path.join(os.homedir(), '.gemini', 'antigravity-ide', 'brain');

const getRawChatFilePath = (conversationId) => path.join(BASE_DIR, conversationId, '.system_generated', 'logs', 'transcript.jsonl');
const getCleanChatFilePath = (conversationId) => path.join(import.meta.dirname, 'normalized_chats', `${conversationId}_output.json`);

async function getRawChatsDirNames() {
    try {
        const entries = await readdir(BASE_DIR, { withFileTypes: true });
        const folderNames = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
        return folderNames;
    }
    catch (error) {
        console.log('Error reading directory:', error);
    }
}

async function readRawChats(conversationId) {
    try {
        const content = await readFile(getRawChatFilePath(conversationId), 'utf-8');
        return content;
    }
    catch (err) {
        console.log('Error reading file:', err);
    }
}

async function writeCleanChats(conversationId, content) {
    try {
        const output_dir = path.join(import.meta.dirname, 'normalized_chats');
        await mkdir(output_dir, { recursive: true });
        await writeFile(getCleanChatFilePath(conversationId), JSON.stringify(content, null, 2), 'utf-8');
    }
    catch (err) {
        console.log('Error writing file:', err);
    }
}

function generateCleanContent(rawContent) {
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

        return {
            sender,
            text,
            time: new Date(step.created_at).toLocaleString()
        }

    })
    return cleanedFilteredStepsList;
}

async function run() {
    try {
        const folderNames = await getRawChatsDirNames();
        const promises = (folderNames || []).map(async (folderName) => {
            const rawContent = await readRawChats(folderName);
            if (!rawContent) return;
            const cleanContent = generateCleanContent(rawContent);
            await writeCleanChats(folderName, cleanContent);
        });
        await Promise.allSettled(promises);
    }
    catch (err) {
        console.log('Error running process: ', err);
    }
}

run();