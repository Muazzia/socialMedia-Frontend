import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout';
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import UserProfile from './UserProfile';

const routes= createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
          { index: true, element: <Login /> },
          { path:'register', element: <Logout /> },
          { path: "home", element: <Home /> },
          { path: "profile/:id", element: <UserProfile /> },
        ],
      },
]);

export default routes;