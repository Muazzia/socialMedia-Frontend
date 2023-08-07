import { useState } from "react";
import { AxiosError } from "axios";
import api from "../services/apiClient";
import { PostProp } from "./usePosts";

const useRemovePost = () => {
  const [response, setResponse] = useState<PostProp>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState<boolean>(false);

  const deletePost = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.delete<PostProp>(`/posts/${id}/1`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setResponse(response?.data);
      return response.data;
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, deletePost };
};

export default useRemovePost;
