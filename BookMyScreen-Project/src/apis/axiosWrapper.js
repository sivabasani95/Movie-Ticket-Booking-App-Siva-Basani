

import axios from "axios";

// Set the default headers for API requests.
const defaultHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Connect the React frontend to the Spring Boot backend.
export const axiosWrapper = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,

  withCredentials: true,

  headers: {
    ...defaultHeader,
  },
});


// ==========================================================
// ADD ACCESS TOKEN TO REQUESTS
// ==========================================================

// This runs automatically before every request
// sent through axiosWrapper.
axiosWrapper.interceptors.request.use(
  (config) => {

    // Get the access token saved after OTP verification.
    const accessToken =
      localStorage.getItem("accessToken");

    // If an access token exists, send it to Spring Boot.
    if (accessToken) {

      // Spring Boot expects:
      // Authorization: Bearer <token>
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    // Continue with the API request.
    return config;
  },

  (error) => {

    // Return the error if something goes wrong
    // while preparing the request.
    return Promise.reject(error);
  }
);