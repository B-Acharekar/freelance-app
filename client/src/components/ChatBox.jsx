import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import {
  Form,
  InputGroup,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";
import { Send } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { fetchMessages, markMessagesAsRead } from "../services/chatService";

const socket = io("http://localhost:5000");

const ChatBox = ({ receiverId, projectId }) => {
  const { token, user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user || !projectId) return;

    socket.emit("join-room", { projectId, userId: user._id });

    const handleIncomingMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("new-message", handleIncomingMessage);
    return () => socket.off("new-message", handleIncomingMessage);
  }, [user, projectId]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const fetched = await fetchMessages(user._id, receiverId, projectId, token);
        setMessages(fetched);
        await markMessagesAsRead(projectId, user._id, token);
      } catch (err) {
        console.error("Error loading messages", err);
      } finally {
        setLoading(false);
      }
    };

    if (user && receiverId && projectId) {
      loadMessages();
    }
  }, [user, receiverId, projectId, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const msgPayload = {
      projectId,
      senderId: user._id,
      receiverId,
      message,
    };

    socket.emit("send-message", msgPayload);
    setMessage("");
  };

  if (!user) return <p>Please log in to chat.</p>;

  return (
    <Card className="shadow-sm border-0 rounded-bottom-4 rounded-top-0 h-100 d-flex flex-column overflow-hidden">
      <Card.Body className="flex-grow-1 overflow-auto px-4 py-3" style={{ backgroundColor: "#f8f9fa" }}>
        {loading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-muted text-center">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => {
            const isSender = msg.senderId === user._id;
            return (
              <div
                key={idx}
                className={`d-flex mb-3 ${isSender ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-4 position-relative shadow-sm ${
                    isSender ? "bg-primary text-white" : "bg-white border"
                  }`}
                  style={{ maxWidth: "75%", transition: "0.3s ease-in-out" }}
                >
                  <div className="mb-1">{msg.message}</div>
                  <small className={`d-block text-end ${isSender ? "text-white-50" : "text-muted"}`} style={{ fontSize: "0.75rem" }}>
                    {msg.sentAt ? new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                  </small>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </Card.Body>

      <Card.Footer className="border-top bg-white px-3 py-2">
        <InputGroup>
          <Form.Control
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="rounded-pill px-4 border"
          />
          <Button
            variant="primary"
            className="rounded-circle d-flex align-items-center justify-content-center ms-2"
            onClick={handleSendMessage}
            style={{ width: "42px", height: "42px" }}
          >
            <Send fontSize="small" />
          </Button>
        </InputGroup>
      </Card.Footer>
    </Card>
  );
};

export default ChatBox;
