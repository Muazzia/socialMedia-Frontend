import { AiOutlineUserDelete } from "react-icons/ai";
import Store, { UserF } from "../store/store";
import useAddFriend from "../hooks/useAddFriend";
import { Link } from "react-router-dom";
import { staticUrlPath } from "@/services/apiClient";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shad/ui/avatar";

interface Props {
  data: UserF;
}

const FriendListComp = ({ data }: Props) => {
  const setUserFrindsArr = Store((s) => s.setUserFrindsArr);
  const { toggleFriend } = useAddFriend();

  const handleClick = async (id: string) => {
    const response = await toggleFriend(id);
    if (response) setUserFrindsArr(response);
  };
  return (
    <div className="one flex items-center justify-between">
      <div className="image flex items-center gap-2">
        <div className=" rounded-full w-9 bg-cover h-9 overflow-hidden ">
          <Avatar className="h-full w-full">
            {data.picturePath && (
              <AvatarImage
                src={`${staticUrlPath}/${data.picturePath}`}
                alt="profileImg"
              />
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
        <AiOutlineUserDelete
          size={23}
          className={"cursor-pointer  rounded-xl"}
          onClick={() => handleClick(data._id)}
        />
      </div>
    </div>
  );
};

export default FriendListComp;
