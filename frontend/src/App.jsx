import { RouterProvider } from "react-router-dom";
import router from "./Router";

function App() {
  return (
    <div className="w-full min-h-screen bg-[#0B1017]">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
