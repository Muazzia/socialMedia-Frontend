import { useEffect, useState } from "react";
import api from "../services/apiClient";
import { User } from "./useProfileCard";
import { AxiosError } from "axios";

const useUserSearch = (userName: string) => {
  const [res, setRes] = useState<User[]>();
  const [err, setErr] = useState<AxiosError>();
  const [loading, setLoading] = useState<Boolean>();

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("authToken");
      setLoading(true);
      try {
        let response = await api.get<User[]>(`/users/${userName}/userList`, {
          headers: {
            "x-auth-token": token,
          },
        });

        setRes(response.data || ([] as User[]));
        setLoading(false);
      } catch (err) {
        setErr(err as AxiosError);
        setLoading(false);
      }
    };
    if (userName.length !== 0) fetch();
  }, []);

  return { res, err, loading, setRes };
};

export default useUserSearch;
