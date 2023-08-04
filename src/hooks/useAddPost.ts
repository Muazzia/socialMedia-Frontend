import { AxiosError } from "axios";
import api from "../services/apiClient";

const useAddPost = async (formData: FormData) => {
  let res;
  let error;
  let success;
  try {
    const authToken = localStorage.getItem("authToken");

    res = await api.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": authToken,
      },
    });

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

export default useAddPost;
