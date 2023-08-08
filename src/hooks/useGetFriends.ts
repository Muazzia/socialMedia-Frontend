import { AxiosError } from "axios";
import api from "../services/apiClient";
import { useEffect, useState } from "react";
import Store, { UserF } from "../store/store";

const useAddFriend = () => {
  const [res, setRes] = useState<UserF[]>();
  const [error, setError] = useState<AxiosError>();
  const [success, setSuccess] = useState<Boolean>();

  const setUserFrindsArr = Store((e) => e.setUserFrindsArr);

  useEffect(() => {
    const fetch = async () => {
      try {
        const id = localStorage.getItem("socialUserId");
        const authToken = localStorage.getItem("authToken");

        const response = await api.get<UserF[]>(`/users/${id}/friends`, {
          headers: {
            "x-auth-token": authToken,
          },
        });

        setRes(response.data);
        setUserFrindsArr(response.data);
        setSuccess(true);
      } catch (err: any) {
        setError(err as AxiosError);
        setSuccess(false);
      }
    };

    fetch();
  }, []);
  return { res, error, success };
};

export default useAddFriend;
