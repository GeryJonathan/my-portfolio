"use client";
import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();

    setMessages((prev) => [...prev, userMsg, { role: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-2xl text-center mt-10">
        <Image src="/profile.jpg" alt="Profile" width={120} height={120} className="rounded-full mx-auto" />
        <h1 className="text-4xl font-bold mt-4">Hi, I’m Gery 👋</h1>
        <p className="mt-2 text-gray-600">
          Fresh IT graduate with interest in Data Science & Cybersecurity.
        </p>
      </div>

      {/* Projects Section */}
      <div className="max-w-3xl mt-10 w-full">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>💾 Banking Transaction ETL Automation (UiPath + MySQL)</li>
          <li>🤖 Thesis: Deepfake Video Detection with CNN</li>
          <li>📊 Data Visualization Dashboard (Python + Streamlit)</li>
        </ul>
      </div>

      {/* Chatbot Widget */}
      <div className="fixed bottom-6 right-6 w-80 bg-white border rounded-lg shadow-lg p-3">
        <div className="h-48 overflow-y-auto mb-2">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <p className={`p-2 my-1 rounded ${m.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
                {m.text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            className="flex-grow border rounded p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
          />
          <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-3 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
