import axios from "axios";

const staticUrlPath = "https://social-backend.adaptable.app";
const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: staticUrlPath,
});

export { staticUrlPath };

export default api;
