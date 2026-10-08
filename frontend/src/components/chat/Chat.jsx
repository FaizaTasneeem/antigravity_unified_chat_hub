import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ChatHeader from "./ChatHeader";

function Chat() {
    const [chatMsg, setChatMsg] = useState(null);
    const { id: chatId } = useParams();
    const [searchParams] = useSearchParams();
    const searchStr = searchParams.get("searchStr");

    useEffect(() => {
        console.log("chatId ", chatId)
        if (chatId) {
            window.electronAPI.getChatMsg(chatId).then((data) => {
                setChatMsg(JSON.parse(data));
            });
        }
    }, [chatId]);

    const firstMatchIdx = chatMsg?.messages?.findIndex(
        chat => searchStr && chat.text.toLowerCase().includes(searchStr.toLowerCase())
    );

    return (
        <>
            {chatMsg &&
                <div className="flex-1 min-w-0 h-screen flex flex-col text-white">
                    <ChatHeader chatMsg={chatMsg} />

                    <div className="flex-1 min-w-0 min-h-0 overflow-y-auto flex flex-col gap-3 p-4">
                        {chatMsg.messages &&
                            chatMsg.messages
                                .map((chat, idx) => {
                                    const isMatch = searchStr && chat.text.toLowerCase().includes(searchStr.toLowerCase());
                                    return (
                                        <div key={idx} className={`p-4 flex gap-2 max-w-[70%] ${chat.sender === "user" ? 'self-end' : 'self-start'}`}>
                                            {chat.sender === "assistant" && <div className={`w-8 h-8 shrink-0 bg-[#5B5CF6] flex justify-center items-center rounded-full font-semibold`}>AI</div>}
                                            <div
                                                ref={idx === firstMatchIdx ? (el) => el?.scrollIntoView({ behavior: "smooth", block: "center" }) : null}
                                                className={`p-3 rounded-lg whitespace-pre-line break-words break-all min-w-0 ${chat.sender === "user" ? 'bg-[#1B2340]' : 'bg-[#161F2D]'} ${isMatch ? 'border border-indigo-500' : ''}`}
                                            >
                                                {chat.text}
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Chat