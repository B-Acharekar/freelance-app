import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/admin`,
});

// Attach token dynamically before every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getAdminData = async () => {
  const [usersRes, projectsRes, appsRes] = await Promise.all([
    API.get("/users"),
    API.get("/projects"),
    API.get("/applications"),
  ]);

  return {
    users: usersRes.data,
    projects: projectsRes.data,
    applications: appsRes.data,
  };
};

export const blockUser = async (userId) => {
  return API.put(`/users/${userId}/block`);
};

export const setSystemAnnouncement = async (message) => {
  return API.post("/announcement", { message });
};

export const getSystemAnnouncement = async () => {
  const res = await API.get("/announcement");
  return res.data; // returns { message, updatedAt }
};

export const clearSystemAnnouncement = async () => {
  return API.delete("/announcement");
};
