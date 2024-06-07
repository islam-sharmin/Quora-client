import { BsPostcardHeart } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaUsers } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { AiOutlineSound } from "react-icons/ai";
import { GoReport } from "react-icons/go";


const Dashboard = () => {

    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-[#d2e3fd]">
                <ul className="menu p-4">
                    {/* <li><NavLink to="/dashboard/myProfile"><CgProfile className="text-xl" /> My Profile</NavLink></li>
                    <li><NavLink to="/dashboard/addPost"><MdOutlinePostAdd className="text-xl" /> Add Post</NavLink></li>
                    <li><NavLink to="/dashboard/myPost"><BsPostcardHeart className="text-xl" /> My Posts</NavLink></li> */}
                    {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/adminProfile"><CgProfile className="text-xl" /> Admin Profile</NavLink></li>
                            <li><NavLink to="/dashboard/manageUsers"><FaUsers /> Manage Users</NavLink></li>
                            <li><NavLink to="/dashboard/reportComment"><GoReport /> Reported Comments</NavLink></li>
                            <li><NavLink to="/dashboard/announcement"><AiOutlineSound /> Make Announcement</NavLink></li>
                        </>
                            :
                            <>
                                <li><NavLink to="/dashboard/myProfile"><CgProfile className="text-xl" /> My Profile</NavLink></li>
                                <li><NavLink to="/dashboard/addPost"><MdOutlinePostAdd className="text-xl" /> Add Post</NavLink></li>
                                <li><NavLink to="/dashboard/myPost"><BsPostcardHeart className="text-xl" /> My Posts</NavLink></li>
                            </>
                    }

                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome className="text-xl" /> Home</NavLink></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;