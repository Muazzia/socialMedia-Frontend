import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import useUserSearch from "../hooks/useUserSearch";
import Store from "../store/store";

const Search = () => {
  const param = useParams();
  const searchStr = param.searchStr;
  const userFriends = Store((s) => s.userFriends);

  const userId = localStorage.getItem("socialUserId");

  const { res, err, loading } = useUserSearch(searchStr || "");
  if (loading) return <p>...Loading</p>;
  if (err) return <p>{err.message}</p>;

  if (res?.length === 0) return <p>Not Found</p>;
  return (
    <section
      id="UserList"
      className="w-full lg:w-1/2 mx-auto mt-5 flex flex-col gap-5 h-full"
    >
      {res?.map((u) => (
        <UserCard
          key={u._id}
          data={u}
          isUser={userId === u._id}
          isFriend={
            userFriends?.find((user) => user._id === u._id) ? true : false
          }
        />
      ))}
    </section>
  );
};

export default Search;
