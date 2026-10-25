import { chatStore } from "../store/AppStore";

export function handleAiChunk({ chatId, chunk }) {
    const { chatMsg, setChatMsg } = chatStore.getState();
    if (!chatMsg || chatMsg?.id !== chatId) return;

    const lastMsg = chatMsg.messages.at(-1);

    if (lastMsg?.sender === "assistant") {
        setChatMsg({
            ...chatMsg,
            messages: [...chatMsg.messages.slice(0, -1), {
                ...lastMsg,
                text: lastMsg?.text + chunk
            }]
        });
    }
    else {
        setChatMsg({
            ...chatMsg,
            messages: [...chatMsg.messages, {
                sender: "assistant",
                text: chunk,
                time: new Date().toLocaleString()
            }]
        });
    }
}

export function handleAiDone({ chatId, finalChat }) {
    const { chatMsg, setChatMsg, setShowAIResponseLoading } = chatStore.getState();

    setShowAIResponseLoading(false);
    if (chatMsg && chatMsg.id === chatId && finalChat) {
        setChatMsg(finalChat);
    }
}

export function handleAiError({ chatId, error }) {
    const { setShowAIResponseLoading } = chatStore.getState();
    setShowAIResponseLoading(false);
    console.error(`AI generation error for chat ${chatId}:`, error);
}