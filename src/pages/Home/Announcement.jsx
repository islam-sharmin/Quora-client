import useAnnouncement from "../../hooks/useAnnouncement";
import announcementImg from "../../assets/announcement.jpg";
import SectionTitle from "../../shared/SectionTitle";

const Announcement = () => {

    const [announcements] = useAnnouncement();

    return (
        <div className='max-w-6xl mx-auto'>
            {
                announcements.length &&
                <div>
                    <SectionTitle subHeading="Important!" heading="Announcements"></SectionTitle>
                    <div className="card lg:card-side bg-base-100 shadow-xl">
                        <figure className="w-1/2"><img src={announcementImg} alt="Album" /></figure>
                        <div className="card-body">
                            <img src={announcements.authorImage} alt="" />
                            <h2 className="card-title">New album is released!</h2>
                            <p>Click the button to listen on Spotiwhy app.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Listen</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Announcement;