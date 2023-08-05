import { useParams } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import Post from "../components/Post";

const UserProfile = () => {
  const param = useParams();
  return (
    <section
      id="UserProfile"
      className="grid grid-cols-1 md:grid-cols-3 mx-auto"
    >
      <ProfileCard />
      {/* <Post /> */}
    </section>
  );
};

export default UserProfile;
