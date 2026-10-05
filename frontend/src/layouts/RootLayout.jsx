import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar/Sidebar"

function RootLayout() {
    const [chatId, setChatId] = useState(null);
    const [chatMsg, setChatMsg] = useState(null);

    useEffect(() => {
        console.log("chatId ", chatId)
        window.electronAPI.getChatMsg(chatId).then((data) => {
            setChatMsg(data);
        });
    }, [chatId]);


    return (
        <div className="">
            <Sidebar setChatId={setChatId} />
            {chatMsg &&
                <div>
                    {chatMsg.filter(chat => chat.sender === "user").map(chat => <div>{chat.text}</div>)}
                </div>
            }
            <Outlet />
        </div>
    )
}

export default RootLayout