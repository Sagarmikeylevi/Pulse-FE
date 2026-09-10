import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import * as userApi from "../api/user-api";
import type { ApiErrorResponse } from "@/features/auth/types";

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const body = error.response?.data as ApiErrorResponse | undefined;
    return body?.error ?? fallback;
  }
  return fallback;
}

export function useCheckTimezone() {
  const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return useQuery({
    queryKey: ["timezone", "check"],
    queryFn: () => userApi.checkTimezone(detectedTimezone),
    staleTime: Infinity,
    retry: false,
  });
}

export function useUpdateTimezone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (timezone: string) => userApi.updateTimezone(timezone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timezone", "check"] });
      toast.success("Timezone updated");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to update timezone"));
    },
  });
}
