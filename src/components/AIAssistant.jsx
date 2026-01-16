import React, { useState } from 'react';

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("Hi! I'm Miraki AI. I use the Mistral model. Ask me anything!");
  const [loading, setLoading] = useState(false);

  // We use the Mistral-7B-Instruct model (Very fast & smart)
  const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";

  const handleAskAI = async () => {
    if (!query) return;
    setLoading(true);
    
    try {
      const result = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_HUGGING_FACE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inputs: `<s>[INST] You are a helpful assistant for the Miraki Blog. Answer this question briefly: ${query} [/INST]`,
            parameters: {
                max_new_tokens: 200, // Keeps answers short
                return_full_text: false,
            }
        }),
      });

      const data = await result.json();

      // Error handling for "Model Loading" (Common with free tier)
      if (data.error && data.error.includes("loading")) {
        setResponse("The AI is waking up... please try again in 10 seconds!");
      } else if (data[0] && data[0].generated_text) {
        setResponse(data[0].generated_text);
      } else {
        setResponse("I couldn't understand that. Try again?");
      }

    } catch (error) {
      setResponse("Oops! Connection error. Please check your internet.");
      console.error(error);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 transform origin-bottom-right">
          <div className="bg-purple-600 p-4 text-white font-bold flex justify-between items-center">
             {/* Changed title to indicate Model */}
            <span>🤖 Miraki AI (Mistral)</span>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              ✕
            </button>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto bg-gray-50 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {loading ? (
              <div className="flex items-center space-x-2 animate-pulse text-purple-500">
                <span>Thinking...</span>
              </div>
            ) : (
              response
            )}
          </div>

          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
              placeholder="Ask something..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
            />
            <button
              onClick={handleAskAI}
              className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        {isOpen ? (
             <span className="text-xl font-bold">✕</span>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12h15m-15 3.75h15m-15 3.75h15M8.25 21v1.5M15.75 21v1.5M15.75 3v1.5" />
            </svg>
        )}
      </button>
    </div>
  );
}

export default AIAssistant;