import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ListGroup, Spinner, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaComments } from 'react-icons/fa'; // for chat icon

const ChatList = () => {
  const { token, user } = useAuth();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchThreads = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/chat/threads', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setThreads(res.data);
      } catch (error) {
        console.error('Failed to fetch chat threads', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, [token]);

  if (!user || user.role !== 'client') {
    return (
      <p className="text-center mt-5 text-danger">
        Access denied — only clients can see chat threads.
      </p>
    );
  }

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (threads.length === 0) {
    return (
      <p className="text-center mt-5 text-muted">
        No active chats yet. Start messaging freelancers!
      </p>
    );
  }

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h4 className="mb-3 text-center text-primary">Your Chat Threads</h4>
      <ListGroup>
        {threads.map((thread, idx) => (
          <ListGroup.Item
            key={idx}
            action
            as={NavLink}
            to={`/chatroom/${thread.otherUserId}/${thread.projectId}`}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <FaComments className="me-2 text-primary" />
              <strong>Chat with Freelancer</strong>
              <br />
              <small className="text-muted">
                Project ID: <Badge bg="info">{thread.projectId}</Badge>
              </small>
            </div>
            {thread.unreadCount > 0 && (
              <Badge bg="danger" pill>
                {thread.unreadCount}
              </Badge>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ChatList;
