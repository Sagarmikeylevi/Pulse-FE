export const env = {
  API_URL: import.meta.env.VITE_API_URL as string,
  APP_NAME: import.meta.env.VITE_APP_NAME as string || "Pulse",
} as const;
