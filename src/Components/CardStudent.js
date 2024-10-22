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
import Registration from '../function/Registration';
import CreateOrder from '../function/CreateOrder';
import Razorpay from '../function/initiatePayment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AttemptActivity from '../function/AttemptActivity';
import { setOrderID, getOrderID, removeOrderID } from '../../redux/actions/orderIdSlice';
import { addFavouriteActivity, removeFavouriteActivity } from '../../redux/actions/favouriteActivitySlice';


const CardStudent = ({ activity, theme }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.session.userData);
    const [isToggled, setIsToggled] = useState(false);
    // const { initiatePayment } = useRazorpay();
    const [showPopup, setShowPopup] = useState(false);
    const OrderDet = useSelector((state) => state.orderId.orderId);
    const favouriteActivities = useSelector(
        (state) => state.favouriteActivity.favouriteActivities 
    );
    let OrderDetNew;
    


    const toggleHeart = async (activity) => {
        if (!activity) {
            return
        }
        setIsToggled(!isToggled);
        console.log(activity?.sid);

        try {
            const response = await fetch(`${API_URL}favourite-activity/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({
                    participant_id: userData?.sid,
                    activity_id: activity?.sid
                })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            console.log(responseData);
            
            if (responseData.status === true) {
                dispatch(applyTrigger())
                if (responseData.status === true) {
                    dispatch(addFavouriteActivity(activity.sid)); // Add to favorites
                } else if (responseData.status === false) {
                    dispatch(removeFavouriteActivity(activity.sid)); // Remove from favorites
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClick = (activity) => {
        const formattedName = activity.short_name.replace(/\s+/g, '-').toLowerCase();
        router.push({
            pathname: formattedName,
            query: { item: activity._id }
        });

    };

    const handlePopUp = () => {
        setShowPopup(true);
    };

    const handleApply = async () => {
        try {
            const register = await Registration(activity, userData)
            console.log(register)
            
            if (register && register.status) {
                console.log("step 1")
                OrderCreate()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const OrderCreate = async () => {
        
        try {
            const order = await CreateOrder(activity, userData)
            if (order && order.status) {
                console.log("step 2", order)
                OrderDetNew = order?.data.sid;
                dispatch(setOrderID(order?.data));
                initiatePayment()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const initiatePayment = async () => {
        console.log(OrderDetNew);
        try {
            const Payment = await Razorpay(activity, userData)
            if (Payment) {
                console.log("step 3")
                GetDetails("pay_P8osHZXRb09Oy8")
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Wait for initiatePayment to resolve
    // const paymentData = await initiatePayment(activity.amount, responseData.orderId);
    // const paydata = await GetDetails(paymentData.razorpay_payment_id);
    // await handleCreatePayment(responseData?.data, paydata);
    // dispatch(applyTrigger());

   
    const GetDetails = async (Payment) => {

        try {
            const response = await fetch(`/api/razorpay?PayID=${Payment}`);
            const data = await response.json();
            if (data) {
                console.log("step 4")
                handleCreatePayment(data);
            }
        } catch (error) {
            console.error("Error fetching data from API:", error);
            return false
        }
    };

    const handleCreatePayment = async (PayData) => {
        console.log(OrderDetNew);
        const payload = {
            participantId: userData?.sid,
            activityId: activity?.sid,
            orderid: OrderDetNew,
            trans_date: Date.now(),
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
            console.log(responseData)
            console.log("step 5")
            if (responseData.status === true) {
                alert(responseData?.message)
                dispatch(applyTrigger())
                setShowPopup(false)
            } else {
                alert(responseData?.message)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }



    const Ataimpt = async () => {
        const loadingToastId = toast.loading("Loading...");
        try {
            
            const response = await AttemptActivity(activity, userData);
            
            console.log(activity.sid)
            if (response.message === "Study created successfully." || response.message === "Already Studying this Activity") {
                toast.update(loadingToastId, {
                    render: "Proceeding to next steps!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
                router.push({
                    pathname: '/activity',
                    query: { item: activity.sid }
                });
            }else{
                throw new Error("else hit")
            }
        } catch (error) {
            console.log("Error fetching data from API:", error);
            toast.update(loadingToastId, {
                render: "Something went wrong, please try again",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };





    return (
        <>
            <div className="bg-white rounded-2xl overflow-hidden w-[300px] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 hover:scale-105">
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
                        <button onClick={() => toggleHeart(activity)}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill={favouriteActivities.includes(activity?.sid) ? "red" : "#fff"} stroke="red" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg></button>
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
                    {
                        activity?.paymentStatus === "pending" && activity?.status === 'Active' ? (
                            <button className="bg-gray-200 w-full text-gray-800 text-sm hover:bg-gray-300 transition-colors"
                                onClick={() => { OrderDetNew = activity.orderId, initiatePayment() }}
                            >
                                Pay Now
                            </button>
                        ) : activity?.paymentStatus === "success" && activity?.activityProgress === 'Paid' ? (
                            <button 
                                onClick={()=> Ataimpt()}
                                className="bg-gray-200 w-full text-gray-800 text-sm hover:bg-gray-300 transition-colors">
                                Attempt
                            </button>
                        ) : (
                            <button className="bg-gray-200 w-full text-gray-800 text-sm hover:bg-gray-300 transition-colors" onClick={handlePopUp}>
                                Apply Now
                            </button>
                        )
                    }
                </div>
            </div>
            {showPopup && <PopUp onClose={() => { setShowPopup(false) }} activity={activity} onSuccess={handleApply} />}
            <ToastContainer position="top-right" autoClose={1000} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
};

export default CardStudent;

