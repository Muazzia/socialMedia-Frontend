import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { User } from "../hooks/useProfileCard";
import useAddFriend from "../hooks/useAddFriend";
import Store from "../store/store";

interface Props {
  data: User;
  isFriend: boolean;
  isUser: boolean;
}

const UserCard = ({ data, isFriend, isUser }: Props) => {
  console.log(isUser);

  const setUserFrindsArr = Store((s) => s.setUserFrindsArr);
  return (
    <div className="flex flex-col justify-center gap-5 border border-white/40 px-3 py-3 rounded-md">
      <div className="top flex gap-5 items-center">
        <div className="img">
          {data.picturePath ? (
            <img
              src={`http://localhost:3000/${data.picturePath}`}
              alt="profileImage"
              className="w-9 bg-cover rounded-full h-9"
            />
          ) : (
            <img
              src={""}
              alt="profileImage"
              className="w-9 bg-cover rounded-full h-9"
            />
          )}
        </div>
        <div className="info flex justify-between w-full">
          <div>{data.firstName}</div>
          <div>
            {!isUser && (
              <div className="addFriend ">
                {isFriend ? (
                  <AiOutlineUserDelete
                    size={23}
                    className={"cursor-pointer bg-red-400 rounded-xl"}
                    onClick={async () => {
                      const { res } = await useAddFriend(data._id);
                      setUserFrindsArr(res?.data);
                    }}
                  />
                ) : (
                  <AiOutlineUserAdd
                    size={23}
                    className={
                      "cursor-pointer bg-blue-400 rounded-xl text-white"
                    }
                    onClick={async () => {
                      const { res } = await useAddFriend(data._id);
                      setUserFrindsArr(res?.data);
                    }}
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
