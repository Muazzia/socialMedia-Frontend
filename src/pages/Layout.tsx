import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

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
