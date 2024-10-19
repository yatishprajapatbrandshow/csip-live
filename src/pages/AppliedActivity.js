import { ArrowLeft } from "lucide-react"
import Link from 'next/link'
import Header from '@/Components/Header';
import { useFetchActivities } from '@/hooks/useFetchActivities';
import CardStudent from "../Components/CardStudent";
import { useRouter } from "next/router";
import { getLocalStorageItem } from "@/Config/localstorage";
import { useEffect, useState } from "react";


const AppliedActivity = () => {
    const { activities, Actloading, ActError } = useFetchActivities();
    const [isSession, setIsSession] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userData = getLocalStorageItem("userData");
        if (userData) {
            setIsSession(true);
            if (userData.type !== "Participant") {
                router.push('/')
            }
        } else {
            router.push('/')
            setIsSession(false);
        }
    }, []);

    return (
        <>
            <Header />
            <div className="pl-20 p-6 bg-white">
                <h1 className="text-3xl  mb-6">Applied Activity</h1>
                <Link href="/dashboard" className="flex items-center  mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                </Link>

                {Actloading && <p>Loading activities...</p>}
                {ActError && <p>Error: {error}</p>}

                <div className="flex flex-wrap justify-start gap-6">
                    {activities?.map((activity) => (
                        <CardStudent key={activity.id} activity={activity} />
                    ))}
                </div>
            </div>

        </>

    )
}

export default AppliedActivity