import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatBox from '../components/ChatBox';
import { Card, Container, Spinner, Button } from 'react-bootstrap';
import { FaComments, FaArrowLeft } from 'react-icons/fa';

const ChatRoom = () => {
  const { receiverId, projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Container className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="mb-3 d-flex align-items-center gap-2">
        <Button
          variant="outline-secondary"
          size="sm"
          className="rounded-pill d-flex align-items-center gap-1"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={12} /> Back
        </Button>
        <h4 className="mb-0 text-dark fw-semibold">Chat Room</h4>
      </div>

      <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
        <Card.Header className="bg-white border-bottom rounded-top-4 px-4 py-3 d-flex align-items-center justify-content-between shadow-sm">
          <div className="d-flex align-items-center gap-2">
            <FaComments className="text-primary fs-5" />
            <h5 className="mb-0 fw-semibold text-dark">Project Chat</h5>
          </div>
          <span className="badge bg-primary-subtle text-primary px-3 py-1 rounded-pill">
            Live
          </span>
        </Card.Header>
        <Card.Body className="p-0 bg-white" style={{ minHeight: '400px' }}>
          <ChatBox
            currentUserId={user._id}
            receiverId={receiverId}
            projectId={projectId}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ChatRoom;
