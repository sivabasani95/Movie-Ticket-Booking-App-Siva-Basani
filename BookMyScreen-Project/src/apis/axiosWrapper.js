
import axios from "axios";

// Set the default headers for API requests.
const defaultHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Connect the React frontend to the backend API.
export const axiosWrapper = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    ...defaultHeader,
  },
});