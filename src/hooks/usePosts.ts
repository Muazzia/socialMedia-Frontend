import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import api from "../services/apiClient";
import Store from "@/store/store";

export type PostProp = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location?: string;
  occupation?: string;
  description?: string;
  userPicturePath?: string;
  picturePath?: string;
  likes: { [key: string]: boolean };
  comments: string[];
  imgSecureUrl: string;
};

const usePosts = () => {
  const [res, setRes] = useState<PostProp[]>();
  const [error, setError] = useState({} as AxiosError);
  const [success, setSuccess] = useState<Boolean | null>(null);

  const userImg = Store((s) => s.userImgPath);

  useEffect(() => {
    const FetchingData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get<PostProp[]>("/posts", {
          headers: {
            "x-auth-token": token,
          },
        });
        setRes(response.data.reverse());
        setSuccess(true);
      } catch (err) {
        setError(err as AxiosError);
        setSuccess(false);
      }
    };

    FetchingData();
  }, [userImg]);
  return { res, setRes, error, success };
};

export default usePosts;
