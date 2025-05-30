import { lazy } from "react";
import { CustomSuspense } from "@/components/loading";
import { RouteObject } from "react-router-dom";

const TaskStatePage = lazy(() => import("@/features/task-state/page"));

export const taskStateRoutes: RouteObject[] = [
  {
    path: "/task-state",
    element: (
      <CustomSuspense>
        <TaskStatePage />
      </CustomSuspense>
    ),
  },
];
