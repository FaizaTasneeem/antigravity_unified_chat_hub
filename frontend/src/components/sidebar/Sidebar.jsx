import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"
import SearchButton from "./SearchButton";

function Sidebar() {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        window.electronAPI.getChatList().then((data) => {
            setChatList(data);
        });
    }, []);

    return (
        <div className="max-w-[250px] h-screen overflow-y-auto flex flex-col gap-8 bg-[#111720] border border-[#1E2836] rounded-lb-lg text-[#F6F9FB] text-xs">
            <span className="sticky top-0 bg-[#111720] z-10 p-4 flex justify-center text-xl font-bold">Antigravity Unified Chat Hub</span>
            <SearchButton />
            {chatList &&
                <div className="p-2 flex flex-col gap-2">
                    {chatList.map(chat => (
                        <NavLink
                            key={chat.id}
                            to={`/chat/${chat.id}`}
                            className={({ isActive }) => `p-4 hover:bg-[#161F2D] rounded-lg truncate cursor-pointer ${isActive ? 'bg-[#1B2340] border border-indigo-500' : ''}`}
                        >
                            {chat.title || chat.id}
                        </NavLink>
                    ))}
                </div>
            }
        </div>
    )
}

export default Sidebar