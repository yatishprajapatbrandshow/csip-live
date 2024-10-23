'use client';

import React, { useState, useEffect } from 'react';
import { CircularProgressBar } from "@/Components/CircularProgressBar";
import ReviewSlider from "@/Components/ReviewSlider";
import TopicModal from '@/Components/TopicModal';
import { SquareX, Star } from 'lucide-react';
import Activities from "@/Components/Activities";
import { API_URL, API_URL_LOCAL } from "@/Config/Config";
import { useDispatch, useSelector } from "react-redux";
import Header from '@/Components/Header';
import { useCountUp } from '@/hooks/useCountUp';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentsSlider from '@/Components/CommentsSlider';
import { useFetchActivities } from '@/hooks/useFetchActivities';
import { storeFavouriteActivity } from '../../redux/actions/favouriteActivitySlice';
import DragAndDropTopic from '../Components/DragAndDrop';
import RecordonDashboard from '../Components/RecordonDashbord';
import { getLocalStorageItem } from '@/Config/localstorage';
import PatterImage from '../../public/images/pattern.svg'
import Footer from '@/Components/Footer';


const reviews = [
    {
        id: 1,
        text: "This is a great place to work!",
        author: "John Doe"
    },
    {
        id: 2,
        text: "I had an amazing experience with the team.",
        author: "Jane Smith"
    },
    {
        id: 3,
        text: "The corporate culture is really supportive.",
        author: "Alice Johnson"
    },
    {
        id: 4,
        text: "Great opportunities for growth and learning.",
        author: "Bob Brown"
    },
];

const featureData = [
    {
      title: "First feature",
      description: "Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.",
      image: "https://cdn-icons-png.flaticon.com/512/4341/4341139.png",
      link: "#"
    },
    {
      title: "Second feature",
      description: "Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.",
      image: "https://cdn-icons-png.flaticon.com/512/4341/4341134.png",
      link: "#"
    },
    {
      title: "Third feature",
      description: "Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.",
      image: "https://cdn-icons-png.flaticon.com/512/4341/4341160.png",
      link: "#"
    },
    {
      title: "More features",
      description: "Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.",
      image: "https://cdn-icons-png.flaticon.com/512/4341/4341025.png",
      link: "#"
    }
  ];
  


