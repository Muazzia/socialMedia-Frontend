import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { Input } from "../../@/components/shad/ui/input";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className="bg-black border-b border-b-black relative">
      <div className="mx-4 lg:max-w-[1015px] lg:mx-auto flex p-3 justify-between items-center">
        <div className="left text-xl text-white flex justify-between items-center gap-2">
          <div className="logo">Social Media</div>
          <div className="search hidden md:block">
            <form onSubmit={() => {}} className="flex">
              <Input
                placeholder="Search"
                className="w-[180px] pl-2 py-1 rounded-md  bg-gray-300 text-gray-700 border-none focus-visible:outline-white"
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
              <li
                className="text-white cursor-pointer"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`menus z-10 block md:hidden   absolute w-full bg-[#2c2d2f] min-h-[220px] top-0 text-white ${
          showMenu ? "translate-y-0" : "translate-y-[-400px]"
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
