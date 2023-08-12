import { AxiosError } from "axios";
import api from "../services/apiClient";
import { useEffect, useState } from "react";
import Store from "../store/store";

export interface User {
  _id: string;
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
  const [loading, setLoading] = useState<boolean>(false);
  const setUserImgPath = Store((s) => s.setUserImgPath);

  useEffect(() => {
    const fetcingData = async () => {
      try {
        setLoading(true);
        const authToken = localStorage.getItem("authToken");
        const userId = localStorage.getItem("socialUserId");

        const response = await api.get<User>(`/users/${id}`, {
          headers: {
            "x-auth-token": authToken,
          },
        });
        setRes(response.data);
        if (userId === id) setUserImgPath(response.data.picturePath || "");
        setSuccess(true);
        setLoading(false);
      } catch (err: any) {
        setError(err as AxiosError);
        setSuccess(false);
        setLoading(false);
      }
    };

    fetcingData();
  }, []);

  return { res, error, success, setRes, loading };
};

export default useProfileCard;
