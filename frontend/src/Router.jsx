import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout"
import Chat from "./components/chat/Chat";
import NewChat from "./components/chat/NewChat";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <NewChat />
            },
            {
                path: "/chat/:id",
                element: <Chat />
            }
        ]
    }

]);

export default router;