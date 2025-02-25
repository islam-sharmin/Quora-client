import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../shared/SectionTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const Posts = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredQueries, setFilteredQueries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSortedByPopularity, setIsSortedByPopularity] = useState(false);
    const postsPerPage = 5;
    const axiosPublic = useAxiosPublic();

    const { data: posts = [] } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts');
            return res.data;
        }
    });

    useEffect(() => {
        let filtered = posts.filter(item =>
            item.tags?.toLowerCase().includes(searchText.toLowerCase())
        );

        if (isSortedByPopularity) {
            filtered = filtered.sort((a, b) => b.totalVote - a.totalVote);
        }

        setFilteredQueries(filtered);
    }, [posts, searchText, isSortedByPopularity]);

    const handleSearch = (e) => {
        e.preventDefault();
        const text = e.target.elements.searchInput.value;
        setSearchText(text);
        setCurrentPage(1); // Reset to first page after search
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSortByPopularity = () => {
        setIsSortedByPopularity(!isSortedByPopularity);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredQueries.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredQueries.length / postsPerPage);

    return (
        <div>
            <div className='bg-[#d2e3fd] p-5'>
                <div className="mx-auto text-center md:w-4/12 my-4">
                    <h3 className="text-3xl text-[#118acb] font-bold uppercase">Quora</h3>
                    <p className=" mb-2">-- Forum Website for Discussion --</p>
                </div>
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
                        <p><span className="font-bold text-[#118acb]">Tags:</span> #Programming #Frameworks #Web Development #Security</p>
                    </div>
                    <div>
                        <div className="flex justify-end">
                            <button
                                className="btn bg-[#118acb] text-white"
                                onClick={handleSortByPopularity}
                            >
                                Sort by Popularity
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <SectionTitle subHeading="Check it out" heading="All Post"></SectionTitle>
            <div className='max-w-6xl mx-auto'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        currentPosts.map(item =>
                            <div key={item._id} className="card bg-base-100 shadow-xl">
                                <figure><img className="h-64 w-72 p-4" src={item.authorImage} alt="Post" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.title}</h2>
                                    <div className="flex justify-between">
                                        <p>Tag: #{item.tags}</p>
                                    </div>
                                    <div className="flex justify-end">
                                        <p className="flex items-center gap-2"><span><AiFillLike className="text-xl" /></span><span>({item.upVote})</span></p>
                                        <p className="flex items-center gap-2"><span><AiFillDislike className="text-xl" /></span><span>({item.downVote})</span></p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Comment Count: {item.commentCount}</p>
                                        <p>Popularity: {item.totalVote}</p>
                                    </div>
                                    <div>
                                        <p>Author Website: {item.authorWebsite}</p>
                                    </div>
                                    <div className="card-actions">
                                        <Link className="w-full" to={`/postDetails/${item._id}`}><button className="btn w-full bg-[#118acb] text-white">View Details</button></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="flex justify-center mt-8">
                    <nav>
                        <ul className="pagination flex space-x-2">
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`btn ${currentPage === index + 1 ? 'bg-[#118acb] text-white' : 'bg-gray-200 text-black'}`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Posts;
