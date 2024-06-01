import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';

const Main = () => {
    return (
        <div>
            <div className='bg-[#d2e3fd]'>
                <div className='max-w-6xl mx-auto'>
                    <Navbar></Navbar>
                </div>
            </div>
            <div className='max-w-6xl mx-auto'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;