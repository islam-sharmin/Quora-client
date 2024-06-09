import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const Main = () => {
    return (
        <div>
            <div className='bg-[#d2e3fd]'>
                <div className='max-w-6xl mx-auto'>
                    <Navbar></Navbar>
                </div>
                <div className='border-b border-slate-300'></div>
            </div>
            <div>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;