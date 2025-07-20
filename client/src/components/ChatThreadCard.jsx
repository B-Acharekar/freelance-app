import React from 'react';
import { FaComments } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const ChatThreadCard = ({ thread }) => {
  const { receiverId: currentId, projectId: currentProject } = useParams();

  const isActiveThread =
    thread.otherUserId === currentId && thread.projectId === currentProject;

  return (
    <div className="card shadow-sm rounded-4 p-3 d-flex flex-row justify-content-between align-items-center">
      <div>
        <div className="fw-semibold text-dark">
          <FaComments className="me-2 text-primary" />
          {thread.otherUser?.name || 'Freelancer'}
        </div>
        <div className="text-muted small">{thread.otherUser?.email}</div>
      </div>
      {!isActiveThread && thread.unreadCount > 0 && (
        <span className="badge bg-danger rounded-pill">
          {thread.unreadCount}
        </span>
      )}
    </div>
  );
};

export default ChatThreadCard;
