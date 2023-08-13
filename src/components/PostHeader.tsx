import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shad/ui/dropdown-menu";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { BiMessageAltDetail } from "react-icons/bi";
import { RxUpdate } from "react-icons/rx";
import { IconContext } from "react-icons";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import useAddFriend from "../hooks/useAddFriend";
import { PostProp } from "../hooks/usePosts";
import useRemovePost from "../hooks/useRemovePost";
import Store from "../store/store";
import { staticUrlPath } from "@/services/apiClient";
import { Avatar, AvatarFallback } from "@/components/shad/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  data: PostProp;
  isFriend: Boolean;
  isUserPost: Boolean;
  showUpdate: Boolean;
  setShowUpdate: React.Dispatch<React.SetStateAction<Boolean>>;
}

const PostHeader = ({
  data,
  isFriend,
  isUserPost,
  showUpdate,
  setShowUpdate,
}: Props) => {
  const queryClient = useQueryClient();
  const userImgPath = Store((s) => s.userImgPath);

  const handleDelete = async () => {
    try {
      const res = await deletePost(data._id);
      if (res)
        queryClient.invalidateQueries({ queryKey: ["posts", userImgPath] });
      // setUpdated(arrPost.filter((a) => a._id !== res?._id));
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
          <Avatar className="h-full w-full">
            {data.userPicturePath && (
              <AvatarImage
                src={`${staticUrlPath}/${data.userPicturePath}`}
                alt="profileImg"
              />
            )}
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
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
            <div>
              <AiOutlineUserDelete
                size={23}
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent<SVGSVGElement>) => {
                  if (e.key === "Enter") {
                    handleAddFriend(data.userId);
                  }
                }}
                className={"cursor-pointer  rounded-xl"}
                onClick={() => handleAddFriend(data.userId)}
              />
            </div>
          ) : (
            <div>
              <AiOutlineUserAdd
                size={23}
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent<SVGSVGElement>) => {
                  if (e.key === "Enter") {
                    handleAddFriend(data.userId);
                  }
                }}
                className={"cursor-pointer  rounded-xl text-white"}
                onClick={() => handleAddFriend(data.userId)}
              />
            </div>
          )}
        </div>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex">
              <div className="font-xl cursor-pointer flex gap-[3px] h-3 w-fit ">
                <div className="h-1 w-1 bg-white rounded-full" />
                <div className="h-1 w-1 bg-white rounded-full" />
                <div className="h-1 w-1 bg-white rounded-full" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-black px-[3px] w-[150px] py-[3px] flex flex-col gap-[1px]">
              <DropdownMenuItem
                onClick={handleDelete}
                className="flex justify-between rounded-md cursor-pointer"
              >
                <p className="font-semibold uppercase">Delete</p>
                <IconContext.Provider
                  value={{ size: "1.2rem", className: "text-white " }}
                >
                  <div>
                    <MdDeleteForever />
                  </div>
                </IconContext.Provider>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setShowUpdate(!showUpdate);
                }}
                className="flex justify-between rounded-md cursor-pointer"
              >
                <p className="font-semibold uppercase">Update</p>
                <IconContext.Provider
                  value={{ size: "1.1rem", className: "text-white " }}
                >
                  <div>
                    <RxUpdate />
                  </div>
                </IconContext.Provider>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
};

export default PostHeader;
