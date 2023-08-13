import api from "@/services/apiClient";
import { PostProp } from "./usePosts";
import Store from "@/store/store";
import { useQuery } from "@tanstack/react-query";

const useQueryPost = () => {
  const token = localStorage.getItem("authToken");
  const userImg = Store((s) => s.userImgPath);

  return useQuery({
    queryKey: ["posts", userImg],
    queryFn: () =>
      api.get<PostProp[]>("/posts", {
        headers: {
          "x-auth-token": token,
        },
      }),
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export default useQueryPost;
