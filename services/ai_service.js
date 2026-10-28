import { OpenRouter } from '@openrouter/sdk';
import { writeCleanChats } from "./chat_cleaner.js";


process.loadEnvFile?.();
const openRouter = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

export default async function generate_ai_response(chatId, newChat, onChunk) {
    try {
        const id = chatId || newChat.id
        const messages = formatMessagesForGemini(newChat.messages);

        const responseStream = await openRouter.chat.send({
            chatRequest: {
                model: "nvidia/nemotron-3.5-lightning:free",
                messages,
                stream: true
            }
        });
        // const responseStream = "This is a simulated AI response streaming token by token directly through Electron IPC.".split(" ");

        let fullText = "";
        for await (const chunk of responseStream) {
            const text = chunk.choices?.[0]?.delta?.content || "";
            if (text) {
                fullText += text;
                onChunk(text);
            }
        }
        // for (const word of responseStream) {
        //     const chunk = word + " ";
        //     fullText += chunk;
        //     await new Promise(resolve => setTimeout(resolve, 100));
        //     onChunk(chunk);
        // }

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
                    text: `⚠️ Error generating ai response: ${err.message}`,
                    time: new Date().toLocaleString()
                }
            ]
        };
    }
}

function formatMessagesForGemini(newChatMsgList) {
    return newChatMsgList.map(msg => ({
        role: msg.sender === "user" ? msg.sender : "assistant",
        content: msg.text || ""
    }));
}