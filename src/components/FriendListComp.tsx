import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shad/ui/avatar";
import _ from "lodash";
import { AiOutlineUserDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAddFriend from "../hooks/useAddFriend";
import Store, { UserF } from "../store/store";

interface Props {
  data: UserF;
}

const FriendListComp = ({ data }: Props) => {
  const setUserFrindsArr = Store((s) => s.setUserFrindsArr);
  const userFriends = Store((s) => s.userFriends);
  const { toggleFriend, loading } = useAddFriend();

  const handleClick = async (id: string) => {
    const temp = _.cloneDeep(userFriends);
    setUserFrindsArr(userFriends.filter((u) => u._id !== id));

    const response = await toggleFriend(id);
    if (response) setUserFrindsArr(response);
    else {
      setUserFrindsArr(temp);
    }
  };
  return (
    <div className="one flex items-center justify-between">
      <div className="image flex items-center gap-2">
        <div className=" rounded-full w-9 bg-cover h-9 overflow-hidden ">
          <Avatar className="h-full w-full">
            {data.picturePath && (
              <AvatarImage src={data.imgSecureUrl} alt="profileImg" />
            )}
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <Link to={`/profile/${data._id}`} className="hover:underline">
            <h2 className="text-md">{data.firstName + " " + data.lastName}</h2>
          </Link>
          <p className="text-sm text-white/60">{data.location}</p>
        </div>
      </div>
      <div className="addFriend ">
        <button
          tabIndex={0}
          disabled={loading}
          onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key === "Enter") {
              handleClick(data._id);
            }
          }}
          className={"cursor-pointer  rounded-xl disabled:cursor-default"}
          onClick={() => handleClick(data._id)}
        >
          <AiOutlineUserDelete size={23} />
        </button>
      </div>
    </div>
  );
};

export default FriendListComp;
