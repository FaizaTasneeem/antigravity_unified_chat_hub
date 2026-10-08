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
        <div className="max-w-[250px] px-2 h-screen flex flex-col gap-8 bg-[#101A30]/[0.502] border-r border-[#8CCFFF]/30 rounded-lb-lg text-[#F6F9FB] text-xs">
            <Logo />
            <SearchButton chatList={chatList} />
            {chatList &&
                <div className="overflow-y-auto p-2 flex flex-col gap-2">
                    {chatList.map(chat => (
                        <NavLink
                            key={chat.id}
                            to={`/chat/${chat.id}`}
                            className={({ isActive }) => `p-4 flex items-center rounded-lg cursor-pointer transition-all duration-150 border ${isActive ? 'bg-[#9CC5FF]/[0.11] border-[#8CCFFF]/40 text-[#F2F4F8] shadow-sm' : 'bg-transparent border-transparent text-[#D5DCE9] hover:bg-white/[0.04] hover:text-[#F2F4F8]'}`}
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