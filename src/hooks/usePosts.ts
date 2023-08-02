import { AxiosError } from "axios";
import api from "../services/apiClient";

export type PostProp = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location?: string;
  description?: string;
  userPicturePath?: string;
  picturePath?: string;
  likes: { [key: string]: boolean };
  comments: string[];
};

const usePosts = async () => {
  let res;
  let error;
  let success;
  try {
    const token = localStorage.getItem("authToken");
    res = await api.get<PostProp[]>("/posts", {
      headers: {
        "x-auth-token": token,
      },
    });
    success = true;
  } catch (err) {
    error = err as AxiosError;
    success = false;
  }

  return { res, error, success };
};

export default usePosts;
