import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import UserProfile from "./UserProfile";

const token = localStorage.getItem("authToken");

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "home", element: token ? <Home /> : <Login /> },
      { path: "profile/:id", element: token ? <UserProfile /> : <Login /> },
    ],
  },
]);

export default routes;
