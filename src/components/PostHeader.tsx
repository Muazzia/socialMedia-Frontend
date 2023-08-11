import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shad/ui/dropdown-menu";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { BiMessageAltDetail } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import useAddFriend from "../hooks/useAddFriend";
import { PostProp } from "../hooks/usePosts";
import useRemovePost from "../hooks/useRemovePost";
import Store from "../store/store";

interface Props {
  data: PostProp;
  arrPost: PostProp[];
  isFriend: Boolean;
  isUserPost: Boolean;
  showUpdate: Boolean;
  setUpdated: React.Dispatch<React.SetStateAction<PostProp[] | undefined>>;
  setShowUpdate: React.Dispatch<React.SetStateAction<Boolean>>;
}

const PostHeader = ({
  data,
  arrPost,
  setUpdated,
  isFriend,
  isUserPost,
  showUpdate,
  setShowUpdate,
}: Props) => {
  const handleDelete = async () => {
    try {
      const res = await deletePost(data._id);
      setUpdated(arrPost.filter((a) => a._id !== res?._id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleAddFriend = async (id: string) => {
    const response = await toggleFriend(id);
    if (response) setUserFrindsArr(response);
  };

  const { deletePost } = useRemovePost();
  const { toggleFriend } = useAddFriend();
  const setUserFrindsArr = Store((s) => s.setUserFrindsArr);

  return (
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
      {!isUserPost ? (
        <div className="addFriend flex gap-2 items-center">
          <Link to={`/message/${data.userId}`} preventScrollReset={true}>
            <BiMessageAltDetail size={23} />
          </Link>

          {isFriend ? (
            <AiOutlineUserDelete
              size={23}
              className={"cursor-pointer bg-red-400 rounded-xl"}
              onClick={() => handleAddFriend(data.userId)}
            />
          ) : (
            <AiOutlineUserAdd
              size={23}
              className={"cursor-pointer bg-blue-400 rounded-xl text-white"}
              onClick={() => handleAddFriend(data.userId)}
            />
          )}
        </div>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex focus-visible:outline-none">
              <div className="font-xl cursor-pointer flex gap-[3px] h-3 w-fit ">
                <div className="h-1 w-1 bg-white rounded-full" />
                <div className="h-1 w-1 bg-white rounded-full" />
                <div className="h-1 w-1 bg-white rounded-full" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-black px-[3px] w-[150px] py-[3px] flex flex-col gap-[1px]">
              <DropdownMenuItem
                onClick={handleDelete}
                className="flex justify-between"
              >
                Delete
                <MdDeleteForever color={"red"} className={"text-white"} />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setShowUpdate(!showUpdate);
                }}
                className="flex justify-between"
              >
                Update
                <GrUpdate size={18} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
};

export default PostHeader;
