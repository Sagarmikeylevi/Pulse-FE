import { api } from "@/lib/axios";
import type { TimezoneCheckResponse, TimezoneUpdateResponse } from "../types";

const USER_BASE = "/api/v1/user";

export async function checkTimezone(
  timezone: string,
): Promise<TimezoneCheckResponse> {
  const { data } = await api.post<TimezoneCheckResponse>(
    `${USER_BASE}/timezone/check`,
    { timezone },
  );
  return data;
}

export async function updateTimezone(
  timezone: string,
): Promise<TimezoneUpdateResponse> {
  const { data } = await api.put<TimezoneUpdateResponse>(
    `${USER_BASE}/timezone`,
    { timezone },
  );
  return data;
}
