import { Routes, Route } from "react-router-dom";
import { LoginPage } from "@/features/auth/components/LoginPage";
import {
  RequireAuth,
  RedirectIfAuth,
} from "@/features/auth/components/AuthGuard";
import { HomePage } from "@/features/home/components/HomePage";

export function AppRouter() {
  return (
    <Routes>
      {/* Public — redirect to / if already logged in */}
      <Route element={<RedirectIfAuth />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected — redirect to /login if not authenticated */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="*" element={<div>404 — Not Found</div>} />
    </Routes>
  );
}
