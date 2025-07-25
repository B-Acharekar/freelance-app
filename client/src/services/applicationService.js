import axios from "axios";

const API = axios.create({
  baseURL: "https://freelance-api-lwu9.onrender.com/api/applications",
});

// Apply for a project
export const applyForProject = (projectId, applicationData, token) =>
  API.post(`/${projectId}`, applicationData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get applications by project (for client)
export const fetchApplicationsByProject = (projectId, token) =>
  API.get(`/project/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get my applications (freelancer)
export const fetchMyApplications = (token) =>
  API.get("/my-applications", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateApplicationStatus = (id, status, token) =>
  API.patch(
    `/${id}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const updateMyApplication = (id, updatedData, token) =>
  API.patch(`/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteMyApplication = (id, token) =>
  API.delete(`/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchApplicationById = (id, token) =>
  API.get(`/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const makeBid = async (projectId) => {
  const res = await axios.post("/make-bid", { projectId });
  return res.data;
};
