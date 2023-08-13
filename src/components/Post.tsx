import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAddLike from "../hooks/useAddLike";
import { PostProp } from "../hooks/usePosts";
import PostHeader from "./PostHeader";
import PostUpdateForm from "./PostUpdateForm";
import { staticUrlPath } from "@/services/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import Store from "@/store/store";

interface PostP {
  data: PostProp;
  isFriend: Boolean;
  isUserPost: Boolean;
  userId: string;
  setUpdated?: React.Dispatch<React.SetStateAction<PostProp[] | undefined>>;
  arrPost?: PostProp[];
}

const Post = ({ data, isFriend, isUserPost, userId }: PostP) => {
  const { toggleLike } = useAddLike(data._id);
  const queryClient = useQueryClient();
  const userImgPath = Store((s) => s.userImgPath);

  const handleLikeClick = async () => {
    const updatedPost = await toggleLike();
    if (updatedPost) {
      queryClient.invalidateQueries({ queryKey: ["posts", userImgPath] });
      // setUpdated(
      //   arrPost.map((a) => {
      //     const val = a._id !== updatedPost._id ? a : updatedPost;
      //     return val;
      //   })
      // );
    }
  };

  const [showUpdate, setShowUpdate] = useState<Boolean>(false);

  return (
    <article
      id="post"
      className="p-4 flex flex-col gap-3 bg-[#202020] rounded-md  sm:w-[550px] md:w-full"
    >
      {!showUpdate ? (
        <>
          <PostHeader
            data={data}
            isFriend={isFriend}
            isUserPost={isUserPost}
            setShowUpdate={setShowUpdate}
            showUpdate={showUpdate}
          />
          <div className="two">
            <p className="text-sm text-white/80">{data.description}</p>
          </div>
          <div className="three">
            <img
              src={`${staticUrlPath}/${data.picturePath}`}
              className="w-full "
              alt="post Img"
            />
          </div>
          <div className="four flex items-center">
            {data.likes[userId] ? (
              <AiFillHeart
                size={24}
                className={"cursor-pointer"}
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent<SVGSVGElement>) => {
                  if (e.key === "Enter") {
                    handleLikeClick();
                  }
                }}
                onClick={() => {
                  handleLikeClick();
                }}
              />
            ) : (
              <AiOutlineHeart
                size={24}
                className={"cursor-pointer"}
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent<SVGSVGElement>) => {
                  if (e.key === "Enter") {
                    handleLikeClick();
                  }
                }}
                onClick={() => {
                  handleLikeClick();
                }}
              />
            )}
            <p className="ml-1 text-white/40 select-none">
              {Object.keys(data.likes).length}
            </p>
          </div>
        </>
      ) : (
        <PostUpdateForm data={data} setShowUpdate={setShowUpdate} />
      )}
    </article>
  );
};

export default Post;
