import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../shared/SectionTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Posts = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredQueries, setFilteredQueries] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { data: post = [] } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts');
            return res.data;
        }
    });

    useEffect(() => {
        const filtered = post.filter(item =>
            item.tags?.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredQueries(filtered);
    }, [post, searchText]);

    const handleSearch = (e) => {
        e.preventDefault();
        const text = e.target.elements.searchInput.value;
        setSearchText(text);
    };

    return (
        <div>
            <div className='bg-[#d2e3fd] p-5'>
                <div className='max-w-6xl mx-auto flex justify-between items-center'>
                    <div className="flex-1">
                        <form onSubmit={handleSearch}>
                            <label className="input input-bordered rounded-3xl flex items-center my-8 gap-2 w-1/2">
                                <input
                                    type="text"
                                    name="searchInput"
                                    className="grow"
                                    placeholder="Search Here"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                                </svg>
                            </label>
                        </form>
                        <p><span className="font-bold">Tags:</span> #javascript #react #Web Development</p>
                    </div>
                    <div>
                        <div className="flex justify-end">
                            <button className="btn bg-[#118acb] text-white">Sort by Popularity</button>
                        </div>
                    </div>
                </div>
            </div>
            <SectionTitle subHeading="Check it out" heading="All Post"></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    filteredQueries.map(item =>
                        <div key={item._id} className="card bg-base-100 shadow-xl">
                            <figure><img className="h-64 w-72 p-4" src={item.authorImage} alt="Post" /></figure>
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
