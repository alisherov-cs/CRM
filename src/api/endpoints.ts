export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
  },
  taskState: {
    one: (taskStateId: string) => `/task-state/${taskStateId}`,
    list: "/task-state",
  },
};
