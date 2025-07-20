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

  // Deduplicate on the fly
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
        <Card className="p-4 shadow-sm border-0 text-danger fw-semibold" style={{ maxWidth: 600 }}>
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
    <Container fluid className="py-3 px-0" style={{ minHeight: '100vh' }}>
      <h4 className="text-primary fw-bold mb-3 px-4">
        <FaComments className="me-2" />
        Your Chat Threads
      </h4>

      {deduplicateThreads.length === 0 ? (
        <div className="px-4 text-muted">No active chats yet. Start messaging freelancers!</div>
      ) : (
        <div style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
          {deduplicateThreads.map((thread, idx) => {
            const isSelected =
              selectedThread?.otherUserId === thread.otherUserId &&
              selectedThread?.projectId === thread.projectId;

            return (
              <div
                key={idx}
                onClick={() => onThreadSelect(thread)}
                className={`mx-3 mb-3 rounded-4 p-3 transition cursor-pointer ${
                  isSelected
                    ? 'bg-primary-subtle border border-primary text-primary shadow'
                    : 'bg-white text-dark shadow-sm'
                }`}
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
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
