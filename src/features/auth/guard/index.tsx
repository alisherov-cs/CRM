import { Navigate, Outlet } from "react-router-dom";
import { useAuthMe } from "./api/me.request";
import { Loading } from "@/components";

export const AuthGuard = () => {
  const { isLoading, isError } = useAuthMe();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};
