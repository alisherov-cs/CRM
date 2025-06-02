import { lazy } from "react";
import { CustomSuspense } from "@/components/loading";
import { Navigate, RouteObject } from "react-router-dom";
import { AuthGuard } from "@/features/auth/guard";

const DashboardPage = lazy(() => import("@/features/dashboard/page"));

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/dashboard",
        element: (
          <CustomSuspense>
            <DashboardPage />
          </CustomSuspense>
        ),
      },
    ],
  },
];
