'use client';

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";


const ReviewSlider = ({ reviews }) => {
    return (
        <Swiper
            modules={[Autoplay, Navigation]}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
        >
            {reviews?.map((review) => (
                <SwiperSlide key={review.id}>
                    <p className="text-sm text-purple-600 font-gilMedium">{review.text}</p>
                    <p className="text-sm text-purple-700 font-gilBold">{`- ${review.author}`}</p>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default ReviewSlider