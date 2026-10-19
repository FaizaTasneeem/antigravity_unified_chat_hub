import { GoogleGenAI } from "@google/genai";
import { writeCleanChats } from "./chat_cleaner.js";


process.loadEnvFile?.();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function generate_gemini_response(chatId, newChat) {
    try {
        const contents = formatMessagesForGemini(newChat.messages);
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
        });

        const chatWithAiResponse = {
            ...newChat,
            messages: [
                ...newChat.messages,
                {
                    sender: "assistant", text: response.text, time: new Date().toLocaleString()
                }
            ]
        };
        await writeCleanChats(chatId, chatWithAiResponse);
        return chatWithAiResponse;
    }
    catch (err) {
        console.log("Error generating gemini response, ", err);
        return {
            ...newChat,
            messages: [
                ...newChat.messages,
                {
                    sender: "assistant",
                    text: "⚠️ The AI service is currently experiencing high demand. Please try again in a moment.",
                    time: new Date().toLocaleString()
                }
            ]
        };
    }
}

function formatMessagesForGemini(newChatMsgList) {
    return newChatMsgList.map(msg => ({
        role: msg.sender === "user" ? msg.sender : "model",
        parts: [{ text: msg.text }]
    }));
}