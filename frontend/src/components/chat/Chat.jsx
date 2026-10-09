import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ChatHeader from "./ChatHeader";

function Chat() {
    const [chatMsg, setChatMsg] = useState(null);
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
                                                ref={idx === firstMatchIdx ? (el) => el?.scrollIntoView({ behavior: "smooth", block: "center" }) : null}
                                                className={`p-5 rounded-2xl min-w-0 break-words [overflow-wrap:anywhere] backdrop-blur-xl border border-[#8CCFFF]/30 shadow-[0_8px_20px_rgba(2,8,23,0.251)] text-[#F2F4F8] ${chat.sender === "user" ? 'bg-[#213450]/[0.569]' : 'bg-[#152338]/[0.722]'} ${isMatch ? 'ring-2 ring-[#56C7EA] border-[#56C7EA]' : ''}`}
                                            >
                                                <ReactMarkdown
                                                    components={{
                                                        // Paragraphs
                                                        p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed text-sm">{children}</p>,

                                                        // Headings
                                                        h1: ({ children }) => <h1 className="text-lg font-bold mt-4 mb-2 text-[#F2F4F8]">{children}</h1>,
                                                        h2: ({ children }) => <h2 className="text-base font-bold mt-3 mb-2 text-[#F2F4F8]">{children}</h2>,
                                                        h3: ({ children }) => <h3 className="text-sm font-bold mt-3 mb-1 text-[#F2F4F8]">{children}</h3>,

                                                        // Lists
                                                        ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1 text-sm">{children}</ul>,
                                                        ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1 text-sm">{children}</ol>,
                                                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,

                                                        // Inline code
                                                        code: ({ children }) => (
                                                            <code className="bg-black/40 text-[#70DFFF] px-1.5 py-0.5 rounded text-xs font-mono">
                                                                {children}
                                                            </code>
                                                        ),

                                                        // Code blocks (with horizontal scroll and dark card background)
                                                        pre: ({ children }) => (
                                                            <pre className="bg-[#0b101e]/80 border border-white/10 rounded-xl p-4 my-3 overflow-x-auto text-xs font-mono text-slate-200">
                                                                {children}
                                                            </pre>
                                                        ),

                                                        // Clickable Links
                                                        a: ({ href, children }) => (
                                                            <a href={href} target="_blank" rel="noreferrer" className="text-[#56C7EA] underline hover:text-[#81DFE9]">
                                                                {children}
                                                            </a>
                                                        ),

                                                        // Dividers
                                                        hr: () => <hr className="border-white/10 my-4" />
                                                    }}
                                                >
                                                    {chat.text}
                                                </ReactMarkdown>

                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Chat