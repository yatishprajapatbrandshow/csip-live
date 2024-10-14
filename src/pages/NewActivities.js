import { ArrowLeft } from "lucide-react"
import Link from 'next/link'
import Header from '@/Components/Header';
import { useEffect, useState } from "react";
import { API_URL } from "@/Config/Config";
import CardStudent from "@/Components/CardStudent";


const NewActivity = () => {
    const [newActivities, setNewActivities] = useState([])
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
            if (responseData.status === true) {
                setNewActivities(responseData.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {
        fetchNewActivities();
    }, [])
    return (
        <>
            <Header />
            <div className="pl-20 p-6 bg-white">
                <h2 className='my-10 text-4xl font-gilBold  '>
                    New Activity
                </h2>
                <Link href="/dashboard" className="flex items-center  mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                </Link>
                <div className="flex flex-wrap justify-start gap-6">
                    {newActivities?.map((activity) => (
                        <CardStudent activity={activity} />
                    ))}
                </div>
            </div>

        </>

    )
}

export default NewActivity