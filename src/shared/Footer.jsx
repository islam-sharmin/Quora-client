import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from '../../public/logo.png';


const Footer = () => {
    return (
        <div className="mt-14">
            <footer className="footer p-10 bg-[#d2e3fd] text-base-content">
                <nav className="">
                    <div className="flex items-center">
                    <img src={logo} alt="" className="w-[60px] h-[50px]" />
                    <h6 className="text-2xl text-[#118acb] font-bold">Quora</h6>
                    </div>
                    <p className="mb-2">Contact us, privacy policy, terms, and support.</p>
                    <div className="flex gap-5 items-center">
                        <p className="text-2xl"><FaFacebook /></p>
                        <p className="text-2xl"><FaGithub /></p>
                        <p className="text-2xl"><FaTwitter /></p>
                        <p className="text-2xl"><FaLinkedin /></p>
                    </div>
                </nav>
                <nav>
                    <h6 className="text-[#118acb] font-bold">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="text-[#118acb] font-bold">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <form>
                    <h6 className="text-[#118acb] font-bold">Newsletter</h6>
                    <fieldset className="form-control w-80">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="join">
                            <input type="text" placeholder="username@site.com" className="input input-bordered w-1/2 md:w-full join-item" />
                            <button className="btn bg-[#118acb] text-white join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </footer>
        </div>
    );
};

export default Footer;