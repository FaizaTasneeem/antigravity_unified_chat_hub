import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar/Sidebar"

function RootLayout() {
    return (
        <div className="">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default RootLayout