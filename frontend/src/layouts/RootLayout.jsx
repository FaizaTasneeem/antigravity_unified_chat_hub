import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar/Sidebar"

function RootLayout() {
    const [chatId, setChatId] = useState(null);
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
        <div className="flex flex-row h-screen overflow-hidden bg-[#0d1117]">
            <Sidebar chatId={chatId} setChatId={setChatId} />
            {chatMsg &&
                <div className="w-full flex-1 h-screen overflow-y-auto flex flex-col gap-3 text-white">
                    <div className="sticky top-0 bg-[#111720] z-10 p-4 border-b border-[#202936] text-lg font-bold">{chatMsg.title}</div>
                    {chatMsg.messages &&
                        chatMsg.messages
                            .map(chat => (
                                <div className={`p-4 flex gap-2 max-w-[70%] ${chat.sender === "user" ? 'self-end' : 'self-start'}`}>
                                    {chat.sender === "assistant" && <div className={`w-8 h-8 shrink-0 bg-[#5B5CF6] flex justify-center items-center rounded-full font-semibold`}>AI</div>}
                                    <div className={`p-3 rounded-lg whitespace-pre-line break-words ${chat.sender === "user" ? 'bg-[#1B2340]' : 'bg-[#161F2D]'}`}>
                                        {chat.text}
                                    </div>
                                </div>
                            ))
                    }
                </div>
            }
            <Outlet />
        </div>
    )
}

export default RootLayout