import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Chat() {
    const { id: chatId } = useParams();
    const [chatMsg, setChatMsg] = useState(null);

    useEffect(() => {
        console.log("chatId ", chatId)
        if (chatId) {
            window.electronAPI.getChatMsg(chatId).then((data) => {
                setChatMsg(JSON.parse(data));
            });
        }
    }, [chatId]);

    return (
        <>
            {chatMsg &&
                <div className="w-full flex-1 h-screen overflow-y-auto flex flex-col gap-3 text-white">
                    <div className="sticky top-0 bg-[#111720] p-4 border-b border-[#202936] text-lg font-bold">{chatMsg.title || chatId}</div>
                    {chatMsg.messages &&
                        chatMsg.messages
                            .map(chat => (
                                <div className={`p-4 flex gap-2 max-w-[70%] ${chat.sender === "user" ? 'self-end' : 'self-start'}`}>
                                    {chat.sender === "assistant" && <div className={`w-8 h-8 shrink-0 bg-[#5B5CF6] flex justify-center items-center rounded-full font-semibold`}>AI</div>}
                                    <div className={`p-3 rounded-lg whitespace-pre-line break-words min-w-0 ${chat.sender === "user" ? 'bg-[#1B2340]' : 'bg-[#161F2D]'}`}>
                                        {chat.text}
                                    </div>
                                </div>
                            ))
                    }
                </div>
            }
        </>
    )
}

export default Chat