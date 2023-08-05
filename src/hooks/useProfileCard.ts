import { AxiosError } from "axios";
import api from "../services/apiClient";
import { useEffect, useState } from "react";

export interface User {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  picturePath?: string;
  friends?: string[];
  location?: string;
  occupation?: string;
  viewedProfile: number;
  impressions: number;
}

const useProfileCard = (id: string) => {
  const [res, setRes] = useState<User>();
  const [error, setError] = useState({} as AxiosError);
  const [success, setSuccess] = useState<Boolean | null>(null);

  useEffect(() => {
    const fetcingData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const response = await api.get<User>(`/users/${id}`, {
          headers: {
            "x-auth-token": authToken,
          },
        });
        setRes(response.data);
        setSuccess(true);
      } catch (err: any) {
        setError(err as AxiosError);
        setSuccess(false);
      }
    };

    fetcingData();
  }, []);

  return { res, error, success };
};

export default useProfileCard;
