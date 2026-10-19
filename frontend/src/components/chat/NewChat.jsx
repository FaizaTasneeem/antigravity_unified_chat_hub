import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewChatInput from "./NewChatInput";
import { chatStore } from "../../store/AppStore";

function NewChat() {
    const navigate = useNavigate();
    const { chatMsg, setChatMsg } = chatStore();

    useEffect(() => {
        setChatMsg(null);
    }, []);

    useEffect(() => {
        if (chatMsg?.id) {
            navigate(`/chat/${chatMsg.id}`)
        }
    }, [chatMsg]);

    return (
        <div className="flex-1 min-w-0 h-screen p-4 flex flex-col justify-end items-center text-[#F2F4F8] bg-transparent">
            <NewChatInput chatId={crypto.randomUUID()} />
        </div>
    )
}

export default NewChat