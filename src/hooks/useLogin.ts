import { AxiosError } from "axios";
import api from "../services/apiClient";

type Data = {
  email: string;
  password: string;
};

const useLogin = async (data: Data) => {
  let res;
  let error;
  let success;
  try {
    res = await api.post("/auth/login", {
      ...data,
    });
    console.log(res.data);

    const authToken = res.headers["x-auth-token"];

    localStorage.setItem("socialUserId", res.data._id);
    localStorage.setItem("authToken", authToken);
    success = true;
  } catch (err: any) {
    error = err as AxiosError;
    success = false;
  }
  return {
    res,
    error,
    success,
  };
};

export default useLogin;
