import axios from "axios";
import { isTokenValid } from "../../services/tokenServices";

/**
 * Instance axios to the BACKEND
 *
 * @author Peter Mollet
 */
const apiBackEnd = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

apiBackEnd.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && isTokenValid(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiBackEnd;
