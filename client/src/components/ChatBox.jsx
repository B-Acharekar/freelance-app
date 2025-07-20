import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import {
  Form,
  InputGroup,
  Button,
  Spinner,
  Card,
  Container,
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

  // Join socket room
  useEffect(() => {
    if (!user || !projectId) return;

    socket.emit("join-room", { projectId, userId: user._id });

    const handleIncomingMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("new-message", handleIncomingMessage);

    return () => {
      socket.off("new-message", handleIncomingMessage);
    };
  }, [user, projectId]);

  // Fetch previous messages
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

  // Auto-scroll to bottom
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
    <Card className="shadow rounded-4 h-100 d-flex flex-column">
      <Card.Header className="bg-primary text-white fw-semibold fs-5">
        Project Chat
      </Card.Header>

      <Card.Body className="flex-grow-1 overflow-auto px-4 py-3" style={{ backgroundColor: "#f4f6f8" }}>
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
                  className={`px-3 py-2 rounded-pill shadow-sm ${
                    isSender ? "bg-primary text-white" : "bg-light"
                  }`}
                  style={{ maxWidth: "70%" }}
                >
                  <div>{msg.message}</div>
                  <div className="text-end" style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                    {msg.sentAt ? new Date(msg.sentAt).toLocaleTimeString() : ""}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </Card.Body>

      <Card.Footer className="p-3">
        <InputGroup>
          <Form.Control
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="rounded-pill"
          />
          <Button variant="primary" className="rounded-pill ms-2" onClick={handleSendMessage}>
            <Send />
          </Button>
        </InputGroup>
      </Card.Footer>
    </Card>
  );
};

export default ChatBox;
