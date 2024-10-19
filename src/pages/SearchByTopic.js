"use client";
import CardCorporate from '@/Components/CardCorporate';
import { Undo2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { API_URL, API_URL_LOCAL } from '@/Config/Config';
import { useRouter } from 'next/router';
import Header from '@/Components/Header';
import CardStudent from '@/Components/CardStudent';
import { useSelector } from 'react-redux';
import { getLocalStorageItem } from '@/Config/localstorage';

function SearchTopic() {
    const [AllActivities, setAllActivities] = useState([]);
    const router = useRouter();
    const userData = useSelector((state) => state.session.userData);

    const [isSession, setIsSession] = useState(false);

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

    const fecthTopics = async (value) => {

        try {
            const response = await fetch(`${API_URL}activity/get-by-topic?topicSearch=${value}&&participant_id=${userData?.sid}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            console.log(responseData);

            if (responseData.status === true) {
                setAllActivities(responseData.data)
            }
        } catch (error) {
            // setError("Failed to fetch activities.");
        }
    }

    const onSearchChange = (e) => {
        if (e.target.value.length < 1 || e.target.value.trim() === "") {
            setAllActivities([])
            return;
        }
        fecthTopics(e.target.value);
    }

    return (
        <>
            <Header />
            <div className="pl-10 p-6 bg-white w-full h-screen ">
                <div className='flex items-center gap-2 mb-4 cursor-pointer' onClick={() => router.back()}><Undo2 className='w-5 h-5' />Go Back</div>
                <h2 className='my-10 text-4xl font-gilBold  '>
                    Search Activity From Topic
                </h2>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='topic' className='font-gilMedium text-xl '>
                        Enter Topic
                    </label>
                    <input
                        id='topic'
                        type="text"
                        onChange={onSearchChange}
                        placeholder="Search..."
                        className="w-full max-w-md p-2 border rounded-md focus:outline-none"
                    />
                </div>
                <div className='mt-10'>
                    {AllActivities.length > 0 && <h2 className='font-gilBold text-2xl mb-4'>Activity Based Result</h2>}
                    <div className='w-full h-max mt-5 flex flex-wrap justify-start gap-6'>
                        {
                            AllActivities.map((activity, index) => {
                                return (
                                    <div key={index}>
                                        <CardStudent activity={activity} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchTopic;
