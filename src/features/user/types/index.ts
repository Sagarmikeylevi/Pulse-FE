// ---------- API types ----------

export interface TimezoneCheckRequest {
  timezone: string;
}

export interface TimezoneCheckResponse {
  match: boolean;
  current: string;
  detected: string;
}

export interface TimezoneUpdateRequest {
  timezone: string;
}

export interface TimezoneUpdateResponse {
  message: string;
}
