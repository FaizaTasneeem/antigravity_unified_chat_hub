import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

function ChatMsgSearchModal({ setShowChatMsgSearchModal, chatMsg }) {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // if (!searchInput) return;
        const timer = setTimeout(() => {
            const result = chatMsg.messages
                .filter(chat => chat.text.toLowerCase().includes(searchInput.toLowerCase()))
                .map(chat => (chat.text));
            setSearchResults(result);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);

    return (
        <div className="bg-black/50 fixed inset-0 flex flex-col justify-center items-center">
            <div className="w-full max-w-md max-h-[350px] bg-[#111827] text-lg border border-gray-600 rounded-lg flex flex-col justify-left px-4 py-2">
                <div className="w-full flex items-center justify-between">
                    <p className="text-sm lg:text-lg text-gray-400 font-bold italic">{`Search in this chat =>`}</p>
                    <X className="w-4 h-4 text-indigo-300 cursor-pointer" onClick={() => setShowChatMsgSearchModal(false)} />
                </div>

                <input type="text" id="searchInput" name="searchInput" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="mt-4 p-1.5 bg-[#0E1014] rounded-lg border-2 border-gray-600 focus:border-[#5B5CF6]/60 focus:outline-none text-sm" placeholder="🔍 Search by text..." />

                <div className="mt-8 flex flex-col overflow-y-auto w-full min-w-0">
                    {searchResults.length !== 0 && searchResults.map(chat => (
                        <NavLink key={chatMsg.id} to={`/chat/${chatMsg.id}?searchStr=${encodeURIComponent(chat)}`} onClick={() => setShowChatMsgSearchModal(false)} className="cursor-pointer p-1 text-sm flex gap-2">
                            <span className="text-gray-400 truncate">{chat}</span>
                        </NavLink>
                    ))}
                    {searchInput && searchResults.length === 0 &&
                        <div className="p-1 text-sm flex gap-2">
                            <span className="text-gray-400 truncate">No results found!</span>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default ChatMsgSearchModal