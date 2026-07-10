import api from "../api/axios";

// POST /api/jobs/
export const createJob = async (data) => {
  const response = await api.post("jobs/", data);
  return response.data;
};

// GET /api/jobs/
export const getJobs = async () => {
  const response = await api.get("jobs/");
  return response.data;
};

// GET /api/jobs/:id/
export const getJob = async (id) => {
  const response = await api.get(`jobs/${id}/`);
  return response.data;
};

// PUT
export const updateJob = async (id, data) => {
  const response = await api.put(`jobs/${id}/`, data);
  return response.data;
};

// DELETE
export const deleteJob = async (id) => {
  await api.delete(`jobs/${id}/`);
}