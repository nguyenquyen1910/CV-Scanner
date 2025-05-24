export const API_BASE_URL = "http://localhost:8000";

export const API_ENDPOINTS = {
  UPLOAD_CV: `${API_BASE_URL}/upload-cv/`,
  UPLOAD_JD: `${API_BASE_URL}/upload-jd/`,
  SAVE_CV: `${API_BASE_URL}/save-cv`,
  SAVE_JD: `${API_BASE_URL}/jd-storage/save-jd`,
  ANALYZE: `${API_BASE_URL}/analyze/analyst-matching`,
  GET_CV_DETAILS: (id: number) => `${API_BASE_URL}/${id}`,
  GET_JD_DETAILS: (id: number) => `${API_BASE_URL}/jd-storage/${id}`,
};
