import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import NewChatInput from "./NewChatInput";
import ChatMessageContent from "./ChatMessageContent";
import TypingLoader from "../loader/TypingLoader";

function Chat() {
    const [chatMsg, setChatMsg] = useState(null);
    const [showAIResponseLoading, setShowAIResponseLoading] = useState(false);
    const { id: chatId } = useParams();
    const [searchParams] = useSearchParams();
    const searchStr = searchParams.get("searchStr");

    useEffect(() => {
        console.log("chatId ", chatId)
        if (chatId) {
            window.electronAPI.getChatMsg(chatId).then((data) => {
                setChatMsg(JSON.parse(data));
            });
        }
    }, [chatId]);

    const firstMatchIdx = chatMsg?.messages?.findIndex(
        chat => searchStr && chat.text.toLowerCase().includes(searchStr.toLowerCase())
    );

    return (
        <>
            {chatMsg &&
                <div className="flex-1 min-w-0 h-screen flex flex-col text-[#F2F4F8] bg-transparent">
                    <ChatHeader chatMsg={chatMsg} />

                    <div className="flex-1 min-w-0 min-h-0 overflow-y-auto flex flex-col gap-3 p-4">
                        {chatMsg.messages &&
                            chatMsg.messages
                                .map((chat, idx) => {
                                    const isMatch = searchStr && chat.text.toLowerCase().includes(searchStr.toLowerCase());
                                    return (
                                        <div key={idx} className={`p-4 flex gap-2 max-w-[70%] ${chat.sender === "user" ? 'self-end' : 'self-start'}`}>
                                            {chat.sender === "assistant" && <div className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-bold text-xs text-[#0C1016] shadow-md bg-[radial-gradient(circle_at_30%_30%,#4285F4_0%,#56C7EA_34%,#67CE8A_60%,#F5CF57_82%,#F07869_100%)]`}>AI</div>}
                                            <div
                                                ref={idx === firstMatchIdx
                                                    ? (el) => el?.scrollIntoView({ behavior: "smooth", block: "start" })
                                                    : idx === (chatMsg.messages.length - 1)
                                                        ? (el) => el?.scrollIntoView({ behavior: "smooth", block: "end" })
                                                        : null
                                                }
                                                className={`p-5 rounded-2xl min-w-0 break-words [overflow-wrap:anywhere] backdrop-blur-xl border border-[#8CCFFF]/30 shadow-[0_8px_20px_rgba(2,8,23,0.251)] text-[#F2F4F8] ${chat.sender === "user" ? 'bg-[#213450]/[0.569]' : 'bg-[#152338]/[0.722]'} ${isMatch ? 'ring-2 ring-[#56C7EA] border-[#56C7EA]' : ''}`}
                                            >
                                                <ChatMessageContent text={chat.text} />
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>

                    {showAIResponseLoading && <TypingLoader className="ml-14" />}

                    <div className="p-4 flex justify-center items-center">
                        <NewChatInput chatId={chatId} chatMsg={chatMsg} setChatMsg={setChatMsg} setShowAIResponseLoading={setShowAIResponseLoading} />
                    </div>

                </div>
            }
        </>
    )
}

export default Chat