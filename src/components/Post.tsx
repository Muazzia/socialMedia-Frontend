import { AiFillHeart, AiOutlineUserDelete } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { PostProp } from "../hooks/usePosts";

interface PostP {
  data: PostProp;
}

const Post = ({ data }: PostP) => {
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
        <div className="addFriend ">
          <AiOutlineUserDelete size={23} />
          {/* <AiOutlineUserAdd size={23} /> */}
        </div>
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
