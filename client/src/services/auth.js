import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const registerUser = async (userData) => {
  return await axios.post(`${BASE_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${BASE_URL}/login`, credentials);
};
