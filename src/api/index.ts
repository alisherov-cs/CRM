import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const axiosPrivate = axios.create({
  baseURL,
});
const axiosPublic = axios.create({
  baseURL,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const organizationId = localStorage.getItem("organizationId");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (window.location.pathname.includes("workspace") && organizationId) {
      config.headers["x-organization-id"] = JSON.parse(organizationId);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Token has expired" &&
      error.response?.data?.error === "Unauthorized" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosPrivate.get("/auth/refresh");
        console.log("refreshResponse:", refreshResponse);

        if (refreshResponse?.data?.accessToken) {
          const newAccessToken = refreshResponse.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(originalRequest);
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login";
        return Promise.reject(err);
      }
    }

    if (
      error.response?.status === 405 &&
      error.response?.data?.message === "Password Change Requierd" &&
      error.response?.data?.error === "Method Not Allowed"
    ) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export { axiosPublic, axiosPrivate };
