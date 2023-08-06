import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import UserProfile from "./UserProfile";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
    ],
  },
]);

export default routes;