export default function DashboardCombind() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newActivities, setNewActivities] = useState([])
    const [recommendedActivities, setRecommendedActivities] = useState([])
    const [favActivities, setfavActivities] = useState([])
    // const [topicData, setTopicData] = useState([]);
    const [dashboardData, setDashboardData] = useState([]);
    const [commentsData, setCommentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ProfileStatus, setProfileStatus] = useState("");
    const [ActivityCurriculumStatus, setActivityCurriculumStatus] = useState("");
    const [collegeData, setCollegeData] = useState("");

    const dispatch = useDispatch();
    const isTriggeredApply = useSelector((state) => state.trigger.applyTrigger);
    const userData = useSelector((state) => state.session.userData);
    // const openModal = () => setIsModalOpen(true);
    // const closeModal = () => setIsModalOpen(false);
    const { activities, Actloading, ActError } = useFetchActivities();

    const topicStudyingCount = useCountUp(dashboardData?.topicStudying?.length || 0);
    const activityAppliedCount = useCountUp(dashboardData?.activityApplied?.length || 0);
    const ongoingActivitiesCount = useCountUp(dashboardData?.ongoingActivities?.length || 0);
    const submissionPendingCount = useCountUp(dashboardData?.submissionPending?.length || 0);
    const paymentPendingCount = useCountUp(dashboardData?.paymentPending?.length || 0);
    const completedActivitiesCount = useCountUp(dashboardData?.completedActivities?.length || 0);
    const totalScoreCount = useCountUp(dashboardData?.totalScore || 0); // Assuming totalScore is a number
    const ProfileStatusCount = useCountUp(ProfileStatus?.profilePercentage || 0); // Assuming totalScore is a number
    const ActivityCurriculumStatusCount = useCountUp(ActivityCurriculumStatus?.percentage || 0); // Assuming totalScore is a number
    const [isSession, setIsSession] = useState(false);


    const stats = [
        { label: 'Topic Studying', count: topicStudyingCount },
        { label: 'Activity Applied', count: activityAppliedCount, link: "/AppliedActivity" },
        { label: 'Ongoing Activity', count: ongoingActivitiesCount, link: "/OngoingActivities" },
        { label: 'Submission Pending', count: submissionPendingCount },
        { label: 'Payment Pending', count: paymentPendingCount, link: "/PaymentPending" },
        { label: 'Completed Activity', count: completedActivitiesCount, },
        { label: 'Total Score', count: totalScoreCount, },
        { label: 'Skill Endorsement from Corporate', count: 0, },
        { label: 'Leaderboard is Being Evaluated...', count: null, },
    ];



    useEffect(() => {
        const userData = getLocalStorageItem("userData");
        if (userData) {
            setIsSession(true);
            if(userData.type !== "Participant"){
                router.push('/')    
            }
        } else {
            router.push('/')
            setIsSession(false);
        }
    }, []);

    


    const fetchDashboardData = async () => {
        if (!userData?.sid) return;
        try {
            const response = await fetch(`${API_URL}dashboardInfo?participant_id=${userData?.sid}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            if (responseData.status === true) {
                setDashboardData(responseData?.data)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const fetchNewActivities = async (sid) => {
        const APIURL = `${API_URL}activity/get?participantId=${sid}`
        console.log("responsexvcfvbData", APIURL)
        try {
            const response = await fetch(APIURL, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            
            if (responseData.status === true) {
                setNewActivities(responseData.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const fetchRecommenedActivities = async () => {
        try {
            const APIURL = userData?.sid
                ? `${API_URL}recommended-activity/?participant_id=${userData?.sid}`
                : `${API_URL}recommended-activity`;

            const response = await fetch(`${APIURL}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });

            const responseData = await response.json();
            if (responseData.status === true) {
                setRecommendedActivities(responseData.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const fetchFavoriteActivity = async () => {
        try {
            const APIURL = `${API_URL}favourite-activity/?participant_id=${userData?.sid}`

            const response = await fetch(`${APIURL}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });

            const responseData = await response.json();
            if (responseData.status === true) {
                setfavActivities(responseData.data);
                const ids = responseData.data.map(ele => ele?.sid);
                dispatch(storeFavouriteActivity(ids));
            }
        } catch (error) {
            console.error("Error:", error);
            dispatch(storeFavouriteActivity([]));
            setfavActivities([])
        }
    }


    // const handleRemoveTopic = async (topicId) => {

    //     const datatSend = {
    //         participant_id: userData?.sid,
    //         TopicsList: [`${topicId}`],
    //     }
    //     const APIURL = `${API_URL}topic/remove`

    //     try {
    //         const response = await fetch(APIURL, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(datatSend),
    //         });

    //         const responseData = await response.json()

    //         if (responseData.status === true) {
    //             alert("topics removed successfully")
    //             fetchTopicData();
    //         } else {
    //             alert("Something went wrong, please try again")
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         toast.error('An error occurred while removing the topic.');
    //     }
    // };

    const fetchCommentsData = async () => {
        const participantId = userData?.sid;

        try {
            const response = await fetch(`${API_URL}comments?participant_id=${participantId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            if (responseData.status === true) {
                setCommentsData(responseData.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (userData?.sid) {
            fetchDashboardData();
            fetchNewActivities(userData?.sid);
            fetchRecommenedActivities();
            fetchFavoriteActivity();
            fetchCommentsData();
            fetchProfileStatus();
            fetchActivityCurriculumStatus();
            fetchCollegeData();
        }
    }, [userData]);

    useEffect(() => {
        fetchDashboardData();
        fetchNewActivities(userData?.sid);
        fetchRecommenedActivities();
        fetchFavoriteActivity();
    }, [isTriggeredApply])

    const getRandomWidth = () => {
        const widths = ['w-28', 'w-32', 'w-36', 'w-40', 'w-44', 'w-48', 'w-52', 'w-56', 'w-60'];
        const randomIndex = Math.floor(Math.random() * widths.length);
        return widths[randomIndex];
    };

    const showToast = (message, type) => {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        }
    };


    const fetchProfileStatus = async () => {
        const participantId = userData?.sid;

        try {
            const response = await fetch(`${API_URL}register/get?participant_id=${participantId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            if (responseData.status === true) {
                setProfileStatus(responseData.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }


    const fetchActivityCurriculumStatus = async () => {
        const participantId = userData?.sid;

        try {
            const response = await fetch(`${API_URL}dashboardInfo/getActivity-curriculum?participant_id=${participantId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            
            if (responseData.status === true) {
                setActivityCurriculumStatus(responseData?.data?.percentage);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }


    const fetchCollegeData = async () => {
        const participantId = userData?.sid;
 
        try {
            const response = await fetch(`${API_URL}college/get-by-participant-id?participant_id=${participantId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
 
            const responseData = await response.json();
 
            if (responseData.status === true) {
                setCollegeData(responseData?.data?.college)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }



    return (
        <>
            <Header />
            {/* <Dashboard /> */}
            <div className="relative max-w-[1500px] mx-auto w-full">
                <div className="p-6 bg-white space-y-6 font-sans">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="bg-pink-200 p-4 col-span-4 max-lg:col-span-8 max-md:col-span-12 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <div className="flex items-center justify-between hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <div>
                                    <h2 className="text-3xl  text-purple-800">{useCountUp(ProfileStatus?.profilePercentage || 0)}<sup className="text-[17px]">%</sup></h2>
                                    <p className="text-purple-600 ">Transformed!</p>
                                    <p className="text-sm text-purple-500 font-gilMedium">You've successfully mimicked a new form!</p>
                                </div>
                                <img
                                    src="/images/congratulation-img.png"
                                    alt="Ditto transformation"
                                    width={150}
                                    height={150}
                                    className="w-60"
                                />
                            </div>
                        </div>
                        {/* <div className="bg-purple-200 col-span-2 max-lg:col-span-4 p-4 rounded-lg hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <h3 className="text-lg  text-purple-800 mb-2">Activity Progress Chart</h3>
                            <div className="flex justify-center hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <CircularProgressBar value={90} text="90%" color="text-pink-500" />
                            </div>
                        </div> */}
                         <div className="bg-purple-200 col-span-2 max-lg:col-span-4 p-4 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <h3 className="text-lg  text-purple-800 mb-2">Profile Status</h3>
                                <div className="flex justify-center hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                    {ProfileStatus ?
                                        <CircularProgressBar value={ProfileStatusCount} text={`${ProfileStatusCount}%`} color="text-pink-500" />
                                        : null}
                                </div>
                                <p className="text-center text-sm text-purple-600 mt-2">Completed</p>
                            </div>
                        <div className="bg-blue-200 col-span-2 max-lg:col-span-4 p-4 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <h3 className="text-lg  text-purple-800 mb-2">Corporate Reviews</h3>
                            <ReviewSlider reviews={reviews} />
                        </div>
                        <div className="bg-white relative border border-red-100 col-span-2 shadow-lg max-lg:col-span-4 p-4 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <img src={`/images/pattern.svg`} className='w-40 h-40 absolute right-0 bottom-0' alt='backgrund pattern' />
                            <div className='relative z-10'>
                                <h3 className="text-lg text-purple-800 mb-2">Points Earned</h3>
                                <div className="flex justify-center hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                    <CircularProgressBar value={62} text="62" color="text-pink-500" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white relative border border-red-100 col-span-2 shadow-lg max-lg:col-span-4 p-4 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <img src={`/images/pattern.svg`} className='w-40 h-40 absolute right-0 bottom-0' alt='backgrund pattern' />
                            <div className='relative z-10'>
                                <h3 className="text-lg  text-purple-800 mb-2">Activity/Curriculum</h3>
                                <div className="flex justify-center hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                    <CircularProgressBar value={ActivityCurriculumStatusCount} text={`${ActivityCurriculumStatusCount}%`} color="text-pink-500" />
                                </div>
                                <p className="text-center text-sm text-purple-600 mt-2">Completed</p>
                            </div>
                        </div>
                        {/* <div className="bg-pink-200 col-span-2 max-lg:col-span-4 p-4 rounded-lg hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <h3 className="text-lg  text-purple-800 mb-2">Corporate Skill Endorsement</h3>
                            <p className="text-sm text-purple-600 font-gilMedium">No Data to Generate Report</p>
                        </div> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-rose-100 space-y-2 transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <div className='p-4  bg-rose-50'>
                                <div className=''>
                                    <p className='text-lg font-bold mb-2 text-gray-800'>College Details:</p>
                                    <div className='flex gap-5'>
                                        <img src="https://csip.fieindia.org/images/college-logo/logo-1-5c41a849a2339.jpg" 
                                        className='w-16 h-16 rounded-lg' />
                                        <div className='flex-1'>
                                        <p className='text-sm font-bold leading-4 text-gray-700'>{collegeData?.collegename}</p>
                                        <span className='text-sm flex justify-start text-gray-700 gap-1 mt-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg> {collegeData?.state}, {collegeData?.city}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='p-4 pt-2 grid grid-cols-2 gap-4'>
                                <button onClick={() => router.push('/curriculum')} className="text-sm hardShadow flex justify-center items-center text-gray-700 bg-white/30 p-2 border border-rose-300 ">View Curriculum</button>
                                <button onClick={() => router.push('/Report')}  className="text-sm hardShadow flex justify-center items-center text-gray-700 bg-white/30 p-2 border border-rose-300">View Report</button>
                            </div>
                        </div>
                        <div className="bg-[#dfccfa] p-4 col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4  transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    onClick={()=> stat.link ? router.push(stat.link) : null }
                                    className={`flex bg-purple-100 items-center hardShadow2 gap-2 border border-purple-300 p-1 transition-transform duration-200 ease-in transform hover:translate-y-0.5 ${
                                        stat.link ? 'cursor-pointer' : ''
                                    }`}
                                >
                                    <div className="text-2xl bg-purple-200 w-10 h-10 flex justify-center items-center font-bold text-purple-800">
                                        {stat.count !== null ? stat.count : '-'}
                                    </div>
                                    <p className="text-sm text-gray-800">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    


                    <div className="grid grid-cols-5 gap-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 col-span-2 h-max">
                            {/* <div className="bg-purple-100 p-4 rounded-lg hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <h3 className="text-lg  text-purple-800 mb-2">Profile Status</h3>
                                <div className="flex justify-center hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                    {ProfileStatus ?
                                        <CircularProgressBar value={ProfileStatusCount} text={`${ProfileStatusCount}%`} color="text-pink-500" />
                                        : null}
                                </div>
                                <p className="text-center text-sm text-purple-600 mt-2">Completed</p>
                            </div> */}
                            {/* <div className="bg-purple-100 p-4 rounded-lg hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <h3 className="text-lg  text-purple-800 mb-2">Activity/Curriculum</h3>
                                <div className="flex justify-center hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                    <CircularProgressBar value={ActivityCurriculumStatusCount} text={`${ActivityCurriculumStatusCount}%`} color="text-pink-500" />
                                </div>
                                <p className="text-center text-sm text-purple-600 mt-2">Completed</p>
                            </div> */}
                            {/* <div className="bg-purple-100 p-4 rounded-lg hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <h3 className="text-lg  text-purple-800 mb-2">Score</h3>
                                <div className="flex justify-center hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                    <CircularProgressBar value={85} text="85%" color="text-pink-500" />
                                </div>
                                <p className="text-center text-sm text-purple-600 mt-2">Points Earned</p>
                            </div> */}
                        </div>

                        {/* <div className="bg-pink-100 p-4 rounded-lg col-span-3 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <h3 className="text-lg  text-purple-800 mb-2">📚 Topics:</h3>
                            <div className="flex flex-wrap gap-2">
                                <ul className="flex flex-wrap gap-2">
                                    {loading ? (
                                        Array.from({ length: 25 }).map((_, index) => (
                                            <li key={index} className={`h-6 rounded-full animate-pulse bg-purple-300 ${getRandomWidth()}`} />
                                        ))
                                    ) : topicData?.length === 0 ? (
                                        <li className="text-purple-800">No topics found</li>
                                    ) : (
                                        topicData.map((topic, index) => (
                                            <li key={index} className="bg-purple-200 text-purple-800 px-2 py-1 rounded flex items-center gap-1  text-[15px] hover:drop-shadow-md">
                                                {topic?.topic}
                                                <SquareX onClick={() => handleRemoveTopic(topic.sid)} className="cursor-pointer hover:text-purple-700 text-purple-500 w-5 h-5" />
                                            </li>
                                        ))
                                    )}
                                </ul>
                                <button onClick={openModal} className="bg-green-400 text-white px-2 py-1 rounded">Add New Topic</button>
                            </div>
                        </div> */}
                        {/* <TopicModal isOpen={isModalOpen} onClose={closeModal} fetchTopicData={fetchTopicData} fetchDashboardData={fetchDashboardData} showToast={showToast} /> */}
                    </div>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-9'>
                            <DragAndDropTopic />
                        </div>
                        <div className='col-span-3 flex flex-col gap-5'>
                            <RecordonDashboard />
                            <RecordonDashboard />
                        </div>
                        
                    </div>
                    <ToastContainer position="top-right" autoClose={1000} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                </div>
                {/* <CommentsSlider commentsData={commentsData} /> */}
                {/* {activities ?
                    <Activities title="Applied Activity" cardData={activities} />
                    : null} */}
                    

                
            </div>
            
            <div className="">
                <div className="relative max-w-[1500px] mx-auto w-full pt-10">
                    {favActivities && Array.isArray(favActivities) && favActivities.length > 0 ?
                        <Activities title="Favourite Activity" type={"favourite"} cardData={favActivities} />
                    : null}

                    {recommendedActivities && Array.isArray(recommendedActivities) && recommendedActivities.length > 0 ?
                        <div className='bg-white rounded-xl'>
                            <Activities title="Recommended Activity" cardData={recommendedActivities} />
                        </div>
                    : null}
                 
                </div>
                <div className="relative max-w-[1500px] mx-auto w-full pt-10 mb-10">
                    {newActivities && Array.isArray(newActivities) && newActivities.length > 0 ?
                        <div className='bg-white rounded-xl'>
                            <Activities title="New Activity" cardData={newActivities}  />
                        </div>
                    : null}
                </div>
                <div className=" bg-gray-100 p-10">
                    <div className="relative max-w-[1500px] bg-gray-100 mx-auto w-full">
                        <div className="grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
                            {featureData.map((feature, index) => (
                                <div
                                key={index}
                                className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10"
                                >
                                    <div className="relative space-y-8 py-12 p-8">
                                        <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-12"
                                        width="512"
                                        height="512"
                                        />
                                        <div className="space-y-2">
                                        <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                                            {feature.title}
                                        </h5>
                                        <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                                        </div>
                                        <a href={feature.link} className="flex items-center justify-between group-hover:text-secondary">
                                        <span className="text-sm">Read more</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                        >
                                            <path
                                            fillRule="evenodd"
                                            d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                                            clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
