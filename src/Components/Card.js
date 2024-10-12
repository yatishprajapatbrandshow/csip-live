'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CalendarDays, Clock, ContactRound, Heart } from 'lucide-react';
import Link from 'next/link';
const Card = ({ activity }) => {
    const [isToggled, setIsToggled] = useState(false);

    const toggleHeart = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div className="bg-[#f0f0f1] rounded-2xl overflow-hidden w-72 h-96 shadow-[rgba(13,_38,_76,_0.19)_0px_0px_10px]">
            <div className="relative h-40">
                <Image
                    src={activity.image}
                    alt={activity.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <ContactRound className="w-4 h-4" />
                    <span className="text-xs font-semibold ml-1">{activity.views}</span>
                </div>
                <div className="absolute top-2 left-2 p-1">
                    <button onClick={toggleHeart}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill={isToggled ? "red" : "#fff"} stroke="red" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg></button>
                </div>
                <div className="absolute bottom-2 left-2 px-4 py-2 bg-white leading-none rounded-xl overflow-hidden shadow-[rgba(13,_38,_76,_0.19)_0px_0px_10px]">
                    <small className="">Added By:</small>
                    <Image
                        src={activity.companyImg}
                        alt={`${activity.addedBy} logo`}
                        width={80}
                        height={50}
                        className="object-cover mx-auto"
                    />
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-[15px]  mb-2">{activity.title}</h2>
                <div className="flex items-center text-sm font-gilMedium text-gray-600 mb-2 border-t border-gray-300 pt-2">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Start date: {activity.startDate}</span>
                </div>
                <div className="text-sm text-gray-900 font-gilMedium mb-2">
                    <strong>Fee:</strong> {activity.fee}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    <span className="font-normal text-xs">Apply Before: {activity.applyBefore}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    <span className="font-normal text-xs">Submission Last Date: {activity.submissionDate}</span>
                </div>
            </div>
            <div className="flex justify-between h-12 border-t font-gilMedium border-gray-300">
                <Link href="#" className="bg-purple-500 w-full text-white hover:bg-purple-600 transition-colors flex justify-center items-center">
                    View Activity
                </Link>
                <button className="bg-gray-200 w-full text-gray-800 hover:bg-gray-300 transition-colors">
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default Card;
