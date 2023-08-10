import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import UpdateSchemaForm, { schema } from "../validationModels/updatePost";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdatePost from "../hooks/useUpdatePost";
import { Input } from "@/components/shad/ui/input";
import { PostProp } from "../hooks/usePosts";

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
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit" className="bg-blue-500 px-1 py-1 rounded-md">
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
