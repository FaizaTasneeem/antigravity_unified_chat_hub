import { readFile, readdir } from "node:fs/promises";
import path from 'node:path';
import { OUTPUT_DIR, getCleanChatFilePath } from '../utils.js';

export async function getChatMessages(chatId) {
    try {
        const cleanChatFilePath = getCleanChatFilePath(chatId);
        const content = await readFile(cleanChatFilePath, 'utf-8');
        return content;
    }
    catch (err) {
        console.log('Error reading clean chat file:', err);
    }
}

export async function getSearchFileList(searchString) {
    try {
        let searchResultFileList = [];
        const files = await readdir(OUTPUT_DIR, { withFileTypes: true });

        for (const file of files) {
            if (file.isFile() && file.name.endsWith('.json')) {
                const fullPath = path.join(OUTPUT_DIR, file.name);
                const content = await readFile(fullPath, 'utf8');
                const data = JSON.parse(content);

                if (content.toLowerCase().includes(searchString.toLowerCase())) searchResultFileList.push({ id: data.id, title: data.title });
            }
        }
        return searchResultFileList;
    }
    catch (err) {
        console.log('Error searching text in clean chat file:', err);
    }
}