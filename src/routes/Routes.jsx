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
import PostDetails from "../pages/Home/PostDetails";
import ManageUser from "../pages/Dashboard/ManageUser";
import AdminRoute from "./AdminRoute";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement";
import Comments from "../pages/Dashboard/Comments";


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
        path: 'postDetails/:id',
        element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/posts/single/${params.id}`)
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
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
      {
        path: 'addPost',
        element: <PrivateRoute><AddPost></AddPost></PrivateRoute>
      },
      {
        path: 'myPost',
        element: <PrivateRoute><MyPost></MyPost></PrivateRoute>
      },
      {
        path: 'myPost/comments/:title',
        element: <Comments></Comments>,
        loader: ({params}) => fetch(`http://localhost:5000/comments/${params.title}`)
      },

      // admin
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
      },
      {
        path: 'announcement',
        element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
      }
    ]
  }
]);