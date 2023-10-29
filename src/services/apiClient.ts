import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://social-backend.adaptable.app",
});

const staticUrlPath = "https://social-backend.adaptable.app";
export { staticUrlPath };

export default api;
