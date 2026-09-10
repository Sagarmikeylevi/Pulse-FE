# User API

Base URL: `{VITE_API_URL}/api/v1/user`

All endpoints require `Authorization: Bearer <token>`.

---

## POST /timezone/check

Check if the user's stored timezone matches the detected device timezone.

**Request:**
```json
{ "timezone": "America/New_York" }
```

**200 OK:**
```json
{
  "match": false,
  "current": "Asia/Kolkata",
  "detected": "America/New_York"
}
```

| Field | Type | Description |
|-------|------|-------------|
| match | boolean | `true` if stored and detected timezones are the same |
| current | string | IANA timezone currently stored on the server |
| detected | string | IANA timezone sent in the request |

---

## PUT /timezone

Update the user's timezone. Called when the user explicitly confirms they want to switch.

**Request:**
```json
{ "timezone": "America/New_York" }
```

**200 OK:**
```json
{ "message": "timezone updated successfully" }
```

**Errors:**

| Status | When | Body |
|--------|------|------|
| 400 | Invalid/missing timezone | `{"error": "invalid request"}` |
| 401 | Missing or expired token | Handled by axios interceptor |
