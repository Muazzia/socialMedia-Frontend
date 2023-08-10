import { AiFillLinkedin } from "react-icons/ai";
import { FiMapPin, FiTwitter } from "react-icons/fi";
import { PiBagSimpleBold } from "react-icons/pi";
import useProfileCard from "../hooks/useProfileCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shad/ui/dialog";
import { Label } from "../../@/components/shad/ui/label";
import { Input } from "../../@/components/shad/ui/input";
import { BiEdit } from "react-icons/bi";

interface Props {
  id: string;
}

const ProfileCard = ({ id }: Props) => {
  const { res: result, error } = useProfileCard(id);
  const userId = localStorage.getItem("socialUserId") || "";

  if ("string" === typeof error && error) return error;
  return (
    <div className=" bg-[#202020] flex flex-col gap-3  rounded-md p-4 sm:w-[550px] md:w-full ">
      <div className="one flex items-center justify-between">
        <div className="image flex items-center gap-2">
          <div className=" rounded-full w-9 bg-cover h-9 overflow-hidden ">
            {result?.picturePath ? (
              <img
                src={`http://localhost:3000/${result?.picturePath}`}
                alt="profilePic"
                className="h-full w-full"
              />
            ) : (
              <img src="" alt="profilePic" className="h-full w-full" />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="text-md">
              {result?.firstName + "" + result?.lastName}
            </h2>
            <p className="text-sm text-white/60">{result?.location}</p>
          </div>
        </div>
        {userId === id && (
          <Dialog>
            <DialogTrigger asChild>
              <button>
                <BiEdit size={20} />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#202020] transition-all duration-1000 md:max-w-[550px] p-3 rounded-lg   ">
              <DialogHeader className="h-fit">
                <DialogTitle className="font-bold">Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4 mx-4">
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="firstname" className="text-right">
                    First Name
                  </Label>
                  <Input
                    id="firstname"
                    className="col-span-4 h-9 text-black "
                  />
                </div>
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="lastName" className="text-right">
                    Last Name
                  </Label>
                  <Input id="lastName" className="col-span-4 h-9 text-black" />
                </div>
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="col-span-4 h-9 text-black"
                  />
                </div>
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="col-span-4 h-9 text-black"
                  />
                </div>
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" className="col-span-4 h-9 text-black" />
                </div>
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="occupation" className="text-right">
                    Ocupation
                  </Label>
                  <Input
                    id="occupation"
                    className="col-span-4 h-9 text-black"
                  />
                </div>
              </div>

              <DialogFooter className="h-fit flex justify-end flex-row mr-4">
                <button
                  type="submit"
                  className="bg-black  text-white font-bold w-fit rounded-md px-2 py-[4px]"
                >
                  Save changes
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="br h-[1px] w-full bg-white/50" />
      <div className="two flex flex-col gap-3">
        <div className="flex gap-3">
          <FiMapPin size={23} color={"#FFFFFF99"} />
          <p className="text-white/60">{result?.location || "Unavailable"}</p>
        </div>
        <div className="flex gap-3">
          <PiBagSimpleBold size={23} color={"#FFFFFF99"} />
          <p className="text-white/60">{result?.occupation || "Unavailable"}</p>
        </div>
      </div>
      <div className="br h-[1px] w-full bg-white/50" />
      <div className="three flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="text-white/60">No. of views</p>
          <p className="text-white/60">{result?.viewedProfile}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-white/60">No. of Impressions</p>
          <p className="text-white/60">{result?.impressions}</p>
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
