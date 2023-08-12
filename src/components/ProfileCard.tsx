import { Input } from "@/components/shad/ui/input";
import { Label } from "@/components/shad/ui/label";
import useAddViews from "@/hooks/useAddViews";
import useUpdateUser from "@/hooks/useUpdateUser";
import Store from "@/store/store";
import UpdateUserSchema, { schema } from "@/validationModels/updateUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { PiBagSimpleBold } from "react-icons/pi";
import useProfileCard, { User } from "../hooks/useProfileCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shad/ui/dialog";
import { staticUrlPath } from "@/services/apiClient";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shad/ui/avatar";

interface Props {
  id: string;
}

const ProfileCard = ({ id }: Props) => {
  const { res: result, error, setRes: setResult } = useProfileCard(id);
  const userId = localStorage.getItem("socialUserId") || "";

  const { addView } = useAddViews();

  useEffect(() => {
    const add = async () => {
      if (id !== userId) {
        const response = await addView(id);
        if (response) setResult(response);
      }
    };

    add();
  }, []);

  if ("string" === typeof error && error) return error;
  return (
    <div className=" bg-[#202020] flex flex-col gap-3  rounded-md p-4 sm:w-[550px] md:w-full ">
      <div className="one flex items-center justify-between">
        <div className="image flex items-center gap-2">
          <Avatar className="h-10 w-10">
            {result?.picturePath && (
              <AvatarImage
                src={`${staticUrlPath}/${result?.picturePath}`}
                alt="profileImg"
              />
            )}
            <AvatarFallback>P</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h2 className="text-md">
              {result?.firstName
                ? result?.firstName + " " + result?.lastName
                : "Name"}
            </h2>
            <p className="text-sm text-white/60">{result?.location}</p>
          </div>
        </div>
        {userId === id && <Dia result={result} setResult={setResult} />}
      </div>
      <div className="br h-[1px] w-full bg-white/50" />
      <div className="two flex flex-col gap-3">
        <div className="flex gap-3">
          <FiMapPin size={23} color={"#FFFFFF99"} />
          <p className="text-white/60">{result?.location || "Location"}</p>
        </div>
        <div className="flex gap-3">
          <PiBagSimpleBold size={23} color={"#FFFFFF99"} />
          <p className="text-white/60">{result?.occupation || "Occupation"}</p>
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
      {/* <div className="br h-[1px] w-full bg-white/50" />
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
        </div> */}
    </div>
  );
};

function Dia({
  result,
  setResult,
}: {
  result: User | undefined;
  setResult: React.Dispatch<React.SetStateAction<User | undefined>>;
}) {
  const { fetch, loading } = useUpdateUser();
  const [isOpen, setIsOpen] = useState(false);

  const setUserImgPath = Store((s) => s.setUserImgPath);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<UpdateUserSchema> = async (data) => {
    const { firstName, lastName, password, email, location, occupation } = data;
    const file = data.picturePath[0];

    const formData = new FormData();
    formData.append("picturePath", file);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("password", password);
    formData.append("email", email);
    if (location) formData.append("location", location);
    if (occupation) formData.append("occupation", occupation);

    const response = await fetch(formData);
    if (response) {
      setResult(response);
      setIsOpen(false);
      setUserImgPath(response.picturePath || "");
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <button>
          <BiEdit size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#202020] md:max-w-[550px] ">
        <DialogHeader>
          <DialogTitle className="font-bold">Edit profile</DialogTitle>
          <DialogDescription className="text-white/80 font-semibold">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4 mx-4">
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="firstname" className="text-right">
                First Name
              </Label>
              <div className="col-span-4">
                <Input
                  id="firstname"
                  defaultValue={result?.firstName || ""}
                  {...register("firstName")}
                  className="col-span-4 h-9 "
                />
                {errors.firstName && (
                  <p className="text-red-500/95 m-0 text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <div className="col-span-4">
                <Input
                  id="lastName"
                  defaultValue={result?.lastName || ""}
                  className="col-span-4 h-9 "
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500/95 m-0 text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-4">
                <Input
                  id="email"
                  defaultValue={result?.email || ""}
                  type="email"
                  autoComplete="username"
                  className="col-span-4 h-9 "
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500/95 m-0 text-xs">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <div className="col-span-4">
                <Input
                  id="password"
                  defaultValue={result?.password || ""}
                  type="password"
                  autoComplete="new-password"
                  className="col-span-4 h-9 "
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500/95 m-0 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="confirmpassword" className="text-right">
                Confirm Password
              </Label>
              <div className="col-span-4">
                <Input
                  id="confirmpassword"
                  defaultValue={result?.password || ""}
                  type="password"
                  autoComplete="new-password"
                  className="col-span-4 h-9 "
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500/95 m-0 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <div className="col-span-4">
                <Input
                  id="location"
                  defaultValue={result?.location || ""}
                  className="col-span-4 h-9 "
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-red-500/95 m-0 text-xs">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="occupation" className="text-right">
                Ocupation
              </Label>
              <div className="col-span-4">
                <Input
                  id="occupation"
                  defaultValue={result?.occupation || ""}
                  className="col-span-4 h-9 "
                  {...register("occupation")}
                />
                {errors.occupation && (
                  <p className="text-red-500/95 m-0 text-xs">
                    {errors.occupation.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="picturePath" className="text-right">
                Picture
              </Label>
              <div className="col-span-4">
                <Input
                  type="file"
                  {...register("picturePath")}
                  className="/50 cursor-pointer"
                />
                {errors.picturePath && (
                  <span className="text-red-500/95 m-0 text-xs">
                    {errors.picturePath.message?.toString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <button
              type="submit"
              className={`  text-white font-bold w-fit rounded-md px-2 py-[4px] ${
                loading ? "bg-zinc-600" : "bg-black"
              }`}
              disabled={loading}
            >
              Save changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileCard;
