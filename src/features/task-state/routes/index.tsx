import { lazy } from "react";
import { CustomSuspense } from "@/components/loading";
import { RouteObject } from "react-router-dom";
import { AuthGuard } from "@/features/auth/guard";

const TaskStatePage = lazy(() => import("@/features/task-state/page"));

export const taskStateRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: "/task-state",
        element: (
          <CustomSuspense>
            <TaskStatePage />
          </CustomSuspense>
        ),
      },
    ],
  },
];
