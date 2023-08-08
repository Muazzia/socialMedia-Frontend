import { Link } from "react-router-dom";
import { PostProp } from "../hooks/usePosts";
import useRemovePost from "../hooks/useRemovePost";
import Store from "../store/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/shad/ui/dropdown-menu";
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import useAddFriend from "../hooks/useAddFriend";

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

  const { deletePost } = useRemovePost();

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
            <DropdownMenuContent className="text-black px-[3px] w-[150px] py-[3px] flex flex-col gap-[1px]">
              <DropdownMenuItem
                onClick={handleDelete}
                className="px-2 flex items-bottom  justify-between cursor-pointer py-1 rounded-md focus-visible:outline-none border-none hover:bg-gray-400"
              >
                Delete
                <MdDeleteForever color={"red"} />
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-black text-black" />
              <DropdownMenuItem
                onClick={() => {
                  setShowUpdate(!showUpdate);
                }}
                className="px-2 flex items-bottom  justify-between cursor-pointer py-1 rounded-md focus-visible:outline-none border-none hover:bg-gray-400"
              >
                Update
                <GrUpdate color={"red"} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
};

export default PostHeader;
