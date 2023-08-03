import { AiOutlineUserDelete } from "react-icons/ai";
import { UserF } from "../store/store";

interface Props {
  data: UserF;
}

const FriendListComp = ({ data }: Props) => {
  return (
    <div className="one flex items-center justify-between">
      <div className="image flex items-center gap-2">
        <div className=" rounded-full w-9 bg-cover h-9 overflow-hidden ">
          <img
            src={`http://localhost:3000/${data.picturePath}`}
            alt="profilePic"
            className="h-full w-full"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-md">{data.firstName + "" + data.lastName}</h2>
          <p className="text-sm text-white/60">{data.location}</p>
        </div>
      </div>
      <div className="addFriend ">
        <AiOutlineUserDelete size={23} />
      </div>
    </div>
  );
};

export default FriendListComp;
