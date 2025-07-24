import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchChatThreads } from '../services/chatService';
import { Spinner, Container, Card } from 'react-bootstrap';
import { FaComments } from 'react-icons/fa';
import ChatThreadCard from '../components/ChatThreadCard';

const ChatList = ({ onThreadSelect, selectedThread }) => {
  const { token, user } = useAuth();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  const deduplicateThreads = useMemo(() => {
    const seen = new Set();
    return threads.filter((item) => {
      const key = `${item.otherUserId}-${item.projectId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [threads]);

  useEffect(() => {
    const getThreads = async () => {
      try {
        const data = await fetchChatThreads(token);
        setThreads(data);
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
      <Container className="mt-5 d-flex justify-content-center">
        <Card className="p-4 shadow-sm border-0 text-danger fw-semibold bg-light rounded-4" style={{ maxWidth: 600 }}>
          Access denied — only clients can see chat threads.
        </Card>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="mt-5 d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container fluid className="pt-3 pb-5 px-2" style={{ minHeight: '100vh', backgroundColor: '#f9f9fb' }}>
      <div className="d-flex align-items-center justify-content-between px-3 mb-4">
        <h4 className="fw-bold text-dark mb-0">
          <FaComments className="me-2 text-primary" />
          Your Chat Threads
        </h4>
      </div>

      {deduplicateThreads.length === 0 ? (
        <div className="px-4 text-muted fs-6">No active chats yet. Start messaging freelancers!</div>
      ) : (
        <div
          style={{
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
            paddingRight: '6px',
          }}
        >
          {deduplicateThreads.map((thread, idx) => {
            const isSelected =
              selectedThread?.otherUserId === thread.otherUserId &&
              selectedThread?.projectId === thread.projectId;

            return (
              <div
                key={idx}
                onClick={() => onThreadSelect(thread)}
                className={`mb-3 mx-2 p-3 rounded-4 transition ${
                  isSelected
                    ? 'bg-primary-subtle border border-primary text-primary shadow-sm'
                    : 'bg-white text-dark shadow-sm border border-light'
                }`}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isSelected
                    ? '0 0 0 2px rgba(13,110,253,0.2)'
                    : '0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                <ChatThreadCard thread={thread} />
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
};

export default ChatList;
