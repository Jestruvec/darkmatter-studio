// Guards.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/context";

export const PrivateRoute = () => {
  const { authResponse } = useAuthContext();
  return authResponse ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
  const { authResponse } = useAuthContext();
  return authResponse ? <Navigate to="/" replace /> : <Outlet />;
};
