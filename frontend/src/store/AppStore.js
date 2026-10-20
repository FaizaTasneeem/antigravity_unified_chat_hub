import { create } from 'zustand';

export const chatStore = create((set) => ({
    chatList: [],
    chatMsg: null,
    showAIResponseLoading: false,
    setChatList: (chatList) => set({ chatList }),
    setChatMsg: (chatMsg) => set({ chatMsg }),
    setShowAIResponseLoading: (showAIResponseLoading) => set({ showAIResponseLoading }),
}));