import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { User } from "../hooks/useProfileCard";
import useAddFriend from "../hooks/useAddFriend";
import Store from "../store/store";
import { Link } from "react-router-dom";
import { BiMessageAltDetail } from "react-icons/bi";
import { staticUrlPath } from "@/services/apiClient";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shad/ui/avatar";

interface Props {
  data: User;
  isFriend: boolean;
  isUser: boolean;
}

const UserCard = ({ data, isFriend, isUser }: Props) => {
  const setUserFrindsArr = Store((s) => s.setUserFrindsArr);
  const { toggleFriend } = useAddFriend();

  const handleClick = async (id: string) => {
    const response = await toggleFriend(id);
    if (response) setUserFrindsArr(response);
  };
  return (
    <div className="flex flex-col justify-center gap-5 border border-white/40 px-3 py-3 rounded-md">
      <div className="top flex gap-5 items-center">
        <div className="img w-10">
          <Avatar className="h-full w-full">
            {data.picturePath && (
              <AvatarImage
                src={
                  data.imgSecureUrl
                    ? data.imgSecureUrl
                    : `${staticUrlPath}/${data.picturePath}`
                }
                className="h-full w-full"
                alt="profileImg"
              />
            )}
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
        </div>
        <div className="info flex justify-between w-full">
          <Link to={`../profile/${data._id}`} className="hover:underline">
            {data.firstName + " " + data.lastName}
          </Link>
          <div>
            {!isUser && (
              <div className="addFriend flex gap-2">
                <Link to={`/message/${data._id}`} preventScrollReset={true}>
                  <BiMessageAltDetail size={23} />
                </Link>
                {isFriend ? (
                  <AiOutlineUserDelete
                    size={23}
                    className={"cursor-pointer rounded-xl"}
                    onClick={() => handleClick(data._id)}
                  />
                ) : (
                  <AiOutlineUserAdd
                    size={23}
                    className={"cursor-pointer rounded-xl text-white"}
                    onClick={() => handleClick(data._id)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
