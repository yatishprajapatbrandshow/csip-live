// get-ongoing
import { ArrowLeft } from "lucide-react"
import Link from 'next/link'
import Header from '@/Components/Header';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL, API_URL_LOCAL } from "@/Config/Config";
import CardStudent from "@/Components/CardStudent";


const OngoingActivity = () => {
    const userData = useSelector((state) => state.session.userData);
    const [trendingActivity, setTrendingActivity] = useState([]);
    const fetchOngoingActivities = async () => {
        console.log(userData?.sid);
        
        if (!userData?.sid) return;
        try {
            const response = await fetch(`${API_URL}activity/get-trending?participant_id=${userData?.sid}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });
            const responseData = await response.json();
            if (responseData.status === true) {
                setTrendingActivity(responseData.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {
        if (userData?.sid) {
            fetchOngoingActivities();
        }
    }, [userData])
    return (
        <>
            <Header />
            <div className="pl-20 p-6 bg-white">
                <h1 className="text-3xl  mb-6">Trending Activity</h1>
                <Link href="/dashboard" className="flex items-center  mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                </Link>

                <div className="flex flex-wrap justify-start gap-6">
                    {trendingActivity?.map((activity) => (
                        <CardStudent key={activity.id} activity={activity} />
                    ))}
                </div>
            </div>

        </>

    )
}

export default OngoingActivity