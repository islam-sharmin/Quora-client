import { BsPostcardHeart } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Dashboard = () => {
    const {user} = useAuth();
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-[#d2e3fd]">
                <ul className="menu p-4">
                    <li><NavLink to={`/dashboard/myProfile/${user.email}`}><CgProfile className="text-xl" /> My Profile</NavLink></li>
                    <li><NavLink to="/dashboard/addPost"><MdOutlinePostAdd className="text-xl" /> Add Post</NavLink></li>
                    <li><NavLink to="/dashboard/myPost"><BsPostcardHeart className="text-xl" /> My Posts</NavLink></li>

                    {/* {
                        isAdmin ? <>
                            <li><NavLink to="/dashboard/adminHome"><FaHome /> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/addItems"><FaUtensils /> Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manageItems"><FaList /> Manage Items</NavLink></li>
                            <li><NavLink to="/dashboard/bookings"><FaBook /> Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/users"><FaUsers /> All Users</NavLink></li>
                        </>
                            :
                            <>
                                <li><NavLink to="/dashboard/userHome"><FaHome /> User Home</NavLink></li>
                                <li><NavLink to="/dashboard/reservation"><FaCalendarAlt /> Reservation</NavLink></li>
                                <li><NavLink to="/dashboard/cart"><FaShoppingCart /> My Cart ({cart.length})</NavLink></li>
                                <li><NavLink to="/dashboard/review"><MdReviews /> Add Review</NavLink></li>
                                <li><NavLink to="/dashboard/paymentHistory"><MdLaptopChromebook /> Payment History</NavLink></li>
                            </>
                    } */}

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