import usePost from "../../hooks/usePost";


const MyPost = () => {

    const [post] = usePost();

    return (
        <div>
            <h2>{post.length}</h2>
        </div>
    );
};

export default MyPost;