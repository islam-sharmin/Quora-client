import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const MakeAnnouncement = () => {

    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();


    const onSubmit = async (data) => {
        console.log(data);
        // now send the menu item data to the server with the image api
        const announcementItem = {
            authorName: data.authorName,
            authorImage: data.authorImage,
            title: data.title,
            description: data.description,
            announcement: data.announcement
        }
        console.log(announcementItem);
        // 
        const announcementRes = await axiosSecure.post('/announcements', announcementItem);
        console.log(announcementRes.data);
        if (announcementRes.data.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Announcement added to the notification",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div>
            <h2 className="mt-8 underline text-[#118acb] font-bold text-2xl text-center">Make Announcement</h2>
            <div className="card shrink-0 w-full bg-base-100">
            
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        {/* author name & image */}
                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-[#118acb]">Author Name</span>
                                </label>
                                <input {...register("authorName", { required: true })} type="text" placeholder="Author Name" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-[#118acb]">Author Image</span>
                                </label>
                                <input {...register("authorImage", { required: true })} type="text" placeholder="Author Image" className="input input-bordered w-full" />
                            </div>
                        </div>
                        {/* post title */}
                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold text-[#118acb]">Post Title</span>
                                </label>
                                <input {...register("title", { required: true })} type="text" placeholder="Post Title" className="input input-bordered w-full" />
                            </div>
                        </div>
                        {/* Post description */}
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-[#118acb]">Post Description</span>
                            </label>
                            <input {...register("description", { required: true })} type="text" placeholder="Post Description" className="input input-bordered w-full" />
                        </div>

                        {/* Announcement */}
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-semibold text-[#118acb]">Announcement</span>
                            </label>
                            <input {...register("announcement", { required: true })} type="text" placeholder="Announcement" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn text-black bg-[#118acb]" value="Add Announcement" />
                        </div>
                    </form>
            </div>
        </div>
    );
};

export default MakeAnnouncement;