import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import SectionTitle from "../../shared/SectionTitle";


const PostsHome = () => {

    // const [searchText, setSearchText] = useState('');
    // const [filteredQueries, setFilteredQueries] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { data: post = [] } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts');
            return res.data;
        }
    });

    return (
        <div>
            <SectionTitle subHeading="Check it out" heading="All Post"></SectionTitle>
            <div className='max-w-6xl mx-auto'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        post.map(item =>
                            <div key={item._id} className="card bg-base-100 shadow-xl">
                                <figure><img className="h-64 w-72 p-4" src={item.authorImage} alt="Post" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.title}</h2>
                                    <div className="flex justify-between">
                                        <p>Tag: #{item.tags}</p>
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <p className="flex items-center gap-2"><span><AiFillLike /></span>({item.upVote})</p>
                                        <p className="flex items-center gap-2"><span><AiFillDislike /></span>({item.downVote})</p>
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
        </div>
    );
};

export default PostsHome;