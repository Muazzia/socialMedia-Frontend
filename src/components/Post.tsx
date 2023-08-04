import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import useAddFriend from "../hooks/useAddFriend";
import useAddLike from "../hooks/useAddLike";
import { PostProp } from "../hooks/usePosts";
import Store from "../store/store";

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
  const setUserFrindsArr = Store((s) => s.setUserFrindsArr);
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

  return (
    <article
      id="post"
      className="p-4 flex flex-col gap-3 bg-[#202020] rounded-md  sm:w-[550px] md:w-full"
    >
      <div className="one flex items-center justify-between">
        <div className="image flex items-center gap-2">
          <div className="rounded-full w-9 h-9 object-cover overflow-hidden ">
            <img
              src={`http://localhost:3000/${data.userPicturePath}`}
              alt="profilePic"
              className="w-full h-full "
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-md">{data.firstName + " " + data.lastName}</h2>
            <p className="text-sm text-white/60">{data.location}</p>
          </div>
        </div>
        {!isUserPost && (
          <div className="addFriend ">
            {isFriend ? (
              <AiOutlineUserDelete
                size={23}
                className={"cursor-pointer bg-red-400 rounded-xl"}
                onClick={async () => {
                  const { res } = await useAddFriend(data.userId);
                  setUserFrindsArr(res?.data);
                }}
              />
            ) : (
              <AiOutlineUserAdd
                size={23}
                className={"cursor-pointer bg-blue-400 rounded-xl text-white"}
                onClick={async () => {
                  const { res } = await useAddFriend(data.userId);
                  setUserFrindsArr(res?.data);
                }}
              />
            )}
          </div>
        )}
      </div>
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
      <div className="four flex gap-4">
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
      </div>
    </article>
  );
};

export default Post;
