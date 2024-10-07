import EditProfile from './EditProfile'
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import SideBar from '@/Components/Sidebar';
export default function Page() {
    return (
        <div>
            <Header session={true} />
            <div className="relative z-10">
                <SideBar />
                <div className="pl-52 pb-[500px]">
                <EditProfile />
                </div>
            </div>
        </div>
    );
}
