import React, { useState } from 'react'
import Logo from "../Logo"

function Footer() {
    const [query, setQuery] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAskAI = async () => {
        if (!query) return;
        setLoading(true);
        setAnswer(""); 

        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${import.meta.env.VITE_HUGGING_FACE_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        inputs: `<s>[INST] You are a helpful assistant for the Miraki Blog. Answer this question concisely: ${query} [/INST]`,
                        parameters: { max_new_tokens: 150, return_full_text: false }
                    }),
                }
            );
            const data = await response.json();
            
            if (data.error && data.error.includes("loading")) {
                setAnswer("Thinking... (Model is waking up, try again in 5s)");
            } else if (data[0] && data[0].generated_text) {
                setAnswer(data[0].generated_text);
            } else {
                setAnswer("I couldn't quite get that. Try asking differently?");
            }
        } catch (error) {
            setAnswer("Connection error. Please check your internet.");
        } finally {
            setLoading(false);
        }
    };

    return (
        // REDUCED HEIGHT: Changed py-10 to py-6
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-6 border-t-4 border-blue-500">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
                
                {/* 1. The "Smart" AI Section - Compact Mode */}
                {/* REDUCED HEIGHT: Changed mb-8 to mb-4 */}
                <div className="w-full mb-4">
                    
                    {/* Input Bar - Slimmer */}
                    <div className="relative group max-w-lg mx-auto flex items-center">
                        <h3 className="text-sm font-bold mr-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 whitespace-nowrap">
                            Ask AI:
                        </h3>
                        <input
                            type="text"
                            placeholder="Type a question..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                            // REDUCED HEIGHT: Changed py-3 to py-2
                            className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all text-gray-200 placeholder-gray-500 shadow-lg text-sm"
                        />
                        <button 
                            onClick={handleAskAI}
                            className="absolute right-1 top-1 bottom-1 bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-full font-medium transition-colors text-xs"
                        >
                            {loading ? "..." : "Ask"}
                        </button>
                    </div>

                    {/* AI Answer Display Area */}
                    {(answer || loading) && (
                        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700 text-left animate-fade-in-up max-w-lg mx-auto">
                            {loading ? (
                                <div className="flex items-center gap-2 text-blue-400 text-xs">
                                    <span className="animate-pulse">Thinking...</span>
                                </div>
                            ) : (
                                <p className="text-gray-300 leading-relaxed text-xs whitespace-pre-wrap">
                                    <span className="text-blue-400 font-bold mr-2">AI:</span>
                                    {answer}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* 2. Divider */}
                {/* REDUCED HEIGHT: Changed mb-6 to mb-3 */}
                <div className="w-full max-w-lg h-px bg-gray-700 mb-3 opacity-50"></div>

                {/* 3. Logo & Signature (Horizontal to save vertical space) */}
                <div className="flex flex-row items-center justify-center gap-3">
                    <div className="opacity-80 hover:opacity-100 transition-opacity">
                        <Logo width="30px" />
                    </div>
                    <p className="text-xs font-medium text-gray-400">
                        Made with ❤️ by Venkatesh
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer