import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatBox from '../components/ChatBox';

const ChatRoom = () => {
  const { receiverId, projectId } = useParams();
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Project Chat Room</h3>
      <ChatBox currentUserId={user._id} receiverId={receiverId} projectId={projectId} />
    </div>
  );
};

export default ChatRoom;