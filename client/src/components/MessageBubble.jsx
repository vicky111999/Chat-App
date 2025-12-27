import React from "react";

const MessageBubble = ({ message }) => {
  const isMe = message.fromMe;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs ${
          isMe ? "bg-blue-500 text-white" : "bg-white border"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
