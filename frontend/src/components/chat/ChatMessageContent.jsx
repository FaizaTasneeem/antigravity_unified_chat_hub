import ReactMarkdown from "react-markdown";

function ChatMessageContent({ text }) {
    return (
        <ReactMarkdown
            components={{
                // Paragraphs
                p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed text-sm">{children}</p>,

                // Headings
                h1: ({ children }) => <h1 className="text-lg font-bold mt-4 mb-2 text-[#F2F4F8]">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold mt-3 mb-2 text-[#F2F4F8]">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold mt-3 mb-1 text-[#F2F4F8]">{children}</h3>,

                // Lists
                ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1 text-sm">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1 text-sm">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,

                // Inline code
                code: ({ children }) => (
                    <code className="bg-black/40 text-[#70DFFF] px-1.5 py-0.5 rounded text-xs font-mono">
                        {children}
                    </code>
                ),

                // Code blocks (with horizontal scroll and dark card background)
                pre: ({ children }) => (
                    <pre className="bg-[#0b101e]/80 border border-white/10 rounded-xl p-4 my-3 overflow-x-auto text-xs font-mono text-slate-200">
                        {children}
                    </pre>
                ),

                // Clickable Links
                a: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noreferrer" className="text-[#56C7EA] underline hover:text-[#81DFE9]">
                        {children}
                    </a>
                ),

                // Dividers
                hr: () => <hr className="border-white/10 my-4" />
            }}
        >
            {text}
        </ReactMarkdown>

    )
}

export default ChatMessageContent