// src/lib/auth.ts

import api from "./api";
import { User, LoginResponse } from "@/types/auth";

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("/api/auth/login/", {
    email,
    password,
  });

  return response.data;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get("/api/auth/profile/");

  return response.data;
};

export const updateProfile = async (
  data: Partial<User>
): Promise<User> => {
  const response = await api.patch(
    "/api/auth/profile/",
    data
  );

  return response.data;
};
