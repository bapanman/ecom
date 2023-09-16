import axios from "axios";

export const BASE_URL = "https://ecom-backend-iu5z.onrender.com";
export const LOCAL_URL = "http://localhost:5000";

export const axiosConnect = axios.create({
  baseURL: LOCAL_URL,
});
