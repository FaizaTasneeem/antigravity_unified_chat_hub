import { useState } from "react";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";

function SearchButton({ chatList }) {
    const [showSearchModal, setShowSearchModal] = useState(false);

    return (
        <>
            <div className="m-2 p-[1.5px] rounded-full bg-[linear-gradient(to_right,#1A73E8,#00C853,#FFB300,#FF3B30)]">
                <button
                    onClick={() => setShowSearchModal(!showSearchModal)}
                    className="w-full py-2 px-4 bg-[#15243D] hover:bg-[#1b2d4b] rounded-full text-sm font-medium text-[#F2F4F8] flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                    <Search className="w-4 h-4 text-[#70DFFF]" />
                    Search
                </button>
            </div>


            {showSearchModal &&
                <SearchModal chatList={chatList} setShowSearchModal={setShowSearchModal} />
            }
        </>
    )
}

export default SearchButton