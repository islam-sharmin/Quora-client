import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const usePost = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: post = [], refetch } = useQuery({
        queryKey: ['post', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/posts/${user.email}`);
            return res.data;
        }
    })
    return [post, refetch]
};

export default usePost;