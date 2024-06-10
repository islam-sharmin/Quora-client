import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots, FaShare } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { FacebookShareButton } from "react-share";


const PostDetails = () => {

    const details = useLoaderData();
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [activeButton, setActiveButton] = useState(null);
    const shareUrl = 'https://www.facebook.com/'

    const onSubmit = async (data) => {
        const commentInfo = {
            name: user?.displayName,
            title: details.title,
            comment: data.comment
        }
        console.log(commentInfo);

        // 
        const commentRes = await axiosSecure.post('/comments', commentInfo);
        console.log(commentRes.data);
        if (commentRes.data.insertedId) {
            reset();
            Swal.fire({
                position: "center",
                icon: "success",
                title: 'Comment posted successfully',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleUpvote = async (postId) => {
        try {
            await axiosSecure.patch(`/posts/upvote/${postId}`);
            setActiveButton('upvote');
            // Optionally, you can update the UI to reflect the upvote
        } catch (error) {
            console.error('Error upvoting post:', error);
        }
    };

    // Function to handle downvoting a post
    const handleDownvote = async (postId) => {
        try {
            await axiosSecure.patch(`/posts/downvote/${postId}`);
            setActiveButton('downvote');
            // Optionally, you can update the UI to reflect the downvote
        } catch (error) {
            console.error('Error downvoting post:', error);
        }
    };

    // comment count
    const handleCommentCount = async (postId) => {
        try {
            await axiosSecure.patch(`/posts/count/${postId}`);
            // Optionally, you can update the UI to reflect the downvote
        } catch (error) {
            console.error('Error downvoting post:', error);
        }
    };

    return (
        <div>
            <div className="hero mt-8">
                <div className="hero-content gap-10 flex-col lg:flex-row">
                    <img src={details.authorImage} className="rounded-lg shadow-xl bg-base-300 h-[70vh] w-full md:w-1/2" />
                    <div className="space-y-3 py-2">
                        <p><span className="font-bold">Author Name: </span>{details.authorName}</p>
                        <h3 className="text-2xl font-bold text-[#118acb]">{details.title}</h3>
                        <p><span className="font-bold">Description: </span>{details.description}</p>
                        <hr />
                        <p><span className="font-bold">Tag: </span>#{details.tags}</p>
                        <p><span className="font-bold">Post Time: </span></p>
                        <hr />
                        <div className="flex justify-start gap-6">
                            <button
                                onClick={() => handleUpvote(details._id)}
                                className={`btn ${activeButton === 'upvote' ? 'bg-sky-500 text-white' : ''}`}
                            >
                                Up Vote <AiFillLike />
                            </button>
                            <button
                                onClick={() => handleDownvote(details._id)}
                                className={`btn ${activeButton === 'downvote' ? 'bg-red-500 text-white' : ''}`}
                            >
                                Down Vote <AiFillDislike />
                            </button>
                        </div>
                        <div className="flex justify-end gap-6">
                            <a href="#commentId" className="btn text-black bg-[#d2e3fd] mt-5">Comment <FaRegCommentDots /></a>
                            <FacebookShareButton url={shareUrl}>
                                <button className="btn text-white bg-[#118acb] mt-5">Share <FaShare /></button>
                            </FacebookShareButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="w-[45%]"></div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" id="commentId">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-[#118acb]">Write a Comment</span>
                            </label>
                            <div className="join">
                                <input  {...register("comment")} className="input input-bordered join-item w-full" placeholder="Type here your comment" />
                                <input onClick={() => handleCommentCount(details._id)} type="submit" className="btn  join-item text-black bg-[#118acb]" value="Submit" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostDetails;