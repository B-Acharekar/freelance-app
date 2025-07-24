import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const getUserProfile = async (token) => {
  const res = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return await res.json();
};

export const updateFreelancerProfile = async (userId, data, token) => {
  const res = await axios.put(`${API_URL}/freelancer/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateClientProfile = async (data, token) => {
  const res = await axios.put(`${API_URL}/client`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const fetchFreelancers = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getFreelancerById = async (id, token) => {
  const res = await fetch(`${API_URL}/freelancer/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return await res.json();
};
export const getUserProfileById = async (userId, token) => {
  const response = await fetch(`/api/client/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch client");
  return response.json();
};

export const getSystemAnnouncementForUser = async () => {
  const res = await axios.get(`${API_URL}/announcement`);
  return res.data;
};
