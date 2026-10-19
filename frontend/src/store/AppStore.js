import { create } from 'zustand';

export const chatStore = create((set) => ({
    chatMsg: null,
    showAIResponseLoading: false,
    setChatMsg: (chatMsg) => set({ chatMsg }),
    setShowAIResponseLoading: (showAIResponseLoading) => set({ showAIResponseLoading }),
}));