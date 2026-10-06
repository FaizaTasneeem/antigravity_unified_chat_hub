import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar/Sidebar"

function RootLayout() {
    const [chatId, setChatId] = useState(null);

    return (
        <div className="flex flex-row h-screen overflow-hidden bg-[#0d1117]">
            <Sidebar chatId={chatId} setChatId={setChatId} />
            <Outlet />
        </div>
    )
}

export default RootLayout