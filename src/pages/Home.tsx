import {
  AiFillLinkedin,
  AiOutlinePicture,
  AiOutlineUserDelete,
} from "react-icons/ai";
import { FiMapPin, FiTwitter } from "react-icons/fi";
import { PiBagSimpleBold } from "react-icons/pi";
import { Input } from "../../@/components/shad/ui/input";
import Post from "../components/Post";
import usePosts, { PostProp } from "../hooks/usePosts";
import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import Store from "../store/store";
import useGetFriends from "../hooks/useGetFriends";

const Home = () => {
  const setUserFrindsArr = Store((e) => e.setUserFrindsArr);
  const [friendsErr, setFriendsError] = useState(false);

  const [result, setResult] = useState([] as PostProp[]);
  const [error, setError] = useState<string | unknown>("");
  const [success, setSuccess] = useState<Boolean>();

  useEffect(() => {
    const fetchPosts = async () => {
      const { success, res, error } = await usePosts();

      if (res) setResult(res.data);
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

  if ("string" === typeof error && error) return error;
  return (
    <section id="home">
      <div className="grid grid-cols-1 md:gap-5 md:grid-cols-3 lg:grid-cols-4 md:mt-10">
        <aside className="hidden md:block md:col-span-1">
          <ProfileCard />
        </aside>
        <main className="mt-5 mx-0 sm:mx-auto md:mx-0 md:mt-0 md:col-span-2 ">
          <div className="input flex flex-col p-4  bg-[#202020] rounded-md  sm:w-[550px] md:w-full">
            <div className="top flex justify-between gap-5 mb-6">
              <img
                src={`http://localhost:3000/download.png`}
                alt="profileImage"
                className="w-9 bg-cover rounded-full"
              />
              <Input className="rounded-full" />
              {/* <input type="text" className="w-full rounded-xl" /> */}
            </div>
            <div className="mid h-[1px] w-full bg-slate-400 mb-2" />
            <div className="bottom flex items-end justify-between">
              <div className="relative mt-4">
                <input type="file" id="fileInput" className="hidden" />
                <label
                  htmlFor="fileInput"
                  className="text-white/75 flex items-end gap-2 cursor-pointer"
                >
                  <AiOutlinePicture size={24} /> <p>Image</p>
                </label>
              </div>
              <button className="text-white bg-blue-500 px-2 py-[2px] rounded-full ">
                Submit
              </button>
            </div>
          </div>
          <div className="h-[90vh] mt-4">
            {!friendsErr ? (
              <div className="flex flex-col gap-4 ">
                {result?.map((p, i) => (
                  <Post
                    key={i}
                    data={p}
                    isFriend={
                      userFriends.find((e) => e._id === p.userId) ? true : false
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
