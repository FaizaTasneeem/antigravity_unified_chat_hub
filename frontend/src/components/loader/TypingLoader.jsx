function TypingLoader({
    animationType = "scale",
    variant = "bubble",
    bubble = true,
    className = "",
    dotClassName = "",
}) {

    const currentSize = {
        dot: "w-1 h-1 md:w-2 md:h-2 lg:w-3 lg:h-3 ",
        gap: "gap-1.5 md:gap-2.5 lg:gap-3.5",
        bubble: "px-3 py-2 md:px-4.5 md:py-3 lg:px-6 lg:py-4",
        card: "w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64",
    };


    const animationClass = animationType === "bounce" ? "animate-typing-bounce" : "animate-typing-wave";

    const dots = [
        { color: "bg-[#df5667]", delay: "[animation-delay:0ms]" },
        { color: "bg-[#f5b066]", delay: "[animation-delay:190ms]" },
        { color: "bg-[#abbd81]", delay: "[animation-delay:380ms]" },
        { color: "bg-[#7ea0b7]", delay: "[animation-delay:570ms]" },
    ];

    const getContainerStyle = () => {
        if (!bubble || variant === "dots") {
            return "inline-flex items-center";
        }

        if (variant === "card") {
            return `${currentSize.card} bg-[#191919] rounded-2xl shadow-2xl flex items-center justify-center border border-white/5`;
        }

        return `inline-flex items-center ${currentSize.bubble} `;
    };

    return (
        <div
            role="status"
            aria-label="Someone is typing..."
            className={`${getContainerStyle()} ${className}`}
        >
            <span className="sr-only">Someone is typing...</span>

            <div className={`flex items-center justify-center ${currentSize.gap}`}>
                {dots.map((dot, index) => (
                    <span
                        key={index}
                        className={`rounded-full shrink-0 ${currentSize.dot} ${dot.color} ${animationClass} ${dot.delay} will-change-transform ${dotClassName}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default TypingLoader;