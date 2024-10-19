'use client';

import React, { useState, useEffect } from 'react';
import { CircularProgressBar } from "@/Components/CircularProgressBar";
import ReviewSlider from "@/Components/ReviewSlider";
import TopicModal from '@/Components/TopicModal';
import { SquareX, Star } from 'lucide-react';
import Activities from "@/Components/Activities";
import { API_URL, API_URL_LOCAL } from "@/Config/Config";
import { useSelector } from "react-redux";
import Header from '@/Components/Header';
import ActivityHeader from '@/Components/ActivityHeader';
import { decrypt } from '@/utils/cryptoUtils';
import { useRouter } from 'next/router';
import { setLocalStorageItem } from '@/Config/localstorage';





export default function DashboardCombind() {
    const router = useRouter();

    const isTriggeredApply = useSelector((state) => state.trigger.applyTrigger);
    const userData = useSelector((state) => state.session.userData);
    const [ActivityList, setActivityList] = useState("inProcess");

    useEffect(() => {
        if (router.query.item) {
            const decryptedItem = decrypt(router.query.item);
            if (decryptedItem) {
                FetchActivityDetails(decryptedItem);
            }
        }
    }, [router.query]);


    const FetchActivityDetails = async (decryptedItem) => {
        const datatoSend = {
            activityid: Number(decryptedItem),
            requestedSteps: [],
            type: "menu"
        }
        console.log(datatoSend)
        const APIURL = `${API_URL}activity-progress`

        try {
            const response = await fetch(APIURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datatoSend)
            })
            const data = await response.json();
            console.log(data);
            if (data.status === true) {
                setActivityList(data.data)
                setLocalStorageItem('AttemptActivity', data.data);
            } else {
                setActivityList(false)
            }
        } catch (error) {
            console.log("Error fetching activity details:", error);
        }
    }
    return (
        <>
            <div className="relative max-w-[1500px] mx-auto w-full">

                <ActivityHeader data={ActivityList} />

                <div class="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8 lg:ml-72 xl:ml-80">
                    <main class="flex-auto mb-10">
                        <div className="container mx-auto px-4 py-8">
                            <h1 className="text-3xl font-bold mb-4">Welcome to the Activity Page</h1>
                            <p className="text-lg mb-6">
                                This is a <strong>test page</strong> where you can explore various interactive elements related to our platform's activities.
                            </p>

                            <h2 className="text-2xl font-semibold mb-4">What You Can Do Here:</h2>
                            <ul className="list-disc list-inside mb-6">
                                <li><strong>Objective</strong>: Understand the primary goals and targets.</li>
                                <li><strong>Virtual Scenario</strong>: Experience real-world simulations in a virtual setup.</li>
                                <li><strong>Hierarchy</strong>: Visualize the structure and roles.</li>
                                <li><strong>Tools</strong>: Discover the tools we offer for enhanced productivity.</li>
                                <li><strong>Jobs and Roles</strong>: Learn about different roles and responsibilities.</li>
                                <li><strong>Podcast Link</strong>: Watch or listen to podcasts relevant to the topic.</li>
                                <li><strong>Related News & Links</strong>: Stay updated with news and resources.</li>
                                <li><strong>MCQ</strong>: Test your knowledge with quizzes and multiple-choice questions.</li>
                            </ul>

                        </div>
                    </main>

                </div>

            </div>
        </>
    );
}
