import api from "../api/axios";

export const analyzeResume = async (resumeId) => {
  const response = await api.post(`analysis/${resumeId}/`);
  return response.data;
};
 

export const getAnalysis = async (resumeId) => {
  try {
    const response = await api.get(`analysis/result/${resumeId}/`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      // Resume has not been analyzed yet
      return null;
    }

    throw error;
  }
};

 