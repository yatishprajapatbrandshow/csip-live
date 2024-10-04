import EditProfile from './EditProfile'
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import SideBar from '@/Components/Sidebar';
export default function Page() {
    return (
        <div>
            <Header session={true} />
            <div className='flex'>
                <SideBar />
                <EditProfile />
            </div>
            <Footer />
        </div>
    );
}
