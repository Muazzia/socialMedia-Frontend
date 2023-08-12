import api from "@/services/apiClient";
import { AxiosError } from "axios";
import { useState } from "react";
import { User } from "./useProfileCard";

const useAddViews = () => {
  const [res, setRes] = useState<User>();
  const [err, SetErr] = useState<AxiosError>();
  const [success, setSuccess] = useState<boolean>();

  const addView = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken") || "";
      const response = await api.patch<User>(
        `/users/views/${id}`,
        {},
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (response.data) {
        setRes(response.data);
        setSuccess(true);
      }
      return response.data;
    } catch (err) {
      SetErr(err as AxiosError);
      setSuccess(false);
    }
  };

  return { res, err, addView, success };
};

export default useAddViews;
