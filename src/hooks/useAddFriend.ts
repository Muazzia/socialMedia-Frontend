import { AxiosError } from "axios";
import { useState } from "react";
import api from "../services/apiClient";
import { UserF } from "../store/store";

const useAddFriend = () => {
  const [res, setRes] = useState<UserF[]>();
  const [error, setError] = useState<AxiosError>();
  const [success, setSuccess] = useState<boolean>();
  const [loading, setLoading] = useState(false);

  const toggleFriend = async (fId: string) => {
    try {
      setLoading(true);
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
      setLoading(false);
      return response.data;
    } catch (err: any) {
      setSuccess(false);
      setLoading(false);
      setError(err as AxiosError);
    }
  };

  return { res, error, success, toggleFriend, loading };
};

export default useAddFriend;
