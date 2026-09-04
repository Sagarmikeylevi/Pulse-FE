import { Routes, Route } from "react-router-dom";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="*" element={<div>404 — Not Found</div>} />
    </Routes>
  );
}
