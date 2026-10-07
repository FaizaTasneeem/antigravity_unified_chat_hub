import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar/Sidebar"

function RootLayout() {
    return (
        <div className="flex flex-row h-screen overflow-hidden bg-[#0d1117]">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default RootLayout