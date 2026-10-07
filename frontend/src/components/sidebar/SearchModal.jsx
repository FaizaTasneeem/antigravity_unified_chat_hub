function SearchModal() {
    return (
        <div className="bg-black/50 backdrop-blur-sm fixed inset-0 flex flex-col justify-center items-center">
            <div className="w-full max-w-md bg-[#111827] text-lg border border-gray-600 rounded-lg flex flex-col justify-left px-4 py-2">
                <p className="text-lg font-bold">Search Conversations</p>
                <span className="text-sm text-gray-500">Find a message. Pick up where you left off.</span>
            </div>
        </div>
    )
}

export default SearchModal