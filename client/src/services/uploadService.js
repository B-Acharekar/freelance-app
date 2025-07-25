// src/services/uploadService.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

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
