import { readFile } from "node:fs/promises";
import { getCleanChatFilePath } from '../utils';


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