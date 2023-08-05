import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import UserProfile from "./UserProfile";
import ProtectedRoute from "./ProtectedRoute";

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
