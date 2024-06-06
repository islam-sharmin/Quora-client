import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Home/Login";
import Signup from "../pages/Home/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyProfile from "../pages/Dashboard/MyProfile";
import AddPost from "../pages/Dashboard/AddPost";
import PrivateRoute from "./PrivateRoute";
import MyPost from "../pages/Dashboard/MyPost";
import Membership from "../pages/Home/Membership";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path:'/',
        element: <Home></Home>
      },
      {
        path:'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <Signup></Signup>
      },
      {
        path: 'membership',
        element: <Membership></Membership>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'addPost',
        element: <AddPost></AddPost>
      },
      {
        path: 'myPost',
        element: <MyPost></MyPost>
      }
    ]
  }
]);