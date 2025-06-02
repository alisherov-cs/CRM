export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  taskState: {
    one: (taskStateId: string) => `/task-state/${taskStateId}`,
    list: "/task-state",
  },
};
