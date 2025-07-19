import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const createProject = (projectData, token) =>
  API.post('/projects', projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchAllProjects = () =>
  API.get('/projects');

export const fetchProjectById = (id) =>
  API.get(`/projects/${id}`);
