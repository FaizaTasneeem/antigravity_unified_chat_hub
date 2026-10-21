import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { chatStore } from "../../store/AppStore";

function NewChatInput({ chatId }) {
    const { chatList, setChatList, chatMsg, setChatMsg, showAIResponseLoading, setShowAIResponseLoading } = chatStore();
    const navigate = useNavigate();
    const [newMsgInput, setNewMsgInput] = useState("");

    function handleNewMsgSubmit(e) {
        e.preventDefault();
        if (!newMsgInput.trim()) return;
        setShowAIResponseLoading(true);
        setNewMsgInput("");

        const newChat = appendUserMessage();
        setChatMsg(newChat);

        if (!chatId) {
            const newChatItem = { id: newChat.id, title: newChat.title, timestamp: new Date().getTime() };
            setChatList([newChatItem, ...chatList]);
            navigate(`/chat/${newChat.id}`);
        }

        window.aiAPI.sendMessageToAI({ chatId, newChat })
        // .then((data) => {
        //     setChatMsg(data);
        //     setShowAIResponseLoading(false);
        // });
    }

    function appendUserMessage() {
        if (chatMsg) {
            const newChatMsgList = [...chatMsg.messages, { sender: "user", text: newMsgInput, time: new Date().toLocaleString() }];
            return { ...chatMsg, messages: newChatMsgList };
        }
        else {
            const newId = chatId || crypto.randomUUID();
            const newChatMsgList = [{ sender: "user", text: newMsgInput, time: new Date().toLocaleString() }];
            return { ...chatMsg, id: newId, title: newId, messages: newChatMsgList };
        }
    }

    useEffect(() => {
        const unsubscribe = window.aiAPI.onAiChunk(({ chunk }) => {
            setShowAIResponseLoading(false);
            setChatMsg({
                ...chatMsg,
                messages: [...chatMsg.messages,
                {
                    sender: "assistant",
                    text: chatMsg.messages.at(-1).text + chunk,
                    time: new Date().toLocaleString()
                }]
            });
        })

        return () => unsubscribe();

    }, []);


    return (
        <div className="relative w-[80%] max-w-3xl rounded-full p-[2px] overflow-hidden group focus-within:bg-[#1A73E8] focus-within:shadow-[0_0_20px_rgba(26,115,232,0.45)] transition-all">

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-focus-within:hidden">
                <div className="w-[300%] aspect-square animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_0deg,#1A73E8,#00C853,#FFB300,#FF3B30,#1A73E8)]" />
            </div>

            <form onSubmit={handleNewMsgSubmit} className="flex relative">
                <input
                    type="text"
                    value={newMsgInput}
                    onChange={(e) => setNewMsgInput(e.target.value)}
                    placeholder="Type a new message..."
                    disabled={showAIResponseLoading}
                    className="relative z-10 w-full pl-6 pr-16 py-3 bg-[#15243D] rounded-full text-[#F2F4F8] placeholder-gray-400 outline-none transition-colors"
                />

                <button className="absolute z-90 right-0 cursor-pointer p-3 bg-[#101725]/60 border-2 border-[#1A73E8] rounded-full">
                    <ArrowRight className="w-5 h-5 text-[#1A73E8]" />
                </button>

            </form>
        </div>

    )
}

export default NewChatInput