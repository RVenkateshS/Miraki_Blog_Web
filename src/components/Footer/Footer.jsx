import React, { useState } from 'react'
import { useSelector } from 'react-redux' // 1. Import Redux hook
import Logo from "../Logo"

function Footer() {
    // 2. Get auth status from Redux
    const authStatus = useSelector((state) => state.auth.status)

    const [query, setQuery] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAskAI = async () => {
        if (!query) return;
        setLoading(true);
        setAnswer(""); 

        try {
           const response = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({
                    inputs: `<s>[INST] You are a helpful assistant for the Miraki Blog. Answer this question concisely: ${query} [/INST]`,
                    parameters: { max_new_tokens: 150, return_full_text: false }
                }),
            });
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
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-6 border-t-4 border-blue-500">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
                
                {/* 3. CONDITIONALLY RENDER AI SECTION */}
                {authStatus ? (
                    <div className="w-full mb-4">
                        {/* Input Bar */}
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
                                className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all text-gray-200 placeholder-gray-500 shadow-lg text-sm"
                            />
                            <button 
                                onClick={handleAskAI}
                                className="absolute right-1 top-1 bottom-1 bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-full font-medium transition-colors text-xs"
                            >
                                {loading ? "..." : "Ask"}
                            </button>
                        </div>

                        {/* AI Answer Area */}
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
                        
                        {/* Divider only shows if AI is visible */}
                         <div className="w-full max-w-lg h-px bg-gray-700 my-4 opacity-50 mx-auto"></div>
                    </div>
                ) : (
                    // OPTIONAL: Message for non-logged in users (Or leave empty)
                    <div className="mb-4 text-gray-500 text-xs italic">
                        Login to use the AI Assistant
                    </div>
                )}

                {/* 4. Logo & Signature (Always Visible) */}
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