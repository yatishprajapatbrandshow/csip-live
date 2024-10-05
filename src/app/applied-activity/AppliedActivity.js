import React from 'react'
import { ArrowLeft } from "lucide-react"
import Card from '@/Components/Card'
import Link from 'next/link'


const cardData = [
    {
        id: 1,
        title: "Exploring Team Dynamics",
        image: "/images/analysis.jpg",
        addedBy: "bs",
        companyImg: "/images/brandShow.png",
        startDate: "26 August - 2023",
        fee: "180.00/-",
        applyBefore: "30th Sep 2025",
        submissionDate: "31st Oct 2025",
        views: 40,
    },
    {
        id: 2,
        title: "Time Management Principles",
        image: "/images/time-management.jpg",
        addedBy: "tcs",
        companyImg: "/images/tcs.jpg",
        startDate: "8 August - 2023",
        fee: "91.00/-",
        applyBefore: "29th Sep 2025",
        submissionDate: "29th Sep 2025",
        views: 2,
    },
    {
        id: 3,
        title: "Financial Accounting Enhancement",
        image: "/images/finance.png",
        addedBy: "harvard",
        companyImg: "/images/tcs.jpg",
        startDate: "14 August - 2023",
        fee: "189.00/-",
        applyBefore: "31st Aug 2025",
        submissionDate: "10th Sep 2025",
        views: 45,
    },
    {
        id: 4,
        title: "Leadership Styles Assessment",
        image: "/images/leadership.jpg",
        addedBy: "tcs",
        companyImg: "/images/tcs.jpg",
        startDate: "8 August - 2025",
        fee: "91.00/-",
        applyBefore: "29th Aug 2024",
        submissionDate: "29th Aug 2024",
        views: 2,
    },
    {
        id: 5,
        title: "Productivity Tools and Techniques",
        image: "/images/productivity.jpg",
        addedBy: "tcs",
        companyImg: "/images/tcs.jpg",
        startDate: "8 August - 2023",
        fee: "91.00/-",
        applyBefore: "29th Sep 2025",
        submissionDate: "31st Aug 2025",
        views: 50,
    },
    {
        id: 7,
        title: "Productivity and Techniques",
        image: "/images/analysis.jpg",
        addedBy: "tcs",
        companyImg: "/images/tcs.jpg",
        startDate: "8 August - 2023",
        fee: "91.00/-",
        applyBefore: "29th Sep 2025",
        submissionDate: "31st Aug 2025",
        views: 50,
    },
]


const AppliedActivity = () => {
    return (
        <>
            <div className="pl-20 p-6 bg-white">
                <h1 className="text-3xl font-gilBold mb-6">Applied Activity</h1>
                <Link href="/dashboard" className="flex items-center font-gilSemiBold mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                </Link>
                <div className="flex flex-wrap justify-start gap-6">
                    {cardData?.map((activity) => (
                        <Card key={activity.id} activity={activity} />
                    ))}
                </div>
            </div>

        </>

    )
}

export default AppliedActivity