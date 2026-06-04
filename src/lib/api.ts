// src/lib/api.ts

import axios from "axios";
import { storage } from "./storage";

const api = axios.create({
  baseURL: "https://youth-peace-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = storage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

