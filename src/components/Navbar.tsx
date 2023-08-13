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
import { staticUrlPath } from "@/services/apiClient";
import Store from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
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

  return (
    <nav className="bg-black border-b border-b-black relative">
      <div className="mx-4 lg:max-w-[1015px] lg:mx-auto flex p-3 justify-between items-center">
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
          {/* <div className="burger block md:hidden">
            <GiHamburgerMenu
              size={23}
              color={"white"}
              onClick={() => setShowMenu(!showMenu)}
            />
          </div> */}
          {token && (
            <div className="flex items-center ">
              <ul className="flex gap-5 text-white items-center">
                <li>
                  <AvatarMenu />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Mobile menu */}
      {/* <div
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

          <li>
            <AvatarMenu isMobile={true} setShowMenu={setShowMenu} />
          </li>
        </ul>
      </div> */}
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
          {userImgPath && (
            <AvatarImage
              src={`${staticUrlPath}/${userImgPath}`}
              alt="profileImg"
            />
          )}
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
