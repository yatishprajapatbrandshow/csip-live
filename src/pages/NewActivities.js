import { ArrowLeft } from "lucide-react"
import Link from 'next/link'
import Header from '@/Components/Header';
import { useEffect, useState } from "react";
import { API_URL } from "@/Config/Config";
import CardStudent from "@/Components/CardStudent";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getLocalStorageItem } from "@/Config/localstorage";


const NewActivity = () => {
    const [newActivities, setNewActivities] = useState([])
    const userData = useSelector((state) => state.session.userData);
    const [isSession, setIsSession] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userData = getLocalStorageItem("userData");
        if (userData) {
            setIsSession(true);
            if(userData.type !== "Participant"){
                router.push('/')    
            }
        } else {
            router.push('/')
            setIsSession(false);
        }
    }, []);

    const fetchNewActivities = async () => {
        const APIURL = `${API_URL}activity/get?participantId=${userData?.sid}`
        try {
            const response = await fetch(`${APIURL}`, {
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