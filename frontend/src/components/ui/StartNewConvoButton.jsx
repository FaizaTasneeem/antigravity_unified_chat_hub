import { NavLink } from "react-router-dom"

function StartNewConvoButton() {
    return (
        <div className="mx-2 relative rounded-lg p-[2px] group">
            <div className="absolute inset-0 rounded-lg bg-[#1A73E8] group-hover-blue transition-opacity duration-300" />

            <div className="absolute inset-0 rounded-lg bg-[linear-gradient(to_right,#4DA3FF,#00C853,#FFB300,#FF3B30)] opacity-0 group-hover-rainbow transition-opacity duration-300 shadow-[0_0_16px_rgba(26,115,232,0.45)]" />

            <NavLink
                to="/"
                className="relative z-10 w-full py-2 px-4 rounded-[6px] bg-[#1A73E8] group-hover-btn-bg text-sm font-semibold text-white flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200 active:scale-[0.98]"
            >
                + New Conversation
            </NavLink>
        </div>
    )
}

export default StartNewConvoButton