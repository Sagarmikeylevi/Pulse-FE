import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as authApi from "../api/auth-api";
import { useAuthStore } from "../stores/auth-store";
import type { ApiErrorResponse } from "../types";

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const body = error.response?.data as ApiErrorResponse | undefined;
    return body?.error ?? fallback;
  }
  return fallback;
}

export function useSendOtp() {
  return useMutation({
    mutationFn: (email: string) => authApi.sendOtp(email),
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to send code"));
    },
  });
}

export function useVerifyOtp() {
  const setTokens = useAuthStore((s) => s.setTokens);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) => {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return authApi.verifyOtp(email, code, timezone);
    },
    onSuccess: (tokens) => {
      setTokens(tokens);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Verification failed"));
    },
  });
}

export function useLogin() {
  const setTokens = useAuthStore((s) => s.setTokens);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: (tokens) => {
      setTokens(tokens);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Login failed"));
    },
  });
}
