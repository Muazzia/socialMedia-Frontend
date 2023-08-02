import { useEffect, useState } from "react";
import { AiFillLinkedin, AiOutlineUserDelete } from "react-icons/ai";
import { FiMapPin, FiTwitter } from "react-icons/fi";
import { PiBagSimpleBold } from "react-icons/pi";
import useProfileCard, { User } from "../hooks/useProfileCard";

const ProfileCard = () => {
  const [result, setResult] = useState({} as User);
  const [error, setError] = useState<string | unknown>("");
  const [success, setSuccess] = useState<Boolean>();
  useEffect(() => {
    const f = async () => {
      const { error: err, res, success } = await useProfileCard();

      if (res) setResult(res.data);
      if (err) setError(err.response?.data);
      setSuccess(success);
    };

    f();
  }, []);

  if ("string" === typeof error && error) return error;
  return (
    <div className=" bg-[#202020] flex flex-col gap-3  rounded-md p-4 sm:w-[550px] md:w-full">
      <div className="one flex items-center justify-between">
        <div className="image flex items-center gap-2">
          <div className=" rounded-full w-9 bg-cover h-9 overflow-hidden ">
            <img
              src={`http://localhost:3000/${result.picturePath}`}
              alt="profilePic"
              className="h-full w-full"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-md">
              {result.firstName + "" + result.lastName}
            </h2>
            <p className="text-sm text-white/60">{result.location}</p>
          </div>
        </div>
        <div className="addFriend ">
          <AiOutlineUserDelete size={23} />
          {/* <AiOutlineUserAdd /> */}
        </div>
      </div>
      <div className="br h-[1px] w-full bg-white/50" />
      <div className="two flex flex-col gap-3">
        <div className="flex gap-3">
          <FiMapPin size={23} color={"#FFFFFF99"} />
          <p className="text-white/60">{result.location || "Unavailable"}</p>
        </div>
        <div className="flex gap-3">
          <PiBagSimpleBold size={23} color={"#FFFFFF99"} />
          <p className="text-white/60">{result.occupation || "Unavailable"}</p>
        </div>
      </div>
      <div className="br h-[1px] w-full bg-white/50" />
      <div className="three flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="text-white/60">No. of views</p>
          <p className="text-white/60">{result.viewedProfile}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-white/60">No. of Impressions</p>
          <p className="text-white/60">{result.impressions}</p>
        </div>
      </div>
      <div className="br h-[1px] w-full bg-white/50" />
      <div className="fourth flex flex-col gap-3">
        <div className="flex gap-3">
          <p className="text-white">Social Platforms</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <AiFillLinkedin size={23} color={"#FFFFFF99"} />
            <p className="text-white/60"> LinkedIn</p>
          </div>
          <div className="flex items-center gap-3">
            <FiTwitter size={23} color={"#FFFFFF99"} />
            <p className="text-white/60"> LinkedIn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
