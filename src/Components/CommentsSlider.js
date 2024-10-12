'use client';

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const CommentsSlider = ({ commentsData }) => {

    const showNavigation = commentsData?.length >= 3;

    return (
        <>
            <section>
                <div className='p-6'>
                    <div className='flex justify-end items-center'>
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
                            slidesPerView={2}
                            modules={[Autoplay, Navigation]}
                            pagination={{ clickable: true }}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}>
                            {commentsData?.map(({ comment, registration }) => (
                                <SwiperSlide key={comment._id}>
                                    <div className='px-10'>
                                        <div className='bg-pattern bg-no-repeat bg-right border border-[#f1dce1] py-20 rounded-lg'>
                                            <div className='w-full flex items-center gap-5 my-auto h-full px-10 cursor-grab'>
                                                <div>
                                                    <img className='w-32' src={registration.company_logo} alt="Company logo" />
                                                </div>
                                                <div>
                                                    <h2 className='font-semibold text-lg mb-1'>{registration.company}</h2>
                                                    <div className='flex mb-2'>
                                                        {Array.from({ length: comment.rating || 5 }).map((_, index) => (
                                                            <Star key={index} className='h-6 w-6' fill='#fd931b' stroke='' />
                                                        ))}
                                                    </div>
                                                    <p className='text-sm pl-1'>{comment.comments}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CommentsSlider