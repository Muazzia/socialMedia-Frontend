// useAddLike.ts

import { AxiosError } from "axios";
import { useState } from "react";
import api from "../services/apiClient";
import { PostProp } from "./usePosts";

const useAddLike = (postId: string) => {
  const [error, setError] = useState({} as AxiosError);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleLike = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("socialUserId");
      const token = localStorage.getItem("authToken");
      const response = await api.put<PostProp>(
        `/posts/${postId}/like`,
        {
          userId,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setSuccess(true);
      setLoading(false);
      return response.data; // Return the updated post data
    } catch (err) {
      setLoading(false);
      setError(err as AxiosError);
      setSuccess(false);
    }
  };

  return { error, success, toggleLike, loading };
};

export default useAddLike;
