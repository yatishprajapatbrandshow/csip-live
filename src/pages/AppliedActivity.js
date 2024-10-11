import { ArrowLeft } from "lucide-react"
import Link from 'next/link'
import Header from '@/Components/Header';
import { useFetchActivities } from '@/hooks/useFetchActivities';
import CardCorporate from "../Components/CardCorporate";


const AppliedActivity = () => {
    const { activities, loading, error } = useFetchActivities();

    return (
        <>
            <Header />
            <div className="pl-20 p-6 bg-white">
                <h1 className="text-3xl  mb-6">Applied Activity</h1>
                <Link href="/dashboard" className="flex items-center font-gilSemiBold mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                </Link>

                {loading && <p>Loading activities...</p>}
                {error && <p>Error: {error}</p>}

                <div className="flex flex-wrap justify-start gap-6">
                    {activities?.map((activity) => (
                        <CardCorporate key={activity.id} activity={activity} />
                    ))}
                </div>
            </div>

        </>

    )
}

export default AppliedActivity