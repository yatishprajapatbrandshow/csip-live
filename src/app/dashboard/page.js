import Activities from "@/Components/Activities";
import Dashboard from "./Dashboard";
import Header from "@/Components/Header";
import { trendingData, favoriteData, newData, recommendedData } from "@/utils/dashboardData";



export default function Home() {
    return (
        <>
            <Header session={true} />
            <Dashboard />
            <Activities title="Favorite Activity" cardData={favoriteData} />
            <Activities title="Recommended Activity" cardData={recommendedData} />
            <Activities title="New Activity" cardData={newData} />
            <Activities title="Trending Activity" cardData={trendingData} />
        </>
    );
}
