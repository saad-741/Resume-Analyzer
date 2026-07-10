import api from "../api/axios";

export const analyzeJobMatch = async (data) => {
  const response = await api.post("job-match/", data);
  return response.data;
};

export const getJobMatch = async (id) => {
  const response = await api.get(`job-match/${id}/`);
  return response.data;
};

export const getJobMatchHistory = async () => {
  const response = await api.get("job-match/history/");
  return response.data;
};