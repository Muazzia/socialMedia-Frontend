import api from "../services/apiClient";
import { PostProp } from "./usePosts";

const useUpdatePost = () => {
  const fetchUpdate = async (id: string, data: FormData) => {
    try {
      const authToken = localStorage.getItem("authToken");
      let response = await api.put<PostProp>(`/posts/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": authToken,
        },
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return { fetchUpdate };
};

export default useUpdatePost;
