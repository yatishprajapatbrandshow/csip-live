import Activities from "@/Components/Activities";
import SideBar from "@/Components/Sidebar"
import Dashboard from "./Dashboard";
import Header from "@/Components/Header";
import { trendingData, favoriteData, newData, recommendedData } from "@/utils/dashboardData";



export default function Home() {
    return (
        <>
            <Header session={true} />
            <div className="max-w-[1500px] mx-auto">
                {/* <SideBar /> */}
                <div className="">
                    <Dashboard />
                    <Activities title="Favorite Activity" cardData={favoriteData} />
                    <Activities title="Recommended Activity" cardData={recommendedData} />
                    <Activities title="New Activity" cardData={newData} />
                    <Activities title="Trending Activity" cardData={trendingData} />
                </div>
            </div>
        </>
    );
}
