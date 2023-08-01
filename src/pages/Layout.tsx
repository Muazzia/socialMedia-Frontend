import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-[#f9f9f9]">
        <div className="mx-4 lg:max-w-[1015px] lg:mx-auto  h-[90vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
