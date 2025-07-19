import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (userData) => {
  return await axios.post(`${BASE_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${BASE_URL}/login`, credentials);
};
