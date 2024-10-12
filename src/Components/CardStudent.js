'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CalendarDays, Clock, ContactRound, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { applyTrigger } from '../../redux/actions/triggerSlice';
import { API_URL } from '@/Config/Config';
import { useRouter } from 'next/router';
import useRazorpay from '@/hooks/useRazorpay';
import { encrypt } from '@/utils/cryptoUtils';
import useFormattedDate from '@/hooks/useDateFormate';
import DefaultIMG from '/public/images/image-banner.jpg';
import DefaultLogo from '/public/images/images.png';
import PopUp from './PopUp';

const CardStudent = ({ activity }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.session.userData);
    const [isToggled, setIsToggled] = useState(false);
    const { initiatePayment } = useRazorpay();
    const [showPopup, setShowPopup] = useState(false);

    const toggleHeart = () => {
        setIsToggled(!isToggled);
    };

    const handleClick = (activity) => {
        const encryptedId = encrypt(activity._id);
        router.push({
            pathname: '/landing',
            query: { item: encryptedId }
        });
    };

    const handlePopUp = () => {
        setShowPopup(true);
    };


    const handleApply = async () => {
        console.log("dfvhn")
        console.log("sd", activity.activity_category);
        if (activity?.activity_category === "DIRECT") {

            if (!userData?.sid) return;
            const payload = {
                participantId: userData?.sid,
                activityId: activity?.sid
            }

            console.log(payload);
            try {
                const response = await fetch(`${API_URL}activity/apply`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: JSON.stringify(payload),
                });
                const responseData = await response.json();
                console.log(responseData);
                if (responseData.status === true) {
                    await handleCreateOrder();
                } else {
                    alert(responseData?.message)
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

    }



    const handleCreateOrder = async () => {
        console.log("Hit here1");
    
        const payload = {
            participantid: userData?.sid,
            activityid: activity?.sid,
            price: activity?.amount,
        };
    
        try {
            const response = await fetch(`${API_URL}order/create`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(payload),
            });
    
            const responseData = await response.json();
    
            if (responseData.status === true) {
                alert(responseData?.message);
    
                // Wait for initiatePayment to resolve
                const paymentData = await initiatePayment(activity.amount, responseData.orderId);
    
                if (paymentData?.razorpay_payment_id) {
                    // Get paydata once paymentData is fully resolved
                    const paydata = await GetDetails(paymentData.razorpay_payment_id);
    
                    // Handle payment creation with resolved paydata
                    await handleCreatePayment(responseData?.data, paydata);
                    
                    // Dispatch the trigger after all steps are completed
                    dispatch(applyTrigger());
                } else {
                    console.error("Error: Payment initiation failed.");
                }
            } else {
                alert(responseData?.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    const GetDetails = async (PayID) => {
        console.log(PayID)
        try {
            const response = await fetch(`/api/razorpay?PayID=${PayID}`);
            const data = await response.json();
            console.log(data);
            if (data) {
                return data
            }
        } catch (error) {
            console.error("Error fetching data from API:", error);
            return false
        }
    };


    const handleCreatePayment = async (orderData, PayData) => {
        console.log("orderData", orderData);
        const payload = {
            participantId: 287554,
            activityId: 431950,
            orderid: orderData.sid,
            trans_date: new Date.now(),
            paidAmount: PayData.amount,
            tracking_id: PayData.acquirer_data.rrn || "",
            bank_ref_no: "",
            order_status: PayData.status || "",
            failure_message: PayData.error_description || "",
            payment_mode: PayData.method || "",
            status_code: "200",
            status_message:
                PayData.status === "created" ? "Payment request initiated" :
                    PayData.status === "authorized" ? "Payment approved, pending capture." :
                        PayData.status === "captured" ? "Payment successfully processed" :
                            PayData.status === "refunded" ? "Payment reversed, refunded." :
                                PayData.status === "failed" ? "Payment attempt unsuccessful." : "",
            status: PayData.status || "",
            razorpayId: PayData.id || "",
            currency: PayData.currency || ""
        }
        try {
            const response = await fetch(`${API_URL}payment/create`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(payload),
            });
            const responseData = await response.json();

            if (responseData.status === true) {
                alert(responseData?.message)
            } else {
                alert(responseData?.message)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    return (
        <>
        {/* <button onClick={()=>GetDetails("pay_P85YWQ881JAIhJ")}>Test</button> */}
            <div className="bg-white rounded-2xl overflow-hidden w-[300px] shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 hover:scale-105">
                <div className="relative h-40 ">
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
                        />
                    }
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
                <div className="flex justify-between h-11 border-t border-gray-300">
                    <button onClick={() => handleClick(activity)} className="bg-purple-500 text-sm w-full text-white hover:bg-purple-600 transition-colors flex justify-center items-center">
                        View Activity
                    </button>
                    <button onClick={handlePopUp} className="bg-gray-200 w-full text-gray-800 text-sm hover:bg-gray-300 transition-colors">
                        Apply Now
                    </button>
                </div>
            </div>
            {showPopup && <PopUp onClose={() => setShowPopup(false)} activity={activity} onSuccess={handleApply} />}
        </>
    );
};

export default CardStudent;