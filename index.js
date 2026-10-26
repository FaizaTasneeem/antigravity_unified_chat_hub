import { app, BrowserWindow, Menu, ipcMain, shell } from 'electron';
import path from 'path';
import normalize_chats from './services/chat_cleaner.js'
import { getChatMessages, getSearchFileList } from './services/clean_chat_manager.js';
import generate_ai_response from './services/ai_service.js';

let viteServer;

async function startViteServer() {
    const { createServer } = await import('./frontend/node_modules/vite/dist/node/index.js');
    viteServer = await createServer({
        configFile: path.resolve('./frontend/vite.config.js'),
        root: path.resolve('./frontend'),
        server: { port: 5173 }
    });
    await viteServer.listen();
}

function createWindow() {
    Menu.setApplicationMenu(null);

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(import.meta.dirname, 'bridge.js')
        }
    });

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    app.isPackaged
        ? mainWindow.loadFile(path.join('./frontend/dist/index.html'))
        : mainWindow.loadURL('http://localhost:5173/');
}

function registerIpcHandlers(normalized_chatList) {
    ipcMain.handle('get-chat-list', () => normalized_chatList);
    ipcMain.handle('set-chat-list', (_event, newChat) => {
        normalized_chatList = [...normalized_chatList, newChat].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        return normalized_chatList;
    });
    ipcMain.handle('get-chat-msg', (_event, id) => getChatMessages(id));
    ipcMain.handle('get-search-file-list', (_event, searchStr) => getSearchFileList(searchStr));

    ipcMain.on('send-msg-to-ai', async (event, { chatId, newChat }) => {
        try {
            const finalChat = await generate_ai_response(chatId, newChat, (chunk) => {
                event.sender.send('ai-chunk', { chatId, chunk })
            });
            event.sender.send('ai-done', { chatId, finalChat })
        }
        catch (err) {
            event.sender.send('ai-error', { chatId, error: err.message })
        }
    });
}

app.whenReady().then(async () => {
    try {
        const normalized_chatList = await normalize_chats();
        registerIpcHandlers(normalized_chatList);
        if (!app.isPackaged) await startViteServer();
        createWindow();
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