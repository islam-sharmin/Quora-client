import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const AdminProfile = () => {

    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const chartRef = useRef(null); // Ref to hold chart instance

    const onSubmit = async (data) => {
        const addTags = {
            tags: data.tags
        }
        console.log(addTags);
    }
   
    const { data: posts = [] } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts');
            return res.data;
        }
    });

    const { data: comments = [] } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/comments');
            return res.data;
        }
    });

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    useEffect(() => {
        const ctx = document.getElementById('myPieChart').getContext('2d');

        // Destroy previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create new chart instance
        chartRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Posts', 'Comments', 'Users'],
                datasets: [{
                    label: 'Site Data',
                    data: [posts.length, comments.length, users.length],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Site Data Distribution'
                    }
                }
            }
        });
    }, [posts, comments, users]);

    return (
        <div className="flex items-center bg-base-200">
            <div className="hero py-6  rounded-xl">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={user?.photoURL} className="w-48 h-56 rounded-lg shadow-2xl" />
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold"><span className="font-bold">Name:</span> {user?.displayName}</h2>
                        <p className=""><span className="font-bold">Email:</span> {user?.email}</p>
                        <div className="flex items-center gap-6">
                            <p><span className="font-bold">Total User:</span> {users.length}</p>
                            <p><span className="font-bold">Total Post:</span> {posts.length}</p>
                        </div>
                        <p><span className="font-bold">Total Comment:</span> {comments.length}</p>
                        <form onSubmit={handleSubmit(onSubmit)}  className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-[#118acb]">Add Tags</span>
                            </label>
                            <input {...register("tags", { required: true })} type="text" placeholder="Add Tags" className="input input-bordered w-full" />
                        </form>
                    </div>
                </div>
            </div>
            <div className="my-8">
                <canvas id="myPieChart" width="400" height="400"></canvas>
            </div>
        </div>
    );
};

export default AdminProfile;
