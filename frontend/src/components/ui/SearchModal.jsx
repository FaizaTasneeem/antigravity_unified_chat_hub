import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { NavLink } from "react-router-dom";

function SearchModal({ chatList, setShowSearchModal }) {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            window.electronAPI.getSearchFileList(searchInput).then((data) => {
                setSearchResults(data);
            });
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);

    return (
        <div className="bg-black/50 backdrop-blur-sm fixed inset-0 flex flex-col justify-center items-center">
            <div className="w-full max-w-md max-h-[350px] bg-[#111827] text-lg border border-gray-600 rounded-lg flex flex-col justify-left px-4 py-2">
                <div className="w-full flex items-center justify-between">
                    <p className="text-lg font-bold">Search Conversations</p>
                    <X className="w-4 h-4 text-indigo-300 cursor-pointer" onClick={() => setShowSearchModal(false)} />
                </div>
                <span className="text-sm text-gray-500">Find a message. Pick up where you left off.</span>

                <input type="text" id="searchInput" name="searchInput" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="mt-4 p-1.5 bg-[#0E1014] rounded-lg border-2 border-gray-600 focus:border-[#5B5CF6]/60 focus:outline-none text-sm" placeholder="🔍 Search by text, title or id..." />

                <div className="mt-8 flex flex-col overflow-y-auto w-full min-w-0">
                    {searchResults.length === 0 && chatList.map(chat => (
                        <NavLink key={chat.id} to={`/chat/${chat.id}`} onClick={() => setShowSearchModal(false)} className="cursor-pointer p-1 text-sm flex gap-2">
                            <Search className="w-4 h-4 text-indigo-300 shrink-0" />
                            <span className="text-gray-400 truncate">{chat.title || chat.id}</span>
                        </NavLink>
                    ))}
                    {searchResults.length !== 0 && searchResults.map(chat => (
                        <NavLink key={chat.id} to={`/chat/${chat.id}`} onClick={() => setShowSearchModal(false)} className="cursor-pointer p-1 text-sm flex gap-2">
                            <Search className="w-4 h-4 text-indigo-300 shrink-0" />
                            <span className="text-gray-400 truncate">{chat.title || chat.id}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchModal