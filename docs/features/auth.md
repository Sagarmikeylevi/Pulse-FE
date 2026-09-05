# Auth Feature

## Overview

Two sign-in flows, both starting from the same entry point:

1. **Email + OTP** (default): User enters email → receives 6-digit code → verifies → signed in.
2. **Email + Password**: User switches to password mode → enters credentials → signed in.

OTP is the default because it doubles as signup — new users are created automatically on first OTP verification.

## Screens

### 1. Email Form (`/login`)
- Input: email address
- Primary CTA: "Send code →" — calls `POST /otp/send`, navigates to verify screen
- Secondary: "Sign in with a password" — switches to password form (no API call)

### 2. Password Form (`/login`)
- Inputs: email, password (with show/hide toggle)
- Primary CTA: "Sign in" — calls `POST /login`
- Secondary: "Email me a code instead" — switches back to email form
- Info box: "Forgot your password? Sign in with a code — you can reset it from your profile."
- Special error: if API returns `"password not set, use OTP login"`, user signed up via OTP and has no password

### 3. Verify Code Form (`/login`)
- "← Back" returns to email form
- Shows which email the code was sent to, with "Change" link
- 6-digit OTP input: auto-advance on type, paste fills all boxes, keyboard navigation
- Countdown timer (90s) with "Resend" button (disabled during countdown)
- Primary CTA: "Verify and continue" — calls `POST /otp/verify`
- Button is visually disabled (gray) until all 6 digits are entered

## State Machine

```
email ──(Send code)──────→ verify
email ──(Switch to pw)───→ password
password ──(Code instead)→ email
verify ──(Back / Change)─→ email
verify ──(Verify success)→ / (home, authenticated)
password ──(Login success)→ / (home, authenticated)
```

The email value is preserved when switching between views.

## Post-Auth

- On successful auth (OTP verify or password login), tokens are stored in `localStorage` and Zustand store.
- User is redirected to `/` via `navigate("/", { replace: true })`.
- Visiting `/login` while authenticated redirects to `/`.
- Visiting `/` while unauthenticated redirects to `/login`.

## Files

```
src/features/auth/
├── api/auth-api.ts          # sendOtp, verifyOtp, login, refreshToken
├── components/
│   ├── AuthGuard.tsx         # RequireAuth, RedirectIfAuth route guards
│   ├── AuthLayout.tsx        # Split-panel layout (branding left, form right)
│   ├── EmailForm.tsx         # Email-only form
│   ├── LoginPage.tsx         # View controller (manages which form is shown)
│   ├── OtpInput.tsx          # 6-digit code input with auto-advance
│   ├── PasswordForm.tsx      # Email + password form
│   └── VerifyCodeForm.tsx    # OTP verification form with countdown
├── hooks/use-auth.ts         # useSendOtp, useVerifyOtp, useLogin mutations
├── stores/auth-store.ts      # Zustand: tokens, isAuthenticated, setTokens, clearTokens
└── types/index.ts            # Zod schemas + API response types
```
