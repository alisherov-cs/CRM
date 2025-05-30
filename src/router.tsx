import { createBrowserRouter, Outlet } from "react-router-dom";
import { loginRoutes } from "./features/auth/login/routes";
import { dashboardRoutes } from "./features/dashboard/routes";
import { Layout } from "./features/layout";
import { taskStateRoutes } from "./features/task-state/routes";

const routesSortedByLayout = {
  withLayout: [dashboardRoutes, taskStateRoutes],
  withoutLayout: [loginRoutes],
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: routesSortedByLayout.withLayout.flat(),
  },
  ...routesSortedByLayout.withoutLayout.flat(),
]);
