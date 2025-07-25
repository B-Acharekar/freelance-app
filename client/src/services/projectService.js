import axios from "axios";

const API = axios.create({
  baseURL: `${REACT_APP_API_URL}/api`,
});

// For authenticated routes
const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createProject = (projectData, token) =>
  API.post("/projects", projectData, authHeader(token));

export const fetchAllProjects = () => API.get("/projects");

export const fetchProjectById = (id) => API.get(`/projects/${id}`);

export const getPostedProjects = (token) =>
  API.get("/projects/my-posted-projects", authHeader(token));

export const updateProject = (id, projectData, token) =>
  API.put(`/projects/${id}`, projectData, authHeader(token));

export const deleteProject = (id, token) =>
  API.delete(`/projects/${id}`, authHeader(token));

export const getMyActiveProjects = (token) =>
  API.get("/projects/my-active-projects", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const completeProject = (projectId, token) =>
  API.patch(`/projects/complete/${projectId}`, null, authHeader(token));
