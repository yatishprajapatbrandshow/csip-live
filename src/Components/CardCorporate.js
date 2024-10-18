'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CalendarDays, Clock, ContactRound, Heart } from 'lucide-react';
import { useRouter } from 'next/router';
import useFormattedDate from '@/hooks/useDateFormate';
import DefaultIMG from '/public/images/image-banner.jpg';
import DefaultLogo from '/public/images/images.png';
import { encrypt } from '@/utils/cryptoUtils';
const CardCorporate = ({ activity }) => {

    const router = useRouter();
    const [isToggled, setIsToggled] = useState(false);

    const toggleHeart = () => {
        setIsToggled(!isToggled);
    };

    const handleClick = () => {
        const encryptedId = encrypt(activity._id);
        router.push({
            pathname: 'Edit',
            query: { item: encryptedId }
        });
    };
    return (
        <div className="bg-white rounded-2xl overflow-hidden w-[300px] shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 hover:scale-105">
            <div className="relative h-40">
                {activity.image_assc ?
                    <Image
                        src={`https://csip.fieindia.org/images/activity/${activity.image_assc}`}
                        alt={activity.title}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full object-cover"
                    />
                    :
                    <Image
                        src={DefaultIMG}
                        alt={activity.title}
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full object-cover"
                    />}
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                    <ContactRound className="w-4 h-4" />
                    <span className="text-xs font-semibold ml-1">{activity?.views}</span>
                </div>
                <div className="absolute top-2 left-2 p-1">
                    <button onClick={toggleHeart}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill={isToggled ? "red" : "#fff"} stroke="red" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg></button>
                </div>
                <div className="absolute -bottom-4 left-2 bg-white rounded-lg shadow-lg">
                    <small className="p-2 border-b border-b-gray-200">Added By:</small>
                    {activity.companyImg ?
                        <Image
                            src={activity.companyImg}
                            alt={`${activity.addedBy} logo`}
                            width={80}
                            height={50}
                            className="object-cover mx-auto"
                        />
                        :
                        <Image
                            src={DefaultLogo}
                            alt={`${activity.addedBy} logo`}
                            width={80}
                            height={40}
                            className="object-cover mx-auto w-28 h-14 p-2"
                        />
                    }
                </div>
            </div>
            <div className="p-4 pb-2 pt-8 border-t border-gray-50">
                <h2 className="text-sm pb-1 mb-1 border-b border-gray-200">{activity.short_name}</h2>
                <div>
                    <p className='text-sm font-light '><span className='font-medium mr-2'>Start date:</span> {useFormattedDate(activity.activity_start_date, 1)}</p>
                    <p className='text-sm font-light '><span className='font-medium mr-2'>Fee:</span> {activity.amount}</p>
                    <p className='text-sm font-light '><span className='font-medium mr-2'>Activity Staus :</span> {activity.activityStatus}</p>
                    <div className="flex items-center text-sm text-gray-600 mb-2 mt-2">
                        <CalendarDays className="w-4 h-4 mr-1" />
                        <span className="font-normal text-xs">Apply Before: {useFormattedDate(activity.activity_end_date, 1)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                        <CalendarDays className="w-4 h-4 mr-1" />
                        <span className="font-normal text-xs">Submission Last Date: {useFormattedDate(activity.submission_end_date, 1)}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between h-12 border-t font-gilMedium border-gray-300">
                <button className="bg-purple-500 w-full text-white hover:bg-purple-600 transition-colors flex justify-center items-center">
                    View
                </button>
                <button onClick={handleClick} className="bg-gray-200 w-full text-gray-800 hover:bg-gray-300 transition-colors">
                   Edit
                </button>
            </div>
        </div>
    );
};

export default CardCorporate;
