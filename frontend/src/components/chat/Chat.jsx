import { useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import NewChatInput from "./NewChatInput";
import ChatMessageContent from "./ChatMessageContent";
import TypingLoader from "../loader/TypingLoader";
import { chatStore } from "../../store/AppStore";

function Chat() {
    const { chatMsg, setChatMsg, showAIResponseLoading } = chatStore();

    const { id: chatId } = useParams();
    const [searchParams] = useSearchParams();
    const searchStr = searchParams.get("searchStr");

    const scrollContainerRef = useRef(null);
    const shouldAutoScrollRef = useRef(true);

    useEffect(() => {
        console.log("chatId ", chatId);
        if (chatId && chatMsg?.id !== chatId) {
            window.electronAPI.getChatMsg(chatId).then((data) => {
                setChatMsg(JSON.parse(data));
                shouldAutoScrollRef.current = true;
            });
        }
    }, [chatId]);

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 120;
        shouldAutoScrollRef.current = isNearBottom;
    };

    const lastMessageText = chatMsg?.messages?.at(-1)?.text;
    const messageCount = chatMsg?.messages?.length || 0;

    useEffect(() => {
        if (!searchStr && shouldAutoScrollRef.current && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [lastMessageText, messageCount, showAIResponseLoading, searchStr]);

    const firstMatchIdx = chatMsg?.messages?.findIndex(
        chat => searchStr && chat.text.toLowerCase().includes(searchStr.toLowerCase())
    );

    return (
        <>
            {chatMsg &&
                <div className="flex-1 min-w-0 h-screen flex flex-col text-[#F2F4F8] bg-transparent">
                    <ChatHeader />

                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex-1 min-w-0 min-h-0 overflow-y-auto flex flex-col gap-3 p-4"
                    >
                        {chatMsg.messages &&
                            chatMsg.messages.map((chat, idx) => {
                                const isMatch = searchStr && chat.text.toLowerCase().includes(searchStr.toLowerCase());
                                return (
                                    <div key={idx} className={`p-4 flex gap-2 max-w-[70%] ${chat.sender === "user" ? 'self-end' : 'self-start'}`}>
                                        {chat.sender === "assistant" && (
                                            <div className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-bold text-xs text-[#0C1016] shadow-md bg-[radial-gradient(circle_at_30%_30%,#4285F4_0%,#56C7EA_34%,#67CE8A_60%,#F5CF57_82%,#F07869_100%)]">
                                                AI
                                            </div>
                                        )}
                                        <div
                                            ref={idx === firstMatchIdx
                                                ? (el) => el?.scrollIntoView({ behavior: "smooth", block: "start" })
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
                        <NewChatInput chatId={chatId} />
                    </div>

                </div>
            }
        </>
    )
}

export default Chat