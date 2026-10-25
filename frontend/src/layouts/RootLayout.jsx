import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { handleAiChunk, handleAiDone, handleAiError } from "../handlers/aiStreamHandlers";

function RootLayout() {

    useEffect(() => {
        const unsubChunk = window.aiAPI.onAiChunk(handleAiChunk);
        const unsubDone = window.aiAPI.onAiDone(handleAiDone);
        const unsubError = window.aiAPI.onAiError(handleAiError);

        return () => {
            unsubChunk();
            unsubDone();
            unsubError();
        };

    }, []);

    return (
        <div className="flex flex-row h-screen overflow-hidden bg-[#142A3D] bg-[radial-gradient(ellipse_55%_55%_at_18%_45%,rgba(66,133,244,0.522)_0%,transparent_70%),radial-gradient(ellipse_50%_50%_at_35%_65%,rgba(86,199,234,0.42)_0%,transparent_70%),radial-gradient(ellipse_45%_45%_at_10%_85%,rgba(66,133,244,0.314)_0%,transparent_70%),radial-gradient(ellipse_55%_50%_at_88%_22%,rgba(240,120,105,0.502)_0%,transparent_70%),radial-gradient(ellipse_50%_45%_at_78%_48%,rgba(245,207,87,0.29)_0%,transparent_70%),radial-gradient(ellipse_50%_50%_at_85%_75%,rgba(103,206,138,0.22)_0%,transparent_70%),linear-gradient(135deg,#172D52_0%,#142A3D_50%,#261F41_100%)]">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default RootLayout