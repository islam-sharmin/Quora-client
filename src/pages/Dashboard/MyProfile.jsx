// import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {
    
    const {user} = useAuth();
    const [post] = usePost();

    // TODO:

    // const axiosSecure = useAxiosSecure();
    // const [authorInfo, setAuthorInfo] = useState(null);

    // useEffect(() => {
    //     // Fetch user information by email when component mounts
    //     if (user?.email) {
    //         axiosSecure.get(`/users/${user.email}`)
    //             .then(response => {
    //                 setAuthorInfo(response.data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching user information:', error);
    //             });
    //     }
    // }, [axiosSecure, user]);

    return (
        <div className="hero py-6 bg-base-200 rounded-xl">
            <div className="hero-content flex-col lg:flex-row">
                <img src={user?.photoURL} className="w-40 h-40 rounded-lg shadow-2xl" />
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Name: {user?.name}</h2>
                    <p className="">Email: {user?.email}</p>
                    <p className="">Badge: {user?.badge}</p>
                    <p>Total Post: {post?.length}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;