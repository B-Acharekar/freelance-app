import axios from 'axios';

const API_URL = 'http://localhost:5000/api/freelancer';

export const getFreelancerProfile = async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  return res.data;
};

export const updateFreelancerProfile = async (userId, data) => {
  const res = await axios.put(`${API_URL}/${userId}`, data);
  return res.data;
};
