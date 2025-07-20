import React from 'react';
import { FaComments } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';

const ChatThreadCard = ({ thread }) => {
  const { otherUser, unreadCount } = thread;

  return (
    <div
      className="card shadow-sm rounded-4 p-3 mb-3 border-0 thread-card d-flex flex-row justify-content-between align-items-center"
      style={{
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div className="d-flex flex-column">
        <div className="fw-semibold text-dark d-flex align-items-center mb-1">
          <FaComments className="me-2 text-primary" />
          <span>{otherUser?.name || 'Freelancer'}</span>
        </div>
        <div className="text-muted small">{otherUser?.email}</div>
      </div>

      {unreadCount > 0 && (
        <Badge pill bg="danger" className="ms-2">
          {unreadCount}
        </Badge>
      )}
    </div>
  );
};

export default ChatThreadCard;
