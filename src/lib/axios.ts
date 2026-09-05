import axios from "axios";
import { env } from "@/config/env";

export const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const TOKEN_KEY = "pulse_tokens";

function getStoredTokens(): {
  access_token: string;
  refresh_token: string;
} | null {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredTokens(tokens: {
  access_token: string;
  refresh_token: string;
}) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

function clearStoredTokens() {
  localStorage.removeItem(TOKEN_KEY);
}

let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  for (const { resolve, reject } of pendingQueue) {
    if (error) reject(error);
    else resolve(token!);
  }
  pendingQueue = [];
}

// Attach access token to every request
api.interceptors.request.use((config) => {
  const tokens = getStoredTokens();
  if (tokens?.access_token) {
    config.headers.Authorization = `Bearer ${tokens.access_token}`;
  }
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Don't retry auth endpoints or already-retried requests
    if (
      !original ||
      original._retry ||
      original.url?.includes("/auth/token/refresh") ||
      original.url?.includes("/auth/login") ||
      original.url?.includes("/auth/otp/")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const tokens = getStoredTokens();

    if (!tokens?.refresh_token) {
      clearStoredTokens();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((newToken) => {
        original.headers.Authorization = `Bearer ${newToken}`;
        original._retry = true;
        return api(original);
      });
    }

    isRefreshing = true;
    original._retry = true;

    try {
      // Direct call to avoid circular import with auth-api
      const { data: newTokens } = await axios.post(
        `${env.API_URL}/api/v1/auth/token/refresh`,
        { refresh_token: tokens.refresh_token },
        { headers: { "Content-Type": "application/json" } },
      );

      setStoredTokens(newTokens);

      // Sync the Zustand store (lazy import to avoid circular dep at module level)
      const { useAuthStore } = await import(
        "@/features/auth/stores/auth-store"
      );
      useAuthStore.getState().setTokens(newTokens);

      processQueue(null, newTokens.access_token);
      original.headers.Authorization = `Bearer ${newTokens.access_token}`;
      return api(original);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearStoredTokens();

      const { useAuthStore } = await import(
        "@/features/auth/stores/auth-store"
      );
      useAuthStore.getState().clearTokens();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
