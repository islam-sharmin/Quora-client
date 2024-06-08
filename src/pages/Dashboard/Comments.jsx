import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Comments = () => {
    const comments = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const [feedbacks, setFeedbacks] = useState(comments.map(() => ({
        feedback: '',
        reportDisabled: true
    })));

    const handleFeedbackChange = (index, event) => {
        const newFeedbacks = [...feedbacks];
        newFeedbacks[index].feedback = event.target.value;
        newFeedbacks[index].reportDisabled = false;
        setFeedbacks(newFeedbacks);
    };

    const handleReportClick = async (index) => {
        const newFeedbacks = [...feedbacks];
        newFeedbacks[index].reportDisabled = true;
        setFeedbacks(newFeedbacks);
    
        const commentId = comments[index]._id; // Get the correct comment ID
        const feedbackData = {
            feed: newFeedbacks[index].feedback,
            status: 'reported'
        };
    
        try {
            const response = await axiosSecure.patch(`/status/${commentId}`, feedbackData);
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Report submitted successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Failed to report comment:', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: 'Failed to submit report',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Comments</th>
                            <th>Feedback</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            comments.map((comment, index) => (
                                <tr key={comment._id}>
                                    <th>{index + 1}</th>
                                    <td>{comment.name}</td>
                                    <td>{comment.comment}</td>
                                    <td>
                                        <select 
                                            name="feedback" 
                                            className="select select-bordered w-full" 
                                            onChange={(event) => handleFeedbackChange(index, event)}
                                            value={feedbacks[index].feedback}
                                        >
                                            <option disabled value="">Select feedback</option>
                                            <option>Fake post</option>
                                            <option>Off-Topic</option>
                                            <option>Misinformation</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-error btn-md" 
                                            onClick={() => handleReportClick(index)} 
                                            disabled={feedbacks[index].reportDisabled}
                                        >
                                            Report
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Comments;
