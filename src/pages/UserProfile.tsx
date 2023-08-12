import { useParams } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import Post from "../components/Post";
import useUserProfile from "../hooks/useUserProfile";
import Store from "../store/store";
import useAddViews from "@/hooks/useAddViews";
import { useEffect } from "react";

const UserProfile = () => {
  const param = useParams();
  const { res: result, setRes: setResult } = useUserProfile(param.id || "");
  const userId = localStorage.getItem("socialUserId");

  const userFriends = Store((s) => s.userFriends);

  return (
    <section
      id="UserProfile"
      className="grid grid-cols-1 md:grid-cols-3 sm:mx-auto lg:mx-[100px] gap-5 mt-10"
    >
      <div className="col-span-1 sm:max-md:mx-auto">
        <ProfileCard id={param.id || ""} />
      </div>
      <div className="md:col-span-2 flex flex-col gap-4 sm:max-md:mx-auto">
        {result?.map((p, i) => (
          <Post
            key={i}
            data={p}
            isFriend={
              userFriends?.find((e) => e._id === p.userId) ? true : false
            }
            isUserPost={userId === p.userId}
            userId={userId || ""}
            setUpdated={setResult}
            arrPost={result}
          />
        ))}
      </div>
    </section>
  );
};

export default UserProfile;
