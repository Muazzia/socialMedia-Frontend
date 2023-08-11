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
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
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
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUserImgPath("/");
    navigate("/");
  };

  const { register, handleSubmit, reset } = useForm<SearchSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<SearchSchema> = async ({ search }) => {
    reset();
    navigate(`../search/${search}`);
  };

  const userImgPath = Store((s) => s.userImgPath);
  const setUserImgPath = Store((s) => s.setUserImgPath);
  return (
    <nav className="bg-black border-b border-b-black relative">
      <div className="mx-4 lg:max-w-[1015px] lg:mx-auto flex p-3 justify-between items-center">
        <div className="left text-xl text-white flex justify-between items-center gap-2">
          <Link to={"/home"} className="logo cursor-pointer">
            Social Media
          </Link>
          <div className="search hidden md:block">
            <form onSubmit={handleSubmit(onSubmit)} className="flex">
              <Input
                placeholder="Search"
                {...register("search")}
                className="w-[180px] h-10"
              />
            </form>
          </div>
        </div>
        <div className="right">
          <div className="burger block md:hidden">
            <GiHamburgerMenu
              size={23}
              color={"white"}
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
          <div className="hidden md:flex items-center ">
            <ul className="flex gap-5 text-white items-center">
              <li>Change </li>
              <li>Notification </li>
              <li>Bell</li>
              <li>Help </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      {userImgPath && (
                        <AvatarImage
                          src={`http://localhost:3000/${userImgPath}`}
                          alt="profileImg"
                        />
                      )}
                      <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li className="text-white cursor-pointer"></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`mobile:menus z-20 block md:hidden transition-all ease-in-out 
      duration-1000 absolute w-full bg-[#2c2d2f] min-h-[220px] top-0 text-white ${
        showMenu
          ? "translate-y-0 opacity-100"
          : "translate-y-[-400px] opacity-0"
      } `}
      >
        <ul className=" relative mx-4 py-6 px-3 text-lg space-y-4 ">
          <li className="absolute right-0">
            <AiOutlineClose
              size={20}
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            />
          </li>
          <li>Change </li>
          <li>Notification </li>
          <li>Bell</li>
          <li>Help </li>
          <li
            className="text-white cursor-pointer"
            onClick={() => {
              handleLogout();
              setShowMenu(!showMenu);
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
