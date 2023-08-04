import { AxiosError } from "axios";
import api from "../services/apiClient";

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

const useProfileCard = async () => {
  let res;
  let error;
  let success;
  try {
    const id = localStorage.getItem("socialUserId");
    const authToken = localStorage.getItem("authToken");

    res = await api.get<User>(`/users/${id}`, {
      headers: {
        "x-auth-token": authToken,
      },
    });

    success = true;
  } catch (err: any) {
    error = err as AxiosError;
    success = false;
  }
  return { res, error, success };
};

export default useProfileCard;
