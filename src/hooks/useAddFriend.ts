import { AxiosError } from "axios";
import { useState } from "react";
import api from "../services/apiClient";
import { UserF } from "../store/store";

const useAddFriend = () => {
  const [res, setRes] = useState<UserF[]>();
  const [error, setError] = useState<AxiosError>();
  const [success, setSuccess] = useState<boolean>();

  const toggleFriend = async (fId: string) => {
    try {
      const id = localStorage.getItem("socialUserId");
      const authToken = localStorage.getItem("authToken");
      const response = await api.put<UserF[]>(
        `/users/${id}/${fId}`,
        {},
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      setRes(response.data);
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      setSuccess(false);
      setError(err as AxiosError);
    }
  };

  return { res, error, success, toggleFriend };
};

export default useAddFriend;
