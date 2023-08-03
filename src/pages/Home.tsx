import { useEffect, useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { Input } from "../../@/components/shad/ui/input";
import Post from "../components/Post";
import ProfileCard from "../components/ProfileCard";
import useGetFriends from "../hooks/useGetFriends";
import usePosts, { PostProp } from "../hooks/usePosts";
import Store from "../store/store";
import { SubmitHandler, useForm } from "react-hook-form";
import HomeSchemaForm, { schema } from "../validationModels/home";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddPost from "../hooks/useAddPost";

const Home = () => {
  const setUserFrindsArr = Store((e) => e.setUserFrindsArr);
  const [friendsErr, setFriendsError] = useState(false);

  const [result, setResult] = useState([] as PostProp[]);
  const [error, setError] = useState<string | unknown>("");
  const [success, setSuccess] = useState<Boolean>();

  useEffect(() => {
    const fetchPosts = async () => {
      const { success, res, error } = await usePosts();

      if (res) setResult(res.data.reverse());
      if (error) setError(error.response?.data);
      setSuccess(success);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      const { success, res } = await useGetFriends();
      if (success) setUserFrindsArr(res?.data);
      if (!success) setFriendsError(true);
    };
    fetchFriends();
  }, []);

  const userFriends = Store((e) => e.userFriends);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HomeSchemaForm>({
    resolver: zodResolver(schema),
  });

  const [addPostErr, setAddPostErr] = useState(false);

  const onSubmit: SubmitHandler<HomeSchemaForm> = async (data) => {
    const file = data.picturePath[0];
    const userId = localStorage.getItem("socialUserId");

    const formData = new FormData();
    formData.append("picturePath", file);
    formData.append("description", data.description);
    formData.append("userId", userId || "");

    console.log(formData);
    console.log(data);

    const { res, error, success } = await useAddPost(formData);
    if (res?.data) {
      setResult(res.data.reverse());
      setAddPostErr(false);
      reset();
    }
    if (!success) setAddPostErr(true);
  };

  if ("string" === typeof error && error) return error;
  return (
    <section id="home">
      <div className="grid grid-cols-1 md:gap-5 md:grid-cols-3 lg:grid-cols-4 md:mt-10">
        <aside className="hidden md:block md:col-span-1">
          <ProfileCard />
        </aside>
        <main className="mt-5 mx-0 sm:mx-auto md:mx-0 md:mt-0 md:col-span-2 ">
          <div className="input flex flex-col p-4  bg-[#202020] rounded-md  sm:w-[550px] md:w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="top flex justify-between gap-5 mb-6">
                <img
                  src={`http://localhost:3000/download.png`}
                  alt="profileImage"
                  className="w-9 bg-cover rounded-full h-9"
                />
                <div className="flex flex-col w-full">
                  <Input
                    className="rounded-full text-black w-full"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-sm ml-3 text-red-800 mt-2">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                {/* <input type="text" className="w-full rounded-xl" /> */}
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
                <button className="text-white bg-blue-500 px-2 py-[2px] rounded-full ">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="mt-4">
            {addPostErr && (
              <p className="text-sm mb-2 text-red-600">Could not post it</p>
            )}
            {!friendsErr ? (
              <div className="flex flex-col gap-4 ">
                {result?.map((p, i) => (
                  <Post
                    key={i}
                    data={p}
                    isFriend={
                      userFriends?.find((e) => e._id === p.userId)
                        ? true
                        : false
                    }
                  />
                ))}
              </div>
            ) : (
              <p>Error while fetching Friends</p>
            )}
          </div>
        </main>
        <aside className="hidden lg:block md:col-span-1">3</aside>
      </div>
    </section>
  );
};

export default Home;
