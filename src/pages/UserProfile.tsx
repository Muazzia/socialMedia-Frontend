import { useParams } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import Post from "../components/Post";
import useUserProfile from "../hooks/useUserProfile";
import Store from "../store/store";

const UserProfile = () => {
  const param = useParams();
  const { res: result, setRes: setResult } = useUserProfile(param.id || "");
  const userId = localStorage.getItem("socialUserId");
  console.log(result);

  const userFriends = Store((s) => s.userFriends);

  return (
    <section
      id="UserProfile"
      className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-5 mt-10"
    >
      <div className="col-span-1">
        <ProfileCard id={param.id || ""} />
      </div>
      <div className="col-span-2 flex flex-col gap-4">
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
