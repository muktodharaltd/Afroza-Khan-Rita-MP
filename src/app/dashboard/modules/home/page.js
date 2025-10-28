"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🧠 মেসেজ পাঠানো ও উত্তর পাওয়া
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // ✅ CORS-free API (no backend needed)
      const res = await fetch(
        `https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(input)}`
      );
      const data = await res.json();

      const botMessage = {
        role: "bot",
        text: data.response || "🤖 আমি বুঝতে পারিনি, আবার চেষ্টা করো!",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ কিছু সমস্যা হয়েছে, পরে আবার চেষ্টা করো।" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="p-4 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-all"
      >
        <MessageSquare size={22} />
      </button>

      {/* Popup Chat Box */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gray-900 text-white flex justify-between items-center">
              <h2 className="text-lg font-semibold">AI Chat Assistant 🤖</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <p className="text-gray-400 text-sm italic">Thinking...</p>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-200 flex items-center p-3 bg-white"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-700"
              />
              <button
                type="submit"
                className="ml-3 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
