import path from 'node:path';
import os from 'node:os';

export const BASE_DIR = path.join(os.homedir(), '.gemini', 'antigravity-ide', 'brain');
export const OUTPUT_DIR = path.join(import.meta.dirname, 'normalized_chats');
export const CONVERSATIONS_TITLE_DIR = path.join(os.homedir(), '.gemini', 'antigravity-ide', 'conversations');

export const getRawChatFilePath = (conversationId) => path.join(BASE_DIR, conversationId, '.system_generated', 'logs', 'transcript.jsonl');
export const getCleanChatFilePath = (conversationId) => path.join(OUTPUT_DIR, `${conversationId}_output.json`);
export const getConversationTitleFilePath = (conversationId) => path.join(CONVERSATIONS_TITLE_DIR, `${conversationId}.db`);