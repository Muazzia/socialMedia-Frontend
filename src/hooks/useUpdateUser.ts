import api from "@/services/apiClient";
import { AxiosError } from "axios";
import { useState } from "react";
import { User } from "./useProfileCard";

const useUpdateUser = () => {
  const [res, setRes] = useState<User>({} as User);
  const [err, setErr] = useState<AxiosError>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = async (data: FormData) => {
    const userId = localStorage.getItem("socialUserId") || "";
    const token = localStorage.getItem("authToken") || "";
    try {
      setLoading(true);
      const response = await api.put<User>(`/users/${userId}`, data, {
        headers: {
          "x-auth-token": token,
        },
      });

      if (response.data) setRes(response.data);
      setLoading(false);

      return response.data;
    } catch (err) {
      setErr(err as AxiosError);
      setLoading(false);
    }
  };

  return { res, err, fetch, loading };
};

export default useUpdateUser;
