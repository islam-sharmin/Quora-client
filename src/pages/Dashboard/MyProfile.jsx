import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
    
    const {user} = useAuth();
    const [badge, setBadge] = useState('bronze');

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src={user.photoURL} className="w-32 h-32 rounded-lg shadow-2xl" />
                <div className="space-y-2">
                    <h1 className="text-5xl font-bold">Name: {user.displayName}</h1>
                    <p className="">Email: {user.email}</p>
                    <p className="">Badge: {badge}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;