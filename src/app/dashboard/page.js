'use client'
import Activities from "@/Components/Activities";
import SideBar from "@/Components/Sidebar"
import Dashboard from "./Dashboard";
import Header from "@/Components/Header";
import { trendingData, favoriteData, newData, recommendedData } from "@/utils/dashboardData";
import { useEffect, useState } from "react";
import { API_URL, API_URL_LOCAL } from "@/Config/Config";
import { useSelector } from "react-redux";



export default function Home() {
    const [newActivities, setNewActivities] = useState([])
    const [recommendedActivities, setRecommendedActivities] = useState([])
    const userData = useSelector((state) => state.session.userData);
    // Fetch new activity

    const fetchNewActivities = async () => {
        try {
            const response = await fetch(`${API_URL}activity/list?limit=15&&date=true`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            console.log(responseData);
            if (responseData.status === true) {
                setNewActivities(responseData.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    // Fetch favourite activity
    const fetchRecomentedActivities = async () => {
        try {
            const APIURL = userData?.sid
                ? `${API_URL_LOCAL}recommended-activity/?participant_id=${userData?.sid}`
                : `${API_URL_LOCAL}recommended-activity`;

            const response = await fetch(`${APIURL}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });

            const responseData = await response.json();
            console.log(responseData);
            if (responseData.status === true) {
                setRecommendedActivities(responseData.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        fetchNewActivities();
        fetchRecomentedActivities();
    }, [])
    return (
        <>
            <Header session={true} />
            <div>
                <SideBar />
                <div className="pl-52">
                    <Dashboard />
                    {/* <Activities title="Favourite Activity" cardData={favoriteData} /> */}
                    <Activities title="Recommended Activity" cardData={recommendedActivities} />
                    <Activities title="New Activity" cardData={newActivities} />
                    {/* <Activities title="Trending Activity" cardData={trendingData} /> */}
                </div>
            </div>
        </>
    );
}
