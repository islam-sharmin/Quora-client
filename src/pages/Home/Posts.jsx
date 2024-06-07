import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../shared/SectionTitle";
import { Link } from "react-router-dom";


const Posts = () => {

    const axiosPublic = useAxiosPublic();
    const { data: post = [] } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts');
            return res.data;
        }
    })

    return (
        <div>
            <SectionTitle subHeading="Check it out" heading="All Post"></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    post.map(item =>
                        <div key={item._id} className="card bg-base-100 shadow-xl">
                            <figure><img className="h-64 w-72 p-4" src={item.authorImage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.title}</h2>
                                <div className="flex justify-between">
                                <p>Tag: #{item.tags}</p>
                                <p>Time</p>
                                </div>
                                <div className="flex justify-between">
                                <p>Comment Count: {item.commentCount}</p>
                                <p>Vote Count: {item.totalVote}</p>
                                </div>
                                <div className="card-actions">
                                    <Link className="w-full" to={`/postDetails/${item._id}`}><button className="btn w-full bg-[#118acb] text-white">View Details</button></Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Posts;