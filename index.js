import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import { createServer } from './frontend/node_modules/vite/dist/node/index.js';
import path from 'path';
import run from './chat_cleaner.js'


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

    if (!app.isPackaged) await startViteServer();

    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    app.isPackaged
        ? win.loadFile(path.join('./frontend/dist/index.html'))
        : win.loadURL('http://localhost:5173/');;

}

await run();
app.whenReady().then(createWindow);

app.on('before-quit', async () => {
    if (viteServer) {
        await viteServer.close();
    }
});