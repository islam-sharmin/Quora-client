import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../shared/SectionTitle";


const Posts = () => {

    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    const { data: post = [] } = useQuery({
        queryKey: ['post', user?.email],
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
                            <figure><img className="h-64 w-full p-4" src={item.authorImage} alt="Shoes" /></figure>
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
                                    <button className="btn w-full bg-[#118acb] text-white">View Details</button>
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