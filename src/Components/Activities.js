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

const Activities = ({ cardData, title, activityData }) => {
    const { activities } = useFetchActivities();
    const showNavigation = activities?.length >= 6 && cardData?.length >= 6;
console.log(cardData)
    return (
        <>
            <section>
                <h2 className='text-3xl '>{title}</h2>
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
                                    <CardStudent activity={activity} />
                                </div>
                            ))
                        ) : null // Optionally handle the case where both arrays are empty
                    )}
                </div>
            </section >
        </>
    )
}

export default Activities