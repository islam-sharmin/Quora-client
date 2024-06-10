import { Fade } from "react-awesome-reveal";
import { AiOutlineGlobal } from "react-icons/ai";
import { GrSecure } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";



const Features = () => {

    useEffect(()=>{
        AOS.init();
    }, [])

    return (
        <div className="mt-14">
            <div className=" text-center mb-5 ">
                <h2 className="text-4xl font-bold text-yellow-600 mb-2">Our Feature</h2>
                <Fade>
                    <p className=" text-slate-600"> Real-time collaboration, personalized study plans, and interactive resources for effective online learning.</p>
                </Fade>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* card 1 */}
                <div className="card bg-base-100 shadow-lg" data-aos="fade-up" data-aos-duration="1000" >
                    <figure className="px-10 pt-10">
                        <div className="rounded-full bg-stone-200 p-5">
                            <ImProfile className="text-4xl font-extrabold text-violet-500"></ImProfile>
                        </div>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xl font-bold">Easily Manage Profile</h2>
                        <p className="text-lg text-slate-500">User friendly profile that give easy to control</p>
                    </div>
                </div>
                {/* card 2 */}
                <div className="card bg-base-100 shadow-lg" data-aos="fade-up" data-aos-duration="1000" >
                    <figure className="px-10 pt-10">

                        <div className="rounded-full bg-stone-200 p-5">
                            <GrSecure className="text-4xl font-extrabold text-lime-500"></GrSecure>
                        </div>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xl font-bold">Secure GatWay</h2>
                        <p className="text-lg text-slate-500">With confidence using our secure options.</p>
                    </div>
                </div>
                {/* card 3 */}
                <div className="card bg-base-100 shadow-lg" data-aos="fade-up" data-aos-duration="1000" >
                    <figure className="px-10 pt-10">
                        <div className="rounded-full bg-stone-200 p-5">
                            <AiOutlineGlobal className="text-4xl font-extrabold text-sky-500"></AiOutlineGlobal>
                        </div>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xl font-bold">Global Coverage</h2>
                        <p className="text-lg text-slate-500"> Explore accommodations worldwide with our extensive database</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;