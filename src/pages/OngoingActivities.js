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
    const [ongoingActivity, setOngoingActivity] = useState([]);
    const fetchOngoingActivities = async () => {
        if (!userData?.sid) return;
        try {
            const response = await fetch(`${API_URL}activity/get-ongoing?participantId=${userData?.sid}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });

            const responseData = await response.json();
            if (responseData.status === true) {
                setOngoingActivity(responseData.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {
        if (userData?.sid) {
            fetchOngoingActivities();
        }
    },)
    return (
        <>
            <Header />
            <div className="pl-20 p-6 bg-white">
                <h1 className="text-3xl  mb-6">Ongoing Activity</h1>
                <Link href="/dashboard" className="flex items-center  mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                </Link>

                <div className="flex flex-wrap justify-start gap-6">
                    {ongoingActivity?.map((activity) => (
                        <CardStudent key={activity.id} activity={activity} />
                    ))}
                </div>
            </div>

        </>

    )
}

export default OngoingActivity