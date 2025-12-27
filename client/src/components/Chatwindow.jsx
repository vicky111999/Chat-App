import React, { useState } from "react";
import MessageBubble from "./MessageBubble";

const Chatwindow = ({ user, messages, onSend, onBack }) => {
  const [text, setText] = useState("");

  if (!user)
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 ">
        Select a chat
      </div>
    );

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b bg-white flex items-center gap-2">
        {onBack && (
          <button
            className="md:hidden px-2 py-1 bg-gray-200 rounded"
            onClick={onBack}
          >
            back
          </button>
        )}
        <span className="font-semibold">{user.name}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
      </div>
      <input
        className="flex-1 border rounded-lg px-3 py-2 outline-none"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="bg-blue-500 text-white px-4 rounded-lg"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default Chatwindow;
