import { AxiosError } from "axios";
import { useState } from "react";
import api from "../services/apiClient";
import { PostProp } from "./usePosts";

const useAddPost = () => {
  const [res, setRes] = useState<PostProp[]>();
  const [error, setError] = useState<AxiosError>();
  const [success, setSuccess] = useState<Boolean>();
  const [loading, setLoading] = useState<boolean>(false);

  const addPost = async (formData: FormData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      setLoading(true);
      const response = await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": authToken,
        },
      });

      setRes(response.data);
      setSuccess(true);
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setError(err as AxiosError);
      setSuccess(false);
      setLoading(false);
    }
  };
  return {
    res,
    error,
    success,
    loading,
    addPost,
  };
};

export default useAddPost;
