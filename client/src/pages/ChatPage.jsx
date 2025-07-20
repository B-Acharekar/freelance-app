// ChatPage.jsx
import React, { useState } from "react";
import ChatList from "../components/ChatList";
import ChatBox from "../components/ChatBox";
import { FaArrowLeft, FaComments } from "react-icons/fa";
import { Card } from "react-bootstrap";

const ChatPage = () => {
  const [selectedThread, setSelectedThread] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleThreadSelect = (thread) => {
    setSelectedThread(thread);
    if (window.innerWidth < 768) {
      setSidebarVisible(false);
    }
  };

  const handleBackClick = () => {
    setSidebarVisible(true);
    setSelectedThread(null);
  };

  return (
    <div
      className="d-flex"
      style={{
        height: "calc(100vh - 80px)",
        backgroundColor: "#f8f9fa",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: sidebarVisible ? "320px" : "0px",
          transition: "all 0.3s ease",
          background: "#fff",
          borderRight: "1px solid #dee2e6",
          overflowY: "auto",
        }}
        className="shadow-sm"
      >
        <ChatList
          onThreadSelect={handleThreadSelect}
          selectedThread={selectedThread}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow-1 d-flex flex-column">
        {!sidebarVisible && (
          <button
            onClick={handleBackClick}
            className="btn btn-light text-start d-md-none shadow-sm border-bottom"
          >
            <FaArrowLeft className="me-2" />
            Back to chats
          </button>
        )}

        {selectedThread ? (
          <ChatBox
            receiverId={selectedThread.otherUserId}
            projectId={selectedThread.projectId}
          />
        ) : (
          <div className="d-flex align-items-center justify-content-center flex-grow-1 text-muted fs-5">
            <FaComments className="me-2" />
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
