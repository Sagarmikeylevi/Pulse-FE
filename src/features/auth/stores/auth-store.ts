import { create } from "zustand";
import type { AuthTokens } from "../types";

const TOKEN_KEY = "pulse_tokens";

function loadTokens(): AuthTokens | null {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthTokens;
    if (parsed.access_token && parsed.refresh_token) return parsed;
    return null;
  } catch {
    return null;
  }
}

function persistTokens(tokens: AuthTokens) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

function removeTokens() {
  localStorage.removeItem(TOKEN_KEY);
}

interface AuthState {
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  setTokens: (tokens: AuthTokens) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  tokens: loadTokens(),
  isAuthenticated: loadTokens() !== null,

  setTokens: (tokens) => {
    persistTokens(tokens);
    set({ tokens, isAuthenticated: true });
  },

  clearTokens: () => {
    removeTokens();
    set({ tokens: null, isAuthenticated: false });
  },
}));
