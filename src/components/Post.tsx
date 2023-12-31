import { staticUrlPath } from "@/services/apiClient";
import _ from "lodash";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAddLike from "../hooks/useAddLike";
import { PostProp } from "../hooks/usePosts";
import PostHeader from "./PostHeader";
import PostUpdateForm from "./PostUpdateForm";

interface PostP {
  data: PostProp;
  isFriend: Boolean;
  isUserPost: Boolean;
  userId: string;
  setUpdated: React.Dispatch<React.SetStateAction<PostProp[] | undefined>>;
  arrPost: PostProp[];
}

const Post = ({
  data,
  isFriend,
  isUserPost,
  userId,
  setUpdated,
  arrPost,
}: PostP) => {
  const { toggleLike, loading } = useAddLike(data._id);

  const handleLikeClick = async () => {
    const temp = _.cloneDeep(arrPost);

    if (!data.likes[userId]) {
      setUpdated(
        arrPost.map((a) => {
          if (a._id === data._id) {
            const updatedLikes = { ...a.likes, [userId]: true };
            return { ...a, likes: updatedLikes };
          }
          return a;
        })
      );
    } else {
      setUpdated(
        arrPost.map((a) => {
          if (a._id === data._id) {
            delete a.likes[userId];
            const updatedLikes = a.likes;
            return { ...a, likes: updatedLikes };
          }
          return a;
        })
      );
    }

    const updatedPost = await toggleLike();

    if (updatedPost) {
      setUpdated(
        arrPost.map((a) => {
          const val = a._id !== updatedPost._id ? a : updatedPost;
          return val;
        })
      );
    } else {
      setUpdated(temp);
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
            arrPost={arrPost}
            isFriend={isFriend}
            isUserPost={isUserPost}
            setShowUpdate={setShowUpdate}
            setUpdated={setUpdated}
            showUpdate={showUpdate}
          />
          <div className="two">
            <p className="text-sm text-white/80">{data.description}</p>
          </div>
          <div className="three">
            <img
              src={
                data.imgSecureUrl
                  ? data.imgSecureUrl
                  : `${staticUrlPath}/${data.picturePath}`
              }
              className="aspect-square object-cover w-full"
              alt="post Img"
            />
          </div>
          <div className="four flex items-center">
            {data.likes[userId] ? (
              <button
                tabIndex={0}
                disabled={loading}
                onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                  if (e.key === "Enter") {
                    handleLikeClick();
                  }
                }}
                className={"cursor-pointer disabled:cursor-default"}
                onClick={() => {
                  handleLikeClick();
                }}
              >
                <AiFillHeart size={"24px"} />
              </button>
            ) : (
              <button
                tabIndex={0}
                disabled={loading}
                onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                  if (e.key === "Enter") {
                    handleLikeClick();
                  }
                }}
                className={"cursor-pointer disabled:cursor-default "}
                onClick={() => {
                  handleLikeClick();
                }}
              >
                <AiOutlineHeart size={24} />
              </button>
            )}
            <p className="ml-1 text-white/40 select-none">
              {Object.keys(data.likes).length}
            </p>
          </div>
        </>
      ) : (
        <PostUpdateForm
          data={data}
          setShowUpdate={setShowUpdate}
          setUpdated={setUpdated}
          arrPost={arrPost}
        />
      )}
    </article>
  );
};

export default Post;
