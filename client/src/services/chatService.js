// src/services/chatService.js
import axios from 'axios';

const API_URL = 'https://freelance-api-lwu9.onrender.com/api/chat';

export const sendMessage = async (data, token) => {
  if (!token) throw new Error('No auth token provided');

  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const fetchMessages = async (senderId, receiverId, projectId, token) => {
  if (!token) throw new Error('No auth token provided');

  const res = await axios.get(`${API_URL}/${projectId}/${receiverId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const fetchChatThreads = async (token) => {
  if (!token) throw new Error('No auth token provided');

  const res = await axios.get(`${API_URL}/threads`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const markMessagesAsRead = async (projectId, senderId, token) => {
  if (!token) throw new Error('No auth token provided');
  const res = await axios.post(
    `${API_URL}/read`,
    { projectId, senderId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
