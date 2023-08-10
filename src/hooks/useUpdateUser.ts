import api from "@/services/apiClient";
import { AxiosError } from "axios";
import { useState } from "react";
import { User } from "./useProfileCard";

const useUpdateUser = () => {
  const [res, setRes] = useState<User>({} as User);
  const [err, setErr] = useState<AxiosError>();

  const fetch = async (data: FormData) => {
    const userId = localStorage.getItem("socialUserId") || "";
    const token = localStorage.getItem("authToken") || "";
    try {
      const response = await api.put<User>(`/users/${userId}`, data, {
        headers: {
          "x-auth-token": token,
        },
      });

      if (response.data) setRes(response.data);
      return response.data;
    } catch (err) {
      setErr(err as AxiosError);
    }
  };

  return { res, err, fetch };
};

export default useUpdateUser;
