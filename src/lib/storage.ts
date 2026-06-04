// src/lib/storage.ts

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const storage = {
  getAccessToken: () => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(ACCESS_TOKEN);
  },

  getRefreshToken: () => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(REFRESH_TOKEN);
  },

  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_TOKEN, access);
    localStorage.setItem(REFRESH_TOKEN, refresh);
  },

  clearTokens: () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  },
};
