// src/services/uploadService.js
import axios from 'axios';

const API_URL = 'https://freelance-api-lwu9.onrender.com/api';

export const uploadFileToCloudinary = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_URL}/uploads`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: onProgress,
    withCredentials: true,
  });

  return response.data;
};
