import { AiOutlineUserDelete } from "react-icons/ai";
import Store, { UserF } from "../store/store";
import useAddFriend from "../hooks/useAddFriend";

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
          {data.picturePath ? (
            <img
              src={`http://localhost:3000/${data.picturePath}`}
              alt="profilePic"
              className="h-full w-full"
            />
          ) : (
            <img src="" alt="profilePic" className="h-full w-full" />
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="text-md">{data.firstName + "" + data.lastName}</h2>
          <p className="text-sm text-white/60">{data.location}</p>
        </div>
      </div>
      <div className="addFriend ">
        <AiOutlineUserDelete
          size={23}
          className={"cursor-pointer bg-red-400 rounded-xl"}
          onClick={() => handleClick(data._id)}
        />
      </div>
    </div>
  );
};

export default FriendListComp;
