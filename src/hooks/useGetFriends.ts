import { AxiosError } from "axios";
import api from "../services/apiClient";

const useAddFriend = async () => {
  let res;
  let error;
  let success;
  try {
    const id = localStorage.getItem("socialUserId");
    const authToken = localStorage.getItem("authToken");
    console.log(id);

    res = await api.get(`/users/${id}/friends`, {
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

export default useAddFriend;
