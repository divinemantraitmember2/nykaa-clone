// lib/apiClient.js
import axios from "axios";

const baseURL = "https://dummyjson.com";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  return "";
};

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto-attach token
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Common function for calling API
export const apiRequest = async (method, endpoint, data = {}) => {
  try {
    const res = await axiosInstance({
      method,
      url: endpoint,
      data,
    });
    return res.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
