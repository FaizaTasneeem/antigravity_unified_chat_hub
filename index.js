import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import { createServer } from './frontend/node_modules/vite/dist/node/index.js';
import path from 'path';
import normalize_chats from './services/chat_cleaner.js'
import { getChatMessages, getSearchFileList } from './services/clean_chat_manager.js';
import generate_gemini_response from './services/gemini_service.js';

let viteServer;

async function startViteServer() {
    viteServer = await createServer({
        configFile: path.resolve('./frontend/vite.config.js'),
        root: path.resolve('./frontend'),
        server: { port: 5173 }
    });
    await viteServer.listen();
}

async function createWindow() {
    Menu.setApplicationMenu(null);

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(import.meta.dirname, 'bridge.js')
        }
    });

    app.isPackaged
        ? mainWindow.loadFile(path.join('./frontend/dist/index.html'))
        : mainWindow.loadURL('http://localhost:5173/');
}

function registerIpcHandlers(normalized_chatList) {
    ipcMain.handle('get-chat-list', () => normalized_chatList);
    ipcMain.handle('get-chat-msg', (_event, id) => getChatMessages(id));
    ipcMain.handle('get-search-file-list', (_event, searchStr) => getSearchFileList(searchStr));
    ipcMain.handle('send-msg-to-ai', (_event, chatId, newChatMsgList) => generate_gemini_response(chatId, newChatMsgList));
}

app.whenReady().then(async () => {
    try {
        const normalized_chatList = await normalize_chats();
        registerIpcHandlers(normalized_chatList);
        if (!app.isPackaged) await startViteServer();
        await createWindow();
    }
    catch (err) {
        console.log('Error starting electron process: ', err);
    }
});

app.on('before-quit', async () => {
    if (viteServer) {
        await viteServer.close();
    }
});