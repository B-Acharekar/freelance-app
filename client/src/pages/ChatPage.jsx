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
        backgroundColor: "#f1f3f5",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <div
        className={`transition-all shadow-sm ${sidebarVisible ? "d-block" : "d-none d-md-block"
          }`}
        style={{
          width: "320px",
          background: "#fff",
          borderRight: "1px solid #dee2e6",
          overflowY: "auto",
        }}
      >
        <ChatList
          onThreadSelect={handleThreadSelect}
          selectedThread={selectedThread}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Back button for mobile */}
        {!sidebarVisible && (
          <div className="bg-white border-bottom shadow-sm d-md-none">
            <button
              onClick={handleBackClick}
              className="btn btn-link text-dark px-3 py-2"
            >
              <FaArrowLeft className="me-2" />
              Back to chats
            </button>
          </div>
        )}

        {/* Chatbox or Empty State */}
        <div className="flex-grow-1 p-3">
          {selectedThread ? (
            <Card className="h-100 rounded-4 shadow-sm border-0">
              <Card.Header className="bg-white border-bottom rounded-top-4 px-4 py-3 d-flex align-items-center justify-content-between shadow-sm">
                <div className="d-flex align-items-center gap-2">
                  <FaComments className="text-primary fs-5" />
                  <h5 className="mb-0 fw-semibold text-dark">Project Chat</h5>
                </div>
                <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill">
                  Live
                </span>
              </Card.Header>
              <Card.Body className="d-flex flex-column p-0">
                <ChatBox
                  receiverId={selectedThread.otherUserId}
                  projectId={selectedThread.projectId}
                />
              </Card.Body>
            </Card>
          ) : (
            <Card className="h-100 rounded-4 shadow-sm border-0 d-flex align-items-center justify-content-center text-muted fs-5">
              <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                <FaComments className="mb-2" size={32} />
                Select a chat to start messaging
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
