import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePost from "../../hooks/usePost";

const MyProfile = () => {

    const { user } = useAuth();
    const [post] = usePost();

    const axiosSecure = useAxiosSecure();
    const [authorInfo, setAuthorInfo] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/${user.email}`)
                .then(response => {
                    setAuthorInfo(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [axiosSecure, user]);

    return (
        <div className="bg-base-200">
            <div className="hero py-6 rounded-xl">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={authorInfo?.photo} className="w-40 h-40 rounded-lg shadow-2xl" />
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Name: {authorInfo?.name}</h2>
                        <p className="">Email: {authorInfo?.email}</p>
                        <p className="">Badge: {authorInfo?.badge}</p>
                        <p>Total Post: {post?.length}</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                {
                    post.slice(0,3).map(item => <div key={item._id} className="card bg-base-100 shadow-xl">
                        <figure><img className="h-52" src={item.authorImage} alt="Shoes" /></figure>
                        <div className="card-body">
                          <h2 className="card-title">{item.title}</h2>
                          <p>Description: {item.description}</p>
                        </div>
                        </div>
                        )
                }
                
            </div>
        </div>
    );
};

export default MyProfile;