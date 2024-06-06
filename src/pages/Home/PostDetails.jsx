import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots, FaShare } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";


const PostDetails = () => {

    const details = useLoaderData();

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
                            <button className="btn">Up Vote <AiFillLike /></button>
                            <button className="btn">Down Vote <AiFillDislike /></button>
                        </div>
                        <div className="flex justify-end gap-6">
                            <Link><button className="btn text-black bg-[#d2e3fd] mt-5">Comment <FaRegCommentDots /></button></Link>
                            <Link><button className="btn text-white bg-[#118acb] mt-5">Share <FaShare /></button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;