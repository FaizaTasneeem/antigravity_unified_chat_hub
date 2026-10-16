import NewChatInput from "./NewChatInput"

function NewChat() {
    return (
        <div className="flex-1 min-w-0 h-screen p-4 flex flex-col justify-end items-center text-[#F2F4F8] bg-transparent">
            <NewChatInput />
        </div>
    )
}

export default NewChat