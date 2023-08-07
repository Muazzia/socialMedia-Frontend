import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../@/components/shad/ui/dropdown-menu";
import useAddFriend from "../hooks/useAddFriend";
import useAddLike from "../hooks/useAddLike";
import { PostProp } from "../hooks/usePosts";
import Store from "../store/store";

import { MdDeleteForever } from "react-icons/md";
import useRemovePost from "../hooks/useRemovePost";

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

  const { deletePost } = useRemovePost();

  const handleDelete = async () => {
    try {
      const res = await deletePost(data._id);
      setUpdated(arrPost.filter((a) => a._id !== res?._id));
    } catch (error) {
      console.error("Error deleting post:", error);
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
            {data.userPicturePath ? (
              <img
                src={`http://localhost:3000/${data.userPicturePath}`}
                alt="profilePic"
                className="w-full h-full "
              />
            ) : (
              <img src="" alt="profilePic" className="w-full h-full " />
            )}
          </div>
          <div className="flex flex-col">
            <Link to={`/profile/${data.userId}`} preventScrollReset={true}>
              <h2 className="text-md hover:underline">
                {data.firstName + " " + data.lastName}
              </h2>
            </Link>
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
        {isUserPost && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex focus-visible:outline-none">
                <div className="font-xl cursor-pointer flex gap-[3px] h-3 ">
                  <div className="h-1 w-1 bg-white rounded-full" />
                  <div className="h-1 w-1 bg-white rounded-full" />
                  <div className="h-1 w-1 bg-white rounded-full" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="text-black px-[3px] w-[150px] py-[3px]">
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="px-2 flex items-bottom  justify-between cursor-pointer py-1 rounded-md focus-visible:outline-none border-none hover:bg-gray-400"
                >
                  Delete
                  <MdDeleteForever color={"red"} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
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
        <p className="ml-1 text-white/40">{Object.keys(data.likes).length}</p>
      </div>
    </article>
  );
};

export default Post;
