// import { contextBridge, ipcRenderer } from "electron";
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
    getChatList: () => ipcRenderer.invoke('get-chat-list'),
    getChatMsg: (id) => ipcRenderer.invoke('get-chat-msg', id),
    getSearchFileList: (searchStr) => ipcRenderer.invoke('get-search-file-list', searchStr),
    sendMessageToAI: (chatId, newChatMsgList) => ipcRenderer.invoke('send-msg-to-ai', chatId, newChatMsgList),
});