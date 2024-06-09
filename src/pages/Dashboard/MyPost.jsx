import { FaTrashAlt } from "react-icons/fa";
import usePost from "../../hooks/usePost";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useState } from "react";

const MyPost = () => {
    const axiosSecure = useAxiosSecure();
    const [post, refetch] = usePost();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleDeletePost = post => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/posts/${post._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    // Calculate pagination values
    const totalPages = Math.ceil(post.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPosts = post.slice(startIndex, startIndex + itemsPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Post Title</th>
                        <th>Number of votes</th>
                        <th>Comment</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentPosts.map((item, index) => (
                            <tr key={item._id}>
                                <th>{startIndex + index + 1}</th>
                                <td>{item.title}</td>
                                <td>{item.totalVote}</td>
                                <td>
                                    <Link to={`comments/${item.title}`}>
                                        <button className="btn bg-[#d2e3fd] btn-md">Comment</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDeletePost(item)} className="btn btn-error btn-md"><FaTrashAlt /></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <div>
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, post.length)} of {post.length} posts
                </div>
                <div>
                    <ul className="pagination flex items-center space-x-2">
                        <li>
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className="btn"
                            >
                                &laquo;
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`btn ${currentPage === i + 1 ? 'btn-active' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                className="btn"
                            >
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyPost;
