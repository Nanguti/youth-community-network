// axios client instance
import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set the token
export function setToken(token: string) {
  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
  }
}

// Add a request interceptor to add the token dynamically
axiosClient.interceptors.request.use(
  (config) => {
    // Check if token is set and add to the request if required
    const token = localStorage.getItem("token"); // or sessionStorage if needed
    if (token && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally, handle response errors globally using interceptors
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific errors like token expiration or unauthorized
    if (error.response && error.response.status === 401) {
      // Handle token expiration or re-authentication logic
      // For example: redirect to login or show a message
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
