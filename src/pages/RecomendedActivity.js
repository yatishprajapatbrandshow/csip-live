"use client";
import React, { useEffect, useState } from 'react'
import { ArrowLeft } from "lucide-react"
import Card from '../Components/CardCorporate'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { API_URL_LOCAL } from '@/Config/Config';
import Header from '@/Components/Header';

const RecommendedActivity = () => {
    const userData = useSelector((state) => state.session.userData);
    const [cardData, setCardData] = useState([])
    // Fetch favourite activity

    const fetchRecomentedActivities = async () => {
        try {
            const APIURL = userData?.sid
                ? `${API_URL_LOCAL}recommended-activity/?participant_id=${userData?.sid}`
                : `${API_URL_LOCAL}recommended-activity`;
            console.log(APIURL);

            const response = await fetch(`${APIURL}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });

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
            fetchRecomentedActivities();
        }
    }, [userData]);

    return (
        <>
            <Header />
            <div className="pl-20 p-6 bg-white">
                <h1 className="text-3xl  mb-6">Recommended Activity</h1>
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

export default RecommendedActivity