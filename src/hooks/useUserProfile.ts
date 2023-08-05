import { useEffect, useState } from "react";
import api from "../services/apiClient";
import { AxiosError } from "axios";
import { PostProp } from "./usePosts";

const useUserProfile = (id: string) => {
  const [res, setRes] = useState<PostProp[]>();
  const [error, setError] = useState({} as AxiosError);
  const [success, setSuccess] = useState<Boolean | null>(null);

  useEffect(() => {
    const FetchingData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get<PostProp[]>(`/posts/${id}/allposts`, {
          headers: {
            "x-auth-token": token,
          },
        });
        setRes(response.data);
        setSuccess(true);
      } catch (err) {
        setError(err as AxiosError);
        setSuccess(false);
      }
    };

    FetchingData();
  }, []);

  return { res, error, success, setRes };
};

export default useUserProfile;
