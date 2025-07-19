import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// For authenticated routes
const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createProject = (projectData, token) =>
  API.post('/projects', projectData, authHeader(token));

export const fetchAllProjects = () =>
  API.get('/projects');

export const fetchProjectById = (id) =>
  API.get(`/projects/${id}`);

// ✅ Add this function to get posted projects by the logged-in client
export const getPostedProjects = (token) =>
  API.get('/projects/my-posted-projects', authHeader(token));
