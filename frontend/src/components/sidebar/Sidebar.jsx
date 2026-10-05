import { useState, useEffect } from "react"

function Sidebar({ setChatId }) {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        window.electronAPI.getChatList().then((data) => {
            setChatList(data);
        });
    }, [chatList]);

    return (
        <div className="p-2 w-[30%] md:w-[20%] min-h-screen flex flex-col gap-4 bg-[#111720] border border-[#1E2836] rounded-lb-lg text-[#F6F9FB] text-xs">
            <span className="p-4 flex justify-center text-xl font-bold">Antigravity Unified Chat Hub</span>
            {chatList &&
                <div className="flex flex-col gap-2">
                    {chatList.map((chat, idx) => (
                        <div
                            key={idx}
                            className="p-4 bg-[#111827] hover:bg-[#161F2D] border border-[#202936] rounded-lg truncate cursor-pointer"
                            onClick={() => setChatId(chat)}
                        >
                            {chat}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Sidebar