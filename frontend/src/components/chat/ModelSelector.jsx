import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

import { chatStore } from "../../store/AppStore";

function ModelSelector() {
    const [showModelOptions, setShowModelOptions] = useState(false)
    const { freeModelsList, setFreeModelsList, modelSelected, setModelSelected } = chatStore();

    useEffect(() => {
        window.electronAPI.getFreeModelsList().then((data) => {
            setFreeModelsList(data);
            if (!modelSelected && data?.length > 0) setModelSelected(data[0]);
        });
    }, []);

    return (
        <div
            className="relative min-[1000px]:w-[100px] flex justify-between py-2 px-3 font-semibold text-xs text-gray-400 border border-gray-400 rounded-full"
            onClick={() => setShowModelOptions(!showModelOptions)}
        >
            <div className="hidden min-[1000px]:block cursor-pointer truncate">
                {modelSelected?.name || freeModelsList[0]?.name}
            </div>
            <ChevronUp className={`shrink-0 cursor-pointer w-5 h-5 text-[#1A73E8] ${showModelOptions ? 'rotate-180' : ''}`} />

            {showModelOptions &&
                <div className="absolute bottom-full mb-3 p-1.5 w-70 max-h-60 overflow-y-auto left-0 flex flex-col bg-[#101725]/95 backdrop-blur-xl border border-[#8CCFFF]/30 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                    {freeModelsList?.map(model => (
                        <div
                            key={model.id}
                            className={`flex justify-between hover:bg-[#1A73E8]/20 hover:text-white p-3 rounded-lg cursor-pointer ${modelSelected?.name === model.name ? 'bg-[#1A73E8] text-white font-medium' : ''}`}
                            onClick={() => setModelSelected(model)}
                        >
                            <span className="truncate">{model.name}</span>
                            {(modelSelected?.name === model.name) && <span className="truncate">✓</span>}
                        </div>
                    ))}

                </div>
            }
        </div>
    )
}

export default ModelSelector