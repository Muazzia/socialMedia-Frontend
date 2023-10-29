import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shad/ui/avatar";
import { Input } from "@/components/shad/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlinePicture } from "react-icons/ai";
import useAddPost from "../hooks/useAddPost";
import { PostProp } from "../hooks/usePosts";
import Store from "../store/store";
import HomeSchemaForm, { schema } from "../validationModels/home";

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

  const [showImgPreview, setShowImgPreview] = useState("");

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
      setShowImgPreview("");
    }
    if (!res) setAddPostErr(true);
  };

  return (
    <div className="input flex flex-col p-4  bg-[#202020] rounded-md  sm:w-[550px] md:w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="top flex justify-between gap-5 mb-6">
          <Avatar className="w-10 h-10">
            {userImgPath && <AvatarImage src={userImgPath} alt="profileImg" />}
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
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
        <div>
          <div className="w-full">
            {showImgPreview && (
              <img
                src={showImgPreview}
                alt="image preview"
                className="aspect-square object-cover w-full"
              />
            )}
          </div>
          <div className="bottom flex items-end justify-between">
            <div className="relative mt-4 ">
              <input
                type="file"
                id="fileInput"
                accept=" .jpg, .jpeg, .png, .webp"
                className="hidden"
                {...register("picturePath", {
                  onChange: (e) => {
                    if (e.target.files.length === 0) {
                      setShowImgPreview("");
                    }
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      setShowImgPreview(URL.createObjectURL(selectedFile));
                    }
                  },
                })}
              />
              <label
                htmlFor="fileInput"
                className="text-white/75 flex items-end gap-2 cursor-pointer"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    document.getElementById("fileInput")?.click();
                  }
                }}
              >
                <AiOutlinePicture size={24} /> <p>Image</p>
              </label>
              {errors.picturePath && (
                <p className="text-xs text-red-600">
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
        </div>
      </form>
      {addPostErr && (
        <p className="text-sm mb-2 text-red-600 mt-4">Could not post it</p>
      )}
    </div>
  );
};

export default AddPost;
