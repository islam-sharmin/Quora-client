import { FaTrashAlt } from "react-icons/fa";
import usePost from "../../hooks/usePost";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const MyPost = () => {

    const axiosSecure = useAxiosSecure();
    const [post, refetch] = usePost();
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
    }

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
                        post.map((item, index) => <tr key={item._id}>
                            <th>{index + 1}</th>
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
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyPost;