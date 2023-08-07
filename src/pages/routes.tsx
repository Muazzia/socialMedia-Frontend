import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import UserProfile from "./UserProfile";
import Search from "./Search";
import Error from "./Error";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "home",
        element: <ProtectedRoute children={<Home />} />,
      },
      {
        path: "profile/:id",
        element: <ProtectedRoute children={<UserProfile />} />,
      },
      {
        path: "search/:searchStr",
        element: <ProtectedRoute children={<Search />} />,
      },
    ],
  },
]);

export default routes;
