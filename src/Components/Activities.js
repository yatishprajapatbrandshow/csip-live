'use client';

import React from 'react'
import Card from './Card'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Activities = ({ cardData, title }) => {
    const showNavigation = cardData?.length >= 6;
    return (
        <>
            <section>
                <div className='ml-20 p-6'>
                    <div className='flex justify-between items-center pr-12'>
                        <h2 className='text-3xl font-gilBold'>{title}</h2>
                        {showNavigation && (
                            <div className='flex space-x-2'>
                                <div className="swiper-button-prev cursor-pointer bg-purple-300 rounded-full p-2">
                                <ChevronLeft className='text-gray-600' />
                                </div>
                                <div className="swiper-button-next cursor-pointer bg-purple-300 rounded-full p-2">
                                <ChevronRight className='text-gray-600' />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-8 ">
                        <Swiper
                            slidesPerView={5}
                            modules={[Autoplay, Navigation]}
                            pagination={{ clickable: true }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            breakpoints={{
                                400: {
                                    slidesPerView: 1,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 5,
                                },
                            }}
                        >
                            {cardData?.map((activity) => (
                                <SwiperSlide key={activity.id}>
                                    <Card activity={activity} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Activities