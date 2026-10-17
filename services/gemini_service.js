import { GoogleGenAI } from "@google/genai";
import { getChatMessages } from "./clean_chat_manager.js";
import { writeCleanChats } from "./chat_cleaner.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function generate_gemini_response(chatId, newChat) {
    const contents = formatMessagesForGemini(newChat.messages);
    const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents,
    });

    const existingChat = JSON.parse(getChatMessages(chatId));
    const chatWithAiResponse = {
        ...existingChat,
        messages: [
            ...messages,
            {
                sender: "assistant", text: response.text, time: new Date().toLocaleString()
            }
        ]
    };
    await writeCleanChats(chatId, chatWithAiResponse);
    return chatWithAiResponse;
}

function formatMessagesForGemini(newChatMsgList) {
    return newChatMsgList.map(msg => ({
        role: msg.sender === "user" ? msg.sender : "model",
        parts: [{ text: msg.text }]
    }));
}