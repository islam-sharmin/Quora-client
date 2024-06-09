import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import usePost from "../../hooks/usePost";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [authorInfo, setAuthorInfo] = useState(null);
    const [post, refetch] = usePost();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user information by email when component mounts
        if (user?.email) {
            axiosSecure.get(`/users/${user.email}`)
                .then(response => {
                    setAuthorInfo(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user information:', error);
                });
        }
    }, [axiosSecure, user]);

    const onSubmit = async (data) => {
        console.log(data);
        // now send the menu item data to the server with the image api
        const menuItem = {
            name: authorInfo?.name,
            image: authorInfo?.photo,
            email: authorInfo?.email,
            authorName: data.authorName,
            authorImage: data.authorImage,
            authorEmail: data.authorEmail,
            title: data.title,
            description: data.description,
            tags: data.tags,
            upVote: parseInt(data.upVote),
            downVote: parseInt(data.downVote),
            totalVote: 0,
            // postCount: post.length,
            badge: authorInfo.badge,
            commentCount: 0
        }
        console.log(menuItem);
        // 
        const menuRes = await axiosSecure.post('/posts', menuItem);
        console.log(menuRes.data);
        if (menuRes.data.insertedId) {
            reset();
            Swal.fire({
                position: "center",
                icon: "success",
                title: `${data.title} is added to the Post`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        refetch();
    }

    const handleMembershipRedirect = () => {
        navigate('/membership'); // redirect to Membership Page
    }

    return (
        <div>
            <h2 className="mt-8 underline text-[#118acb] font-bold text-2xl text-center">Create Assignment</h2>
            <div className="card shrink-0 w-full bg-base-100">
            {authorInfo && (authorInfo.badge === 'gold' || post.length < 5) ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        {/* author name & image */}
                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-[#118acb]">Author Name</span>
                                </label>
                                <input {...register("authorName", { required: true })} type="text" placeholder="Author Name" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-[#118acb]">Author Image</span>
                                </label>
                                <input {...register("authorImage", { required: true })} type="text" placeholder="Author Image" className="input input-bordered w-full" />
                            </div>
                        </div>
                        {/* author email & post title */}
                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-[#118acb]">Author Email</span>
                                </label>
                                <input {...register("authorEmail", { required: true })} type="text" placeholder="Author Email" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-[#118acb]">Post Title</span>
                                </label>
                                <input {...register("title", { required: true })} type="text" placeholder="Post Title" className="input input-bordered w-full" />
                            </div>
                        </div>
                        {/* Post description */}
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-[#118acb]">Post Description</span>
                            </label>
                            <input {...register("description", { required: true })} type="text" placeholder="Post Description" className="input input-bordered w-full" />
                        </div>
                        {/* tags, upVote & downVote */}
                        <div className="flex flex-col lg:flex-row gap-5">
                            {/* level marks and date */}
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-[#118acb]">Tags</span>
                                </label>
                                <select defaultValue="default" {...register("tags", { required: true })} className="select select-bordered w-full">
                                    <option disabled selected>tags</option>
                                    <option>JavaScript</option>
                                    <option>React</option>
                                    <option>Web Development</option>
                                    <option>Programming</option>
                                </select>
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-[#118acb]">Up Vote</span>
                                </label>
                                <input {...register("upVote", { required: true })} type="number" placeholder="Up Vote" defaultValue="0" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-[#118acb]">Down Vote</span>
                                </label>
                                <input {...register("downVote", { required: true })} type="number" placeholder="Down Vote" defaultValue="0" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn text-black bg-[#118acb]" value="Add Post" />
                        </div>
                    </form>
                ) : (
                    <div className="text-center p-6">
                        <p className="mb-4 text-lg font-semibold text-red-600">You have reached the maximum number of posts allowed for a normal user.</p>
                        <button onClick={handleMembershipRedirect} className="btn text-black bg-[#118acb]">Become a Member</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddPost;
