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
            <Sidebar setChatId={setChatId} />
            {chatMsg &&
                <div className="flex-1 h-screen overflow-y-auto p-4 flex flex-col gap-3">
                    {chatMsg
                        .map(chat => (
                            <div className={`w-[40%] p-3 bg-[#161F2D] rounded-lg text-white whitespace-pre-line flex ${chat.sender === "user" ? 'self-end' : 'self-start'}`}>{chat.text}</div>
                        ))
                    }
                </div>
            }
            <Outlet />
        </div>
    )
}

export default RootLayout