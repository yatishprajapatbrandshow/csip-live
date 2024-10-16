'use client';

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const CommentsSlider = ({ data }) => {

    

    return (
        <>
            <section>
                <p className='text-2xl font-bold'> this page for {data}</p>
            </section>
        </>
    )
}

export default CommentsSlider