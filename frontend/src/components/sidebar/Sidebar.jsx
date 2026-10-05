import { useState, useEffect } from "react"

function Sidebar({ chatId, setChatId }) {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        window.electronAPI.getChatList().then((data) => {
            setChatList(data);
        });
    }, [chatList]);

    return (
        <div className="p-2 max-w-[20%] h-screen overflow-y-auto flex flex-col gap-8 bg-[#111720] border border-[#1E2836] rounded-lb-lg text-[#F6F9FB] text-xs">
            <span className="p-4 flex justify-center text-xl font-bold">Antigravity Unified Chat Hub</span>
            {chatList &&
                <div className="flex flex-col gap-2">
                    {chatList.map((chat, idx) => (
                        <div
                            key={idx}
                            className={`p-4 hover:bg-[#161F2D] border rounded-lg truncate cursor-pointer ${chat.conversationId === chatId ? 'bg-[#1B2340] border-indigo-500' : 'bg-[#111827] border-[#202936]'}`}
                            onClick={() => setChatId(chat.conversationId)}
                        >
                            {chat.chatTitle || chat.conversationId}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Sidebar