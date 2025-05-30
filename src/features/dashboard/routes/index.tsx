import { lazy } from "react";
import { CustomSuspense } from "@/components/loading";
import { Navigate, RouteObject } from "react-router-dom";

const DashboardPage = lazy(() => import("@/features/dashboard/page"));

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "/dashboard",
    element: (
      <CustomSuspense>
        <DashboardPage />
      </CustomSuspense>
    ),
  },
];
