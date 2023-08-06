import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="">
        <div className="mx-4 lg:max-w-[1015px] lg:mx-auto  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
