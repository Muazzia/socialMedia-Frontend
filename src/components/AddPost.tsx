import { SubmitHandler, useForm } from "react-hook-form";
import Store from "../store/store";
import HomeSchemaForm, { schema } from "../validationModels/home";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddPost from "../hooks/useAddPost";
import { Input } from "@/components/shad/ui/input";
import { AiOutlinePicture } from "react-icons/ai";
import { PostProp } from "../hooks/usePosts";
import { useState } from "react";
import { staticUrlPath } from "@/services/apiClient";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shad/ui/avatar";

interface Props {
  setResult: React.Dispatch<React.SetStateAction<PostProp[] | undefined>>;
}

const AddPost = ({ setResult }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HomeSchemaForm>({
    resolver: zodResolver(schema),
  });

  const userImgPath = Store((s) => s.userImgPath);
  const [addPostErr, setAddPostErr] = useState(false);

  const { addPost, loading } = useAddPost();
  console.log(loading);

  const onSubmit: SubmitHandler<HomeSchemaForm> = async (data) => {
    const file = data.picturePath[0];
    const userId = localStorage.getItem("socialUserId");

    const formData = new FormData();
    formData.append("picturePath", file);
    formData.append("description", data.description);
    formData.append("userId", userId || "");

    const res = await addPost(formData);
    if (res) {
      setResult(res.reverse());
      setAddPostErr(false);
      reset();
    }

    if (!res) setAddPostErr(true);
  };

  return (
    <div className="input flex flex-col p-4  bg-[#202020] rounded-md  sm:w-[550px] md:w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="top flex justify-between gap-5 mb-6">
          <Avatar className="w-10 h-10">
            {userImgPath && (
              <AvatarImage
                src={`${staticUrlPath}/${userImgPath}`}
                alt="profileImg"
              />
            )}
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          {/* {userImgPath ? (
            <img
              src={`${staticUrlPath}/${userImgPath}`}
              alt="profileImage"
              className="w-9 bg-cover rounded-full h-9"
            />
          ) : (
            <img
              src=""
              alt="profileImage"
              className="w-9 bg-cover rounded-full h-9"
            />
          )} */}
          <div className="flex flex-col w-full">
            <Input
              className={`rounded-full`}
              {...register("description")}
              disabled={loading}
            />
            {errors.description && (
              <p className="text-sm ml-3 text-red-800 mt-2">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <div className="mid h-[1px] w-full bg-slate-400 mb-2" />
        <div className="bottom flex items-end justify-between">
          <div className="relative mt-4">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              {...register("picturePath")}
            />
            <label
              htmlFor="fileInput"
              className="text-white/75 flex items-end gap-2 cursor-pointer"
            >
              <AiOutlinePicture size={24} /> <p>Image</p>
            </label>
            {errors.picturePath && (
              <p className="text-xs">
                {errors.picturePath.message?.toString()}
              </p>
            )}
          </div>
          <button
            className={`text-white bg-blue-500 px-2 py-[2px] rounded-full ${
              loading ? "bg-blue-500/50" : "bg-blue-500"
            }`}
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </form>
      {addPostErr && (
        <p className="text-sm mb-2 text-red-600 mt-4">Could not post it</p>
      )}
    </div>
  );
};

export default AddPost;
