import { useState, useEffect } from "react"

function Sidebar() {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        window.electronAPI.getChatList().then((data) => {
            console.log(data);
            setChatList(data);
        });


    }, [chatList]);

    return (
        <div className="p-2 w-[30%] md:w-[20%] min-h-screen bg-[#111720] border border-[#1E2836] rounded-lb-lg text-[#F6F9FB] text-xs">
            {chatList &&
                <div className="flex flex-col gap-2">
                    {chatList.map((chat, idx) => (
                        <div key={idx} className="p-4 border border-[#202936] rounded-lg truncate cursor-pointer">
                            {chat}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Sidebar