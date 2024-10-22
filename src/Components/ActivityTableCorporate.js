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

    console.log(activity)
    return (
        <>
        <div className='shadow-sm'>
            <h2 className='text-lg mt-5 text-gray-800 font-bold'>Tools used</h2>
            <table className="min-w-full bg-white mt-10">
                <thead>
                <tr className='bg-blue-100 '>
                    <th className="py-2 px-4">Activity Short Name</th>
                    <th className="py-2 px-4">Activity Name</th>
                    <th className="py-2 px-4">Start Date</th>
                    <th className="py-2 px-4">Fee</th>
                    <th className="py-2 px-4">Submission Last Date</th>
                    {/* <th className="py-2 px-4">Action</th> */}
                </tr>
                </thead>
                <tbody>
                {activity.map((activity) => (
                    <tr key={activity.id} className='border-b border-b-gray-100'>
                    <td className="py-2 px-4">{activity.short_name}</td>
                    <td className="py-2 px-4">
                        {activity.name}
                        {/* <img src={`https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1024px-Visual_Studio_Code_1.35_icon.svg.png`} alt={tool.name} className="h-8 w-8 object-contain" /> */}
                    </td>
                    <td className="py-2 text-sm px-4">{activity.activity_start_date}</td>
                    <td className="py-2 text-sm px-4">{activity.amount}</td>
                    <td className="py-2 text-sm px-4">{activity.submission_end_date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default CardCorporate;
