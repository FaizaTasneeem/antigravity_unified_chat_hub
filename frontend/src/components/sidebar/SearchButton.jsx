import { useState } from "react";
import SearchModal from "./SearchModal";

function SearchButton() {
    const [showSearchModal, setShowSearchModal] = useState(false);

    return (
        <>
            <button
                className="m-2 p-4 py-3 bg-[#5B5CF6]/10 hover:bg-[#5B5CF6]/20 border-2 border-[#5B5CF6]/30 hover:border-[#5B5CF6]/60 backdrop-blur-md shadow-[0_0_12px_rgba(91,92,246,0.25)] rounded-full font-bold text-sm text-indigo-200 hover:text-white transition-all duration-200 cursor-pointer"
                onClick={() => setShowSearchModal(!showSearchModal)}
            >
                🔍 Search
            </button>

            {showSearchModal &&
                <SearchModal />
            }
        </>
    )
}

export default SearchButton