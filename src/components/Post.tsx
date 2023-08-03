import {
  AiFillHeart,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { PostProp } from "../hooks/usePosts";
import useAddFriend from "../hooks/useAddFriend";
import Store from "../store/store";

interface PostP {
  data: PostProp;
  isFriend: Boolean;
  isUserPost: Boolean;
}

const Post = ({ data, isFriend, isUserPost }: PostP) => {
  const setUserFrindsArr = Store((s) => s.setUserFrindsArr);

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
        <AiFillHeart size={24} className={"cursor-pointer"} />
        {/* <AiOutlineHeart /> */}
        <BiCommentDetail size={24} className={"cursor-pointer"} />
      </div>
    </article>
  );
};

export default Post;
