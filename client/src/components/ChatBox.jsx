import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const socket = io("http://localhost:5000");

const ChatBox = ({ receiverId, projectId }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user || !projectId) return;

    console.log("Joining room with:", { projectId, userId: user._id });
    socket.emit("join-room", { projectId, userId: user._id });

    socket.on("new-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("new-message");
    };
  }, [user, projectId]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    console.log("Sending message:", {
      projectId,
      senderId: user._id,
      receiverId,
      message,
    });

    socket.emit("send-message", {
      projectId,
      senderId: user._id,
      receiverId,
      message,
    });

    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!user) return <p>Please log in to chat.</p>;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 6,
        height: 400,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, idx) => {
          const isSender = msg.senderId === user._id;
          return (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: isSender ? "flex-end" : "flex-start",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  backgroundColor: isSender ? "#0d6efd" : "#e5e5ea",
                  color: isSender ? "white" : "black",
                  padding: "10px 15px",
                  borderRadius: 20,
                  maxWidth: "70%",
                  wordBreak: "break-word",
                }}
              >
                {msg.message}
                <div
                  style={{
                    fontSize: 10,
                    color: isSender ? "#cce4ff" : "#555",
                    textAlign: "right",
                    marginTop: 4,
                  }}
                >
                  {msg.sentAt
                    ? new Date(msg.sentAt).toLocaleTimeString()
                    : ""}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div
        style={{
          display: "flex",
          padding: 10,
          borderTop: "1px solid #ccc",
        }}
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          style={{
            flexGrow: 1,
            padding: "10px",
            borderRadius: 20,
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            marginLeft: 10,
            padding: "10px 20px",
            borderRadius: 20,
            border: "none",
            backgroundColor: "#0d6efd",
            color: "white",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
