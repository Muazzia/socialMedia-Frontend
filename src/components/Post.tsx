import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAddLike from "../hooks/useAddLike";
import { PostProp } from "../hooks/usePosts";

import { useState } from "react";
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
  const { toggleLike } = useAddLike(data._id);

  const handleLikeClick = async () => {
    const updatedPost = await toggleLike();
    if (updatedPost) {
      setUpdated(
        arrPost.map((a) => {
          const val = a._id !== updatedPost._id ? a : updatedPost;
          return val;
        })
      );
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
              src={`http://localhost:3000/${data.picturePath}`}
              className="w-full "
              alt="post Img"
            />
          </div>
          <div className="four flex items-center">
            {data.likes[userId] ? (
              <AiFillHeart
                size={24}
                className={"cursor-pointer"}
                onClick={() => {
                  handleLikeClick();
                }}
              />
            ) : (
              <AiOutlineHeart
                size={24}
                className={"cursor-pointer"}
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
