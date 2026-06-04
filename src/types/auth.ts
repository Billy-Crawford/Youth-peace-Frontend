// src/types/auth.ts

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  avatar: string | null;
  bio: string;
  is_verified: boolean;
  created_at: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}