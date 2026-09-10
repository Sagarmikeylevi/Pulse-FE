/**
 * Extract a human-readable city name from an IANA timezone ID.
 * "America/Los_Angeles" → "Los Angeles"
 * "Asia/Kolkata" → "Kolkata"
 */
export function getTimezoneCityName(tz: string): string {
  const parts = tz.split("/");
  const city = parts[parts.length - 1];
  return city.replace(/_/g, " ");
}

/**
 * Get the short timezone abbreviation (e.g. "IST", "PDT").
 */
export function getTimezoneAbbreviation(tz: string): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "short",
  });
  const parts = formatter.formatToParts(new Date());
  return parts.find((p) => p.type === "timeZoneName")?.value ?? tz;
}

/**
 * Get the long timezone name (e.g. "India Standard Time", "Pacific Daylight Time").
 */
export function getTimezoneLongName(tz: string): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "long",
  });
  const parts = formatter.formatToParts(new Date());
  return parts.find((p) => p.type === "timeZoneName")?.value ?? tz;
}

/**
 * Get the UTC offset difference in hours between two timezones.
 * Returns a string like "12.5 hours later" or "3 hours earlier".
 */
export function getOffsetDifference(
  currentTz: string,
  detectedTz: string,
): string {
  const now = new Date();

  const currentOffset = getUtcOffsetMinutes(now, currentTz);
  const detectedOffset = getUtcOffsetMinutes(now, detectedTz);

  const diffMinutes = detectedOffset - currentOffset;
  const diffHours = Math.abs(diffMinutes) / 60;

  const formatted =
    diffHours % 1 === 0 ? String(diffHours) : diffHours.toFixed(1);
  const unit = diffHours === 1 ? "hour" : "hours";
  const direction = diffMinutes > 0 ? "later" : "earlier";

  return `${formatted} ${unit} ${direction}`;
}

/**
 * Format midnight in a given timezone as a readable time string.
 * e.g. "12:00 AM PDT"
 */
export function formatMidnightIn(tz: string): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });

  // Create a date at midnight in the detected timezone
  const midnightStr = new Date().toLocaleDateString("en-CA", { timeZone: tz });
  const midnight = new Date(`${midnightStr}T00:00:00`);

  // Format that midnight moment in the detected timezone
  return formatter.format(midnight);
}

function getUtcOffsetMinutes(date: Date, tz: string): number {
  const utcStr = date.toLocaleString("en-US", { timeZone: "UTC" });
  const tzStr = date.toLocaleString("en-US", { timeZone: tz });
  const utcDate = new Date(utcStr);
  const tzDate = new Date(tzStr);
  return (tzDate.getTime() - utcDate.getTime()) / 60000;
}
