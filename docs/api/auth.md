# Auth API

Base URL: `{VITE_API_URL}/api/v1/auth`

All endpoints are public — no Authorization header required.

---

## POST /otp/send

Send a 6-digit OTP to the given email.

**Request:**
```json
{ "email": "user@example.com" }
```

**200 OK:**
```json
{ "message": "OTP sent successfully" }
```

**Errors:**

| Status | When | Body |
|--------|------|------|
| 429 | Requested within 90s cooldown | `{"error": "please wait before requesting a new OTP"}` |
| 500 | Server error | `{"error": "failed to send OTP"}` |

---

## POST /otp/verify

Verify OTP and receive auth tokens. Creates user automatically if email is new (signup flow). Marks email as verified.

**Request:**
```json
{
  "email": "user@example.com",
  "code": "482910",
  "timezone": "Asia/Kolkata"
}
```

**200 OK:**
```json
{
  "access_token": "<JWT>",
  "refresh_token": "<64-char hex>"
}
```

**Errors:**

| Status | When | Body |
|--------|------|------|
| 400 | Invalid/missing fields | `{"error": "invalid request"}` |
| 401 | Wrong OTP code | `{"error": "invalid OTP"}` |
| 401 | OTP expired (>5 min) | `{"error": "OTP has expired"}` |

---

## POST /login

Password-based sign in.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

**200 OK:**
```json
{
  "access_token": "<JWT>",
  "refresh_token": "<64-char hex>"
}
```

**Errors:**

| Status | When | Body |
|--------|------|------|
| 400 | Invalid/missing fields | `{"error": "invalid request"}` |
| 400 | User has no password (signed up via OTP) | `{"error": "password not set, use OTP login"}` |
| 401 | Wrong credentials | `{"error": "login failed"}` |

---

## POST /token/refresh

Exchange a refresh token for a new token pair. Refresh tokens are rotated on every use.

**Request:**
```json
{ "refresh_token": "<64-char hex>" }
```

**200 OK:**
```json
{
  "access_token": "<JWT (new)>",
  "refresh_token": "<64-char hex (new, rotated)>"
}
```

**Errors:**

| Status | When | Body |
|--------|------|------|
| 400 | Missing token | `{"error": "refresh token is required"}` |
| 401 | Expired token | `{"error": "refresh token has expired"}` |
| 401 | Token revoked | `{"error": "token has been revoked"}` |
| 401 | Reuse detected (theft) | `{"error": "token reuse detected, please login again"}` |
| 500 | Server error | `{"error": "token refresh failed"}` |

---

## Token Lifetimes

| Token | Expiry |
|-------|--------|
| Access token (JWT) | 15 minutes |
| Refresh token | 30 days |

## Implementation Notes

- The axios interceptor in `src/lib/axios.ts` handles automatic token refresh on 401 responses for non-auth endpoints.
- Tokens are stored in localStorage under `pulse_tokens` and synced with the Zustand auth store.
- On refresh failure or token reuse detection, the user is logged out and redirected to `/login`.
