import Skele from "@/components/Skele";
import AddPost from "../components/AddPost";
import FriendListComp from "../components/FriendListComp";
import Post from "../components/Post";
import ProfileCard from "../components/ProfileCard";
import useGetFriends from "../hooks/useGetFriends";
import usePosts from "../hooks/usePosts";
import Store from "../store/store";

const Home = () => {
  const userFriends = Store((e) => e.userFriends);

  const userId = localStorage.getItem("socialUserId");

  const { error, res: result, setRes: setResult } = usePosts();

  const { success: friendsErr } = useGetFriends();

  if ("string" === typeof error && error) return error;
  return (
    <section id="home">
      <div className="grid grid-cols-1 md:gap-5 md:grid-cols-3 lg:grid-cols-4 md:mt-10">
        <aside className="hidden md:block md:col-span-1 ">
          <ProfileCard id={userId || ""} />
        </aside>
        <main className="mt-5 mx-0 sm:mx-auto md:mx-0 md:mt-0 md:col-span-2 ">
          <AddPost setResult={setResult} />
          <div className="mt-4">
            {!friendsErr === false ? (
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
                    isUserPost={userId === p.userId}
                    userId={userId || ""}
                    setUpdated={setResult}
                    arrPost={result}
                  />
                ))}
              </div>
            ) : friendsErr === false ? (
              <p>Error while fetching Friends</p>
            ) : (
              <div className="flex flex-col gap-4">
                {Array(5)
                  .fill("1")
                  .map((_, i) => (
                    <Skele key={i} />
                  ))}
              </div>
            )}
          </div>
        </main>
        <aside className="hidden lg:block md:col-span-1">
          <div className=" bg-[#202020] flex flex-col gap-3  rounded-md p-4    md:w-full">
            Friend List
            {userFriends?.map((u) => (
              <FriendListComp key={u._id} data={u} />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Home;
