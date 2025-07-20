import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchChatThreads } from '../services/chatService';
import { Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ChatThreadCard from '../components/ChatThreadCard';

const ChatList = () => {
  const { token, user } = useAuth();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  const deduplicateThreads = (data) => {
    const seen = new Set();
    return data.filter((item) => {
      const key = `${item.otherUserId}-${item.projectId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  useEffect(() => {
    const getThreads = async () => {
      try {
        const data = await fetchChatThreads(token);
        setThreads(deduplicateThreads(data));
      } catch (err) {
        console.error('Error fetching threads:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) getThreads();
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
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <h4 className="mb-4 text-center text-primary fw-bold">💬 Your Chat Threads</h4>
      <div className="d-grid gap-3">
        {threads.map((thread, idx) => (
          <NavLink
            key={idx}
            to={`/chatroom/${thread.otherUserId}/${thread.projectId}`}
            className="text-decoration-none"
          >
            <ChatThreadCard thread={thread} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
