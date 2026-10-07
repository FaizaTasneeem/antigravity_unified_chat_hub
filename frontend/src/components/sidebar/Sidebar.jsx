import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../ui/Logo";
import SearchButton from "../ui/SearchButton";

function Sidebar() {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        window.electronAPI.getChatList().then((data) => {
            setChatList(data);
        });
    }, []);

    return (
        <div className="max-w-[250px] px-2 h-screen flex flex-col gap-8 bg-[#111720] border border-[#1E2836] rounded-lb-lg text-[#F6F9FB] text-xs">
            <Logo />
            <SearchButton chatList={chatList} />
            {chatList &&
                <div className="overflow-y-auto p-2 flex flex-col gap-2">
                    {chatList.map(chat => (
                        <NavLink
                            key={chat.id}
                            to={`/chat/${chat.id}`}
                            className={({ isActive }) => `p-4 flex items-center hover:bg-[#161F2D] rounded-lg cursor-pointer ${isActive ? 'bg-[#1B2340] border border-indigo-500' : ''}`}
                        >
                            <span className="truncate">{chat.title || chat.id}</span>
                        </NavLink>
                    ))}
                </div>
            }
        </div>
    )
}

export default Sidebar