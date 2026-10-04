// import { contextBridge, ipcRenderer } from "electron";
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
    getChatList: () => ipcRenderer.invoke('get-chat-list'),
    getChatMsg: () => ipcRenderer.invoke('get-chat-msg'),
});