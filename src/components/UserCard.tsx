import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { User } from "../hooks/useProfileCard";
import useAddFriend from "../hooks/useAddFriend";
import Store from "../store/store";
import { Link } from "react-router-dom";

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
          {data.picturePath ? (
            <img
              src={`http://localhost:3000/${data.picturePath}`}
              alt="profileImage"
              className="w-9 bg-cover rounded-full h-9 overflow-hidden align-middle"
            />
          ) : (
            <img
              src={""}
              alt="profileImage"
              className="w-9 bg-cover rounded-full h-9 overflow-hidden"
            />
          )}
        </div>
        <div className="info flex justify-between w-full">
          <Link to={`../profile/${data._id}`} className="hover:underline">
            {data.firstName + " " + data.lastName}
          </Link>
          <div>
            {!isUser && (
              <div className="addFriend ">
                {isFriend ? (
                  <AiOutlineUserDelete
                    size={23}
                    className={"cursor-pointer bg-red-400 rounded-xl"}
                    onClick={() => handleClick(data._id)}
                  />
                ) : (
                  <AiOutlineUserAdd
                    size={23}
                    className={
                      "cursor-pointer bg-blue-400 rounded-xl text-white"
                    }
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
