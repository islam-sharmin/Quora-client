import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
import { IoMdNotifications } from "react-icons/io";
import useAuth from "../hooks/useAuth";


const Navbar = () => {

    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/membership">Membership</Link></li>
        <li><Link to="/notification">Notification <IoMdNotifications className="text-lg" /></Link></li>
    </>

    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <div className="flex items-center">
                    <img className="w-[50px] h-[50px]" src={logo} alt="" />
                    <a className="btn btn-ghost text-xl">Quora</a>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>

            {user ? (
                <div className="navbar-end">
                    <div className="flex items-center gap-3">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="user pic"
                                        src={user?.photoURL || "https://i.ibb.co/p3d9pYn/user.png"}
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>{user.displayName}</li>
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <li><Link onClick={handleLogOut}>Log Out</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="navbar-end">
                        <Link to='/login' className="btn bg-[#118acb] text-white">Join Us</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;