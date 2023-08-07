import api from "../services/apiClient";
import { AxiosError } from "axios";

const useRegister = async (formData: FormData) => {
  let res;
  let error;
  let success;
  try {
    res = await api.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    success = true;
  } catch (err: any) {
    error = err as AxiosError;
    success = false;
  }
  return { res, error, success };
};

export default useRegister;
