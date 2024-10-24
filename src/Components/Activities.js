'use client';

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CardStudent from './CardStudent';
import CardCorporate from './CardCorporate';
import { useFetchActivities } from '@/hooks/useFetchActivities';

const Activities = ({ cardData, title, activityData, type, bgDesign, theme }) => {
    const { activities } = useFetchActivities();


    const showNavigation = activities?.length >= 6 && cardData?.length >= 6;

    return (
        <>
        {theme === "black" ? <>
            <section className="">
                <div className=''>
                    <h2 className='text-3xl font-bold text-white'>{title}</h2>
                    <div className='p-6 px-0 flex flex-wrap gap-5'>
                        {activityData && Array.isArray(activities) && activities.length ? (
                            activities.map((activityItem) => (
                                <div className='w-max'>
                                    <CardCorporate key={activityItem.id} activity={activityItem} />
                                </div>
                            ))
                        ) : (
                            Array.isArray(cardData) && cardData.length ? (
                                cardData.map((activity) => (
                                    <div className='w-max'>
                                        <CardStudent theme={"black"} activity={activity} />
                                    </div>
                                ))
                            ) : null // Optionally handle the case where both arrays are empty
                        )}
                    </div>
                </div>
            </section>
        </>: 
        <>
        <section className={`${bgDesign === "Full" ? "bg-BGRec bg-[length:40px_40px]" : "bg-pattern bg-no-repeat bg-[length:400px_400px] bg-right"}`}>
            <div className='bg-white/50'>
                <h2 className='text-3xl font-bold '>{title}</h2>
                <div className='p-6 px-0 flex flex-wrap gap-5'>
                    {activityData && Array.isArray(activities) && activities.length ? (
                        activities.map((activityItem) => (
                            <div className='w-max'>
                                <CardCorporate key={activityItem.id} activity={activityItem} />
                            </div>
                        ))
                    ) : (
                        Array.isArray(cardData) && cardData.length ? (
                            cardData.map((activity) => (
                                <div className='w-max'>
                                    <CardStudent activity={activity} type={type} />
                                </div>
                            ))
                        ) : null // Optionally handle the case where both arrays are empty
                    )}
                </div>
            </div>
        </section>
        </>}
        </>
    )
}

export default Activities