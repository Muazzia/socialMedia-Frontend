import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import UpdateSchemaForm, { schema } from "../validationModels/updatePost";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdatePost from "../hooks/useUpdatePost";
import { Input } from "@/components/shad/ui/input";
import { PostProp } from "../hooks/usePosts";
import { staticUrlPath } from "@/services/apiClient";

interface Props {
  data: PostProp;
  setShowUpdate: React.Dispatch<React.SetStateAction<Boolean>>;
  setUpdated: React.Dispatch<React.SetStateAction<PostProp[] | undefined>>;
  arrPost: PostProp[];
}

const PostUpdateForm = ({
  data,
  arrPost,
  setShowUpdate,
  setUpdated,
}: Props) => {
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
        const res = await fetch(`${staticUrlPath}/${data.picturePath}`);
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
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Input defaultValue={data.description} {...register("description")} />
      {!selectedFile ? (
        <div className="three">
          <img
            src={
              data.imgSecureUrl
                ? data.imgSecureUrl
                : `${staticUrlPath}/${data.picturePath}`
            }
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
            className="bg-white border border-white hover:bg-black/60 hover:text-white text-black font-medium px-2 py-1 rounded-md"
          >
            Update
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSelectedFile(false);
              setContainsImage(false);
            }}
            className="bg-white border border-white hover:bg-black/60 hover:text-white text-black font-medium px-2 py-1 rounded-md"
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
          className="bg-white border border-white hover:bg-black/60 hover:text-white text-black font-medium px-2 py-1 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-black border border-white text-white px-2 py-1 rounded-md hover:bg-[#fafafa] hover:text-black font-medium"
        >
          Submit
        </button>
      </div>
      <div>
        {errors.picturePath && <p>{errors.picturePath.message?.toString()}</p>}
      </div>
    </form>
  );
};

export default PostUpdateForm;
