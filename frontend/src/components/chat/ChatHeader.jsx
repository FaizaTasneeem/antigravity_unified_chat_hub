import { useState } from "react"
import { Search } from "lucide-react"
import ChatMsgSearchModal from "./ChatMsgSearchModal";

function ChatHeader({ chatMsg }) {
    const [showChatMsgSearchModal, setShowChatMsgSearchModal] = useState(false);

    return (
        <div className="bg-[#111720] p-4 flex justify-between items-center border-b border-[#202936]">
            <span className="w-[80%] text-sm lg:text-lg font-bold">{chatMsg.title || chatMsg.id}</span>
            <button
                onClick={() => setShowChatMsgSearchModal(true)}
                className="p-2 cursor-pointer flex justify-center items-center gap-2 rounded-full border border-gray-600"
            >
                <span className="hidden lg:block text-xs text-gray-400">search</span>
                <Search className="w-4 h-4 text-indigo-300" />
            </button>

            {showChatMsgSearchModal &&
                <ChatMsgSearchModal setShowChatMsgSearchModal={setShowChatMsgSearchModal} chatMsg={chatMsg} />
            }
        </div>
    )
}

export default ChatHeader