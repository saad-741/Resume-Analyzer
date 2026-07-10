import api from "../api/axios";

// POST /api/resumes/
export const uploadResume = async (formData) => {
  const response = await api.post("resumes/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// GET /api/resumes/
export const getMyResumes = async () => {
  const response = await api.get("resumes/");
  return response.data;
};

// GET /api/resumes/:id/
export const getResume = async (id) => {
  const response = await api.get(`resumes/${id}/`);
  return response.data;
};

// DELETE /api/resumes/:id/
export const deleteResume = async (id) => {
  const response = await api.delete(`resumes/${id}/`);
  return response.data;
};

