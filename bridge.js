// import { contextBridge, ipcRenderer } from "electron";
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
    getChatList: () => ipcRenderer.invoke('get-chat-list'),
    setChatList: (newChat) => ipcRenderer.invoke('set-chat-list', newChat),
    getChatMsg: (id) => ipcRenderer.invoke('get-chat-msg', id),
    getSearchFileList: (searchStr) => ipcRenderer.invoke('get-search-file-list', searchStr),
});

contextBridge.exposeInMainWorld('aiAPI', {
    sendMessageToAI: (payload) => ipcRenderer.send('send-msg-to-ai', payload),
    onAiChunk: (callback) => {
        const handler = (_event, data) => callback(data);
        ipcRenderer.on('ai-chunk', handler);
        return () => ipcRenderer.removeListener('ai-chunk', handler);
    },
    onAiDone: (callback) => {
        const handler = (_event, data) => callback(data);
        ipcRenderer.on('ai-done', handler);
        return () => ipcRenderer.removeListener('ai-done', handler);
    },
    onAiError: (callback) => {
        const handler = (_event, data) => callback(data);
        ipcRenderer.on('ai-error', handler);
        return () => ipcRenderer.removeListener('ai-error', handler);
    }
})