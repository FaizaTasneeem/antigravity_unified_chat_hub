import { NavLink } from "react-router-dom"

function StartNewConvoButton() {
    return (
        <>
            <div className="mx-2 p-[1.5px] rounded-lg bg-[linear-gradient(to_right,#1A73E8,#00C853,#FFB300,#FF3B30)]">
                <NavLink
                    to="/"
                    className="w-full py-2 px-4 hover:bg-[#1b2d4b] rounded-lg text-sm font-bold text-gray-700 hover:text-[#F2F4F8] flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                    + New Conversation
                </NavLink>
            </div>
        </>
    )
}

export default StartNewConvoButton