import React from 'react';
import { FaComments } from 'react-icons/fa';
import { Badge, Image } from 'react-bootstrap';

const ChatThreadCard = ({ thread }) => {
  const { otherUser, unreadCount } = thread;

  return (
    <div
      className="thread-card card border-0 shadow-sm rounded-4 px-4 py-3 mb-3 d-flex flex-row justify-content-between align-items-center bg-white position-relative hover-glow"
      style={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="d-flex align-items-center gap-3">
        {/* Optional Avatar or Icon */}
        <div className="rounded-circle bg-primary-subtle d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
          <FaComments className="text-primary" />
        </div>

        <div className="d-flex flex-column">
          <div className="fw-semibold text-dark fs-6">
            {otherUser?.name || 'Freelancer'}
          </div>
          <div className="text-muted small">{otherUser?.email}</div>
        </div>
      </div>

      {unreadCount > 0 && (
        <Badge pill bg="danger" className="position-absolute top-0 end-0 mt-2 me-2">
          {unreadCount}
        </Badge>
      )}
    </div>
  );
};

export default ChatThreadCard;
