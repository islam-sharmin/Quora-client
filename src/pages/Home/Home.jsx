import Announcement from "./Announcement";
import Features from "./Features";
import Posts from "./Posts";


const Home = () => {
    return (
        <div>
            <Posts></Posts>
            <Announcement></Announcement>
            <Features></Features>
        </div>
    );
};

export default Home;