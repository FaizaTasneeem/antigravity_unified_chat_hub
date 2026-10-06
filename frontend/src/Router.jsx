import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout"
import Chat from "./components/chat/Chat";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/chat/:id",
                element: <Chat />
            }
        ]
    }

]);

export default router;