import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatBox from '../components/ChatBox';
import { Card, Container, Spinner } from 'react-bootstrap';
import { FaComments } from 'react-icons/fa';

const ChatRoom = () => {
  const { receiverId, projectId } = useParams();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className="bg-primary text-white d-flex align-items-center rounded-top-4 px-4 py-3">
          <FaComments className="me-2 fs-5" />
          <h5 className="mb-0">Project Chat Room</h5>
        </Card.Header>
        <Card.Body className="p-0 bg-white">
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
