import { api } from "@/lib/axios";
import type { AuthTokens } from "../types";

const AUTH_BASE = "/api/v1/auth";

export async function sendOtp(email: string): Promise<{ message: string }> {
  const { data } = await api.post<{ message: string }>(
    `${AUTH_BASE}/otp/send`,
    { email },
  );
  return data;
}

export async function verifyOtp(
  email: string,
  code: string,
  timezone: string,
): Promise<AuthTokens> {
  const { data } = await api.post<AuthTokens>(`${AUTH_BASE}/otp/verify`, {
    email,
    code,
    timezone,
  });
  return data;
}

export async function login(
  email: string,
  password: string,
): Promise<AuthTokens> {
  const { data } = await api.post<AuthTokens>(`${AUTH_BASE}/login`, {
    email,
    password,
  });
  return data;
}

export async function refreshToken(
  refresh_token: string,
): Promise<AuthTokens> {
  const { data } = await api.post<AuthTokens>(`${AUTH_BASE}/token/refresh`, {
    refresh_token,
  });
  return data;
}
