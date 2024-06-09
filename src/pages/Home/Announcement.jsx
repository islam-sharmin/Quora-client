import { AiFillSound } from "react-icons/ai";
import useAnnouncement from "../../hooks/useAnnouncement";
import SectionTitle from "../../shared/SectionTitle";

const Announcement = () => {

    const [announcements] = useAnnouncement();

    return (
        <div className='max-w-6xl mx-auto'>
            {
                announcements.length &&
                <div id="announcementId">
                    <SectionTitle subHeading="Important!" heading="Announcements"></SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {
                            announcements.map((announcement, index) => (
                                <div key={index} className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <div className="flex items-center gap-6">
                                        <img src={announcement.authorImage} alt="Author" className="w-10 h-10 rounded-full" />
                                        <p><span className="font-semibold">Name: </span>{announcement.authorName}</p>
                                        </div>
                                        <h2 className="card-title">Title: {announcement.title}</h2>
                                        <p><span className="font-semibold">Description: </span>{announcement.description}</p>
                                        <p className="flex items-center gap-2"><span><AiFillSound className="text-3xl" /></span> {announcement.announcement}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Announcement;