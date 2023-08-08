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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/shad/ui/dropdown-menu";
import useAddFriend from "../hooks/useAddFriend";
import useAddLike from "../hooks/useAddLike";
import { PostProp } from "../hooks/usePosts";
import Store from "../store/store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Input } from "../../@/components/shad/ui/input";
import useRemovePost from "../hooks/useRemovePost";
import { schema } from "../validationModels/updatePost";
import UpdateSchemaForm from "../validationModels/updatePost";
import useUpdatePost from "../hooks/useUpdatePost";

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

  const [showUpdate, setShowUpdate] = useState<Boolean>(false);
  const [selectedFile, setSelectedFile] = useState<Boolean>(false);
  const [containsImage, setContainsImage] = useState<Boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateSchemaForm>({
    resolver: zodResolver(schema),
  });

  const { fetchUpdate } = useUpdatePost();

  const onSubmit: SubmitHandler<UpdateSchemaForm> = async (d) => {
    let img;
    if (!containsImage) {
      try {
        const res = await fetch(`http://localhost:3000/${data.picturePath}`);
        if (res?.ok) {
          const blob = await res.blob();
          img = new File([blob], `${data.picturePath}`, {
            type: `image/${data.picturePath?.split(".").pop()}`,
          });
        } else {
          throw new Error("Image not Found");
        }
      } catch (err) {
        console.log(err);
      }
    }
    const file = containsImage ? d.picturePath[0] : img;

    const formData = new FormData();
    formData.append("picturePath", file);
    formData.append("description", d.description);

    const response = await fetchUpdate(data._id, formData);
    if (response?.data) {
      setUpdated(
        arrPost.map((a) => (a._id === response.data?._id ? response.data : a))
      );
      reset();
      setShowUpdate(false);
      setSelectedFile(false);
      setContainsImage(false);
    }
  };

  return (
    <article
      id="post"
      className="p-4 flex flex-col gap-3 bg-[#202020] rounded-md  sm:w-[550px] md:w-full"
    >
      {!showUpdate ? (
        <>
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
                    className={
                      "cursor-pointer bg-blue-400 rounded-xl text-white"
                    }
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
            <p className="ml-1 text-white/40">
              {Object.keys(data.likes).length}
            </p>
          </div>
        </>
      ) : (
        <>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              defaultValue={data.description}
              className="text-black"
              {...register("description")}
            />
            {!selectedFile ? (
              <div className="three">
                <img
                  src={`http://localhost:3000/${data.picturePath}`}
                  className="w-full "
                  alt="post Img"
                />
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  className="cursor-pointer"
                  {...register("picturePath", { required: false })}
                  onChange={(event) => {
                    if (event.target.files?.[0]) setContainsImage(true);
                    else setContainsImage(false);
                  }}
                />
              </div>
            )}
            <div className="flex justify-start">
              {!selectedFile ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(true);
                  }}
                  className="bg-white px-1 py-1 rounded-md text-black hover:bg-black hover:text-white"
                >
                  update
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(false);
                    setContainsImage(false);
                  }}
                  className="bg-white px-1 py-1 rounded-md text-black hover:bg-black hover:text-white"
                >
                  Cancel
                </button>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowUpdate(false);
                  setSelectedFile(false);
                  setContainsImage(false);
                }}
                className="bg-white px-1 py-1 rounded-md text-black hover:bg-black hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 px-1 py-1 rounded-md"
              >
                Submit
              </button>
            </div>
            <div>
              {errors.picturePath && (
                <p>{errors.picturePath.message?.toString()}</p>
              )}
            </div>
          </form>
        </>
      )}
    </article>
  );
};

export default Post;
