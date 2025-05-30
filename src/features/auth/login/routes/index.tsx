import { lazy } from "react";
import { CustomSuspense } from "@/components/loading";
import { RouteObject } from "react-router-dom";

const LoginPage = lazy(() => import("@/features/auth/login/page"));

export const loginRoutes: RouteObject[] = [
  {
    path: "/auth/login",
    element: (
      <CustomSuspense>
        <LoginPage />
      </CustomSuspense>
    ),
  },
];
