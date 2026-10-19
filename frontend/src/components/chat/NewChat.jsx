import { useEffect } from "react";
import NewChatInput from "./NewChatInput";
import { chatStore } from "../../store/AppStore";

function NewChat() {
    const { setChatMsg } = chatStore();

    useEffect(() => {
        setChatMsg(null);
    }, []);

    return (
        <div className="flex-1 min-w-0 h-screen p-4 flex flex-col justify-end items-center text-[#F2F4F8] bg-transparent">
            <NewChatInput chatId={null} />
        </div>
    )
}

export default NewChat