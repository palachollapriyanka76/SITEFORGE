import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token for client-side requests
api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    // In the browser, we'll get the token from Clerk
    // The actual implementation will use useAuth() hook in components
    // This is a placeholder for server-side / API route usage
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to sign in
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
