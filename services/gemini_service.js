import { GoogleGenAI } from "@google/genai";
import { getChatMessages } from "./clean_chat_manager.js";
import { writeCleanChats } from "./chat_cleaner.js";


process.loadEnvFile?.();

console.log(process.env.GEMINI_API_KEY); // Now has your key!

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function generate_gemini_response(chatId, newChat) {
    try {
        const contents = formatMessagesForGemini(newChat.messages);
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents,
        });

        const existingChat = JSON.parse(await getChatMessages(chatId));
        const chatWithAiResponse = {
            ...existingChat,
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
    }
}

function formatMessagesForGemini(newChatMsgList) {
    return newChatMsgList.map(msg => ({
        role: msg.sender === "user" ? msg.sender : "model",
        parts: [{ text: msg.text }]
    }));
}