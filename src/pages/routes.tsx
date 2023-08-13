import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import UserProfile from "./UserProfile";
import Search from "./Search";
import Error from "./Error";
import LogoutPrevent from "./LogoutPrevent";
import Message from "./Message";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <LogoutPrevent children={<Login />} /> },
      { path: "register", element: <LogoutPrevent children={<Register />} /> },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "profile/:id",
        element: <ProtectedRoute children={<UserProfile />} />,
      },
      {
        path: "search/:searchStr",
        element: <ProtectedRoute children={<Search />} />,
      },
      {
        path: "message/:id",
        element: <ProtectedRoute children={<Message />} />,
      },
      {
        path: "*",
        element: <Try />,
      },
    ],
  },
]);

function Try() {
  return <p>This is try</p>;
}

export default routes;
