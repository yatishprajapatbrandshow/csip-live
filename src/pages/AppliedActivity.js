"use client";
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from "lucide-react"
import Card from '../Components/CardCorporate'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { API_URL, API_URL_LOCAL } from '@/Config/Config';
import Header from '@/Components/Header';


const AppliedActivity = () => {
    const userData = useSelector((state) => state.session.userData);
    const [cardData, setCardData] = useState([])
    const fetchNewActivities = async () => {
        if (!userData?.sid) return;

        try {
            const response = await fetch(`${API_URL}activity/applied?participantId=${userData?.sid}`, {
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
                setCardData(responseData.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    useEffect(() => {

        if (userData?.sid) {
            console.log(userData);
            fetchNewActivities();
        }
    }, [userData]);

    return (
        <>
            <Header />
            <div className="pl-20 p-6 bg-white">
                <h1 className="text-3xl  mb-6">Applied Activity</h1>
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