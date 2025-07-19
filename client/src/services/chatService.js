// src/services/chatService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chat';

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
