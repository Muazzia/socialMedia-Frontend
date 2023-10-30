import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shad/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/shad/ui/dropdown-menu";
import { Input } from "@/components/shad/ui/input";
import Store from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

const schema = z.object({
  search: z
    .string()
    .min(1, "search str is required")
    .max(255, "Max limit is 255 ch"),
});

type SearchSchema = z.infer<typeof schema>;

const Navbar = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<SearchSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SearchSchema> = async ({ search }) => {
    reset();
    navigate(`../search/${search}`);
  };

  const token = localStorage.getItem("authToken");

  const [toggleMobileSearch, settoggleMobileSearch] = useState(false);

  return (
    <nav className="bg-black border-b border-b-black relative">
      <div className="mx-4 lg:max-w-[1015px] lg:mx-auto p-3">
        <div className="flex justify-between items-center">
          <div className="left text-xl text-white flex justify-between items-center gap-2">
            <Link to={"/home"} className="logo cursor-pointer font-bold text  ">
              Social Media
            </Link>
            {token && (
              <div className="search hidden md:block">
                <form onSubmit={handleSubmit(onSubmit)} className="flex">
                  <Input
                    placeholder="Search"
                    {...register("search")}
                    className="w-[180px] h-10 dark:autofill:bg-black"
                  />
                </form>
              </div>
            )}
          </div>
          <div className="right">
            {token && (
              <div className="flex items-center ">
                <ul className="flex gap-5 text-white items-center">
                  <li
                    className="block md:hidden"
                    onClick={() => settoggleMobileSearch(!toggleMobileSearch)}
                  >
                    Search
                  </li>
                  <li>
                    <AvatarMenu />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 w-full mobileSearch">
          {toggleMobileSearch && token && (
            <div className="search md:hidden block">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full items-center justify-center"
              >
                <Input
                  placeholder="Search"
                  {...register("search")}
                  className="w-full sm:w-[80%] h-10 dark:autofill:bg-black"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

function AvatarMenu() {
  const userImgPath = Store((s) => s.userImgPath);

  const setUserImgPath = Store((s) => s.setUserImgPath);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUserImgPath("/");
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {userImgPath && <AvatarImage src={userImgPath} alt="profileImg" />}
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Navbar;
