import { GoogleGenAI } from "@google/genai";
import { writeCleanChats } from "./chat_cleaner.js";


process.loadEnvFile?.();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function generate_ai_response(chatId, newChat, onChunk) {
    try {
        const id = chatId || newChat.id
        const contents = formatMessagesForGemini(newChat.messages);
        // const responseStream = await ai.models.generateContentStream({
        //     model: "gemini-3.1-flash-lite-preview",
        //     contents,
        // });
        const responseStream = "This is a simulated AI response streaming token by token directly through Electron IPC.".split(" ");

        let fullText = "";
        // for await (const chunk of responseStream) {
        //     const text = chunk.text;
        //     fullText += text;
        //     onChunk(text);
        // }
        for (const word of responseStream) {
            const chunk = word + " ";
            fullText += chunk;
            await new Promise(resolve => setTimeout(resolve, 100));
            onChunk(chunk);
        }

        const chatWithAiResponse = {
            ...newChat,
            messages: [
                ...newChat.messages,
                {
                    sender: "assistant", text: fullText, time: new Date().toLocaleString()
                }
            ]
        };
        await writeCleanChats(id, chatWithAiResponse);
        return chatWithAiResponse;
    }
    catch (err) {
        console.log("Error generating ai response, ", err);
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