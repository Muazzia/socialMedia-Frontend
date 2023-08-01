import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/shad/ui/select";
import { Input } from "../../@/components/shad/ui/input";
import { useState } from "react";

const Navbar = () => {
  const arr = ["light", "dark", "brown"];
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="bg-gray-700 border-b border-b-black relative">
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
          <div className="items md:flex items-center hidden">
            <ul className="flex gap-5 text-white items-center">
              <li>Change </li>
              <li>Notification </li>
              <li>Bell</li>
              <li>Help </li>
              {/* <li>
                <Select>
                  <SelectTrigger className="min-w-[120px] border-none focus-visible:outline-white bg-gray-500 rounded-lg px-2 py-2">
                    <SelectValue placeholder="Options" />
                  </SelectTrigger>
                  <SelectContent className=" min-h- mt-2 px-1 rounded-lg  cursor-pointer text-white text-md bg-gray-500 ">
                    <SelectGroup>
                      {arr.map((a, i) => (
                        <SelectItem
                          key={i}
                          value={a}
                          className="mt-1  px-1 w-full  border-none focus-visible:outline-none hover:focus-visible:outline-white hover:border-none "
                        >
                          {a}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </li> */}
              <li>
                <Select>
                  <SelectTrigger className="w-[110px] h-[40px] border border-white focus-visible:outline-white focus-visible:outline-1">
                    <SelectValue placeholder="Options" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-500 w-[150px] mt-2 px-[8px] text-white  py-2">
                    {arr.map((a, i) => (
                      <SelectItem
                        key={i}
                        value={a}
                        className="px-2 py-1 hover:bg-gray-300 rounded-md border-none focus-visible:outline-none hover:border-none hover:focus-visible:outline-none"
                      >
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`menus block md:hidden   absolute w-full bg-[#2c2d2f] min-h-[220px] top-0 text-white ${
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
          <li>
            <Select>
              <SelectTrigger className="w-[120px] border-none focus-visible:outline-white bg-gray-500 rounded-lg px-2 py-2   ">
                <SelectValue placeholder="Options" />
              </SelectTrigger>
              <SelectContent className="w-[120px] h-[104px]  rounded-lg mt-2 cursor-pointer text-white text-md bg-gray-500 ">
                {arr.map((a, i) => (
                  <SelectItem
                    key={i}
                    value={a}
                    className="px-2 py-1  border-none focus-visible:outline-none hover:focus-visible:outline-white hover:border-none "
                  >
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
