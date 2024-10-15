'use client';

import React, { useState, useEffect } from 'react';
import { CircularProgressBar } from "@/Components/CircularProgressBar";
import ReviewSlider from "@/Components/ReviewSlider";
import TopicModal from '@/Components/TopicModal';
import { SquareX, Star } from 'lucide-react';
import Activities from "@/Components/Activities";
import { API_URL, API_URL_LOCAL } from "@/Config/Config";
import { useSelector } from "react-redux";
import Header from '@/Components/Header';
import { useCountUp } from '@/hooks/useCountUp';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentsSlider from '@/Components/CommentsSlider';


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


export default function DashboardCombind() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newActivities, setNewActivities] = useState([])
    const [recommendedActivities, setRecommendedActivities] = useState([])
    const [favActivities, setfavActivities] = useState([])
    const [topicData, setTopicData] = useState([]);
    const [dashboardData, setDashboardData] = useState([]);
    const [commentsData, setCommentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ProfileStatus, setProfileStatus] = useState("");
    const [ActivityCurriculumStatus, setActivityCurriculumStatus] = useState("");

    const isTriggeredApply = useSelector((state) => state.trigger.applyTrigger);
    const userData = useSelector((state) => state.session.userData);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const topicStudyingCount = useCountUp(dashboardData?.topicStudying?.length || 0);
    const activityAppliedCount = useCountUp(dashboardData?.activityApplied?.length || 0);
    const ongoingActivitiesCount = useCountUp(dashboardData?.ongoingActivities?.length || 0);
    const submissionPendingCount = useCountUp(dashboardData?.submissionPending?.length || 0);
    const paymentPendingCount = useCountUp(dashboardData?.paymentPending?.length || 0);
    const completedActivitiesCount = useCountUp(dashboardData?.completedActivities?.length || 0);
    const totalScoreCount = useCountUp(dashboardData?.totalScore || 0); // Assuming totalScore is a number
    const ProfileStatusCount = useCountUp(ProfileStatus?.profilePercentage || 0); // Assuming totalScore is a number
    const ActivityCurriculumStatusCount = useCountUp(ActivityCurriculumStatus?.percentage || 0); // Assuming totalScore is a number


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

    const fetchNewActivities = async () => {
        try {
            const response = await fetch(`${API_URL}activity/list?limit=15&&date=true`, {
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
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const fetchTopicData = async () => {
        if (!userData?.sid) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}topic/get`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({
                    participant_id: userData?.sid
                })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();

            if (responseData.status === true) {
                setTopicData(responseData.data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveTopic = async (topicId) => {

        const datatSend = {
            participant_id: userData?.sid,
            TopicsList: [`${topicId}`],
        }
        const APIURL = `${API_URL}topic/remove`

        try {
            const response = await fetch(APIURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datatSend),
            });

            const responseData = await response.json()

            if (responseData.status === true) {
                alert("topics removed successfully")
                fetchTopicData();
            } else {
                alert("Something went wrong, please try again")
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while removing the topic.');
        }
    };

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
            fetchNewActivities();
            fetchRecommenedActivities();
            fetchFavoriteActivity();
            fetchTopicData();
            fetchCommentsData();
            fetchProfileStatus();
            fetchActivityCurriculumStatus();
        }
    }, [userData]);

    useEffect(() => {
        fetchDashboardData();
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
            console.log(responseData);
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
            console.log(responseData);
            if (responseData.status === true) {
                setActivityCurriculumStatus(responseData?.data?.percentage);
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
                        <div className="bg-pink-200 p-4 rounded-lg col-span-4 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
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
                        <div className="bg-purple-200 col-span-2 p-4 rounded-lg hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <h3 className="text-lg  text-purple-800 mb-2">Activity Progress Chart</h3>
                            <div className="flex justify-center hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <CircularProgressBar value={90} text="90%" color="text-pink-500" />
                            </div>
                        </div>
                        <div className="bg-blue-200 col-span-2 p-4 rounded-lg hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <h3 className="text-lg  text-purple-800 mb-2">Corporate Reviews</h3>
                            <ReviewSlider reviews={reviews} />
                        </div>
                        <div className="bg-pink-200 col-span-2 p-4 rounded-lg hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <h3 className="text-lg  text-purple-800 mb-2">Points Earned</h3>
                            <div className="flex justify-center hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <CircularProgressBar value={62} text="62" color="text-pink-500" />
                            </div>
                        </div>
                        <div className="bg-pink-200 col-span-2 p-4 rounded-lg hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <h3 className="text-lg  text-purple-800 mb-2">Corporate Skill Endorsement</h3>
                            <p className="text-sm text-purple-600 font-gilMedium">No Data to Generate Report</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-yellow-100 p-4 rounded-lg space-y-2 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <button className="w-full text-left text-purple-800 border-b pb-3 border-gray-400 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5 ">👀 View Curriculum</button>
                            <button className="w-full text-left text-purple-800 border-b pb-3 border-gray-400 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">📊 View Report</button>
                            <button className="w-full text-left text-purple-800 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">🔄 Change Form</button>
                        </div>
                        <div className="bg-[#dfccfa] p-4 rounded-lg col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                            <div className="flex items-center gap-2 border border-gray-100 p-1 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <div className="text-3xl  bg-white  text-purple-800 w-10 flex justify-center">{topicStudyingCount}</div>
                                <p className="text-sm ">Topic Studying</p>
                            </div>
                            <div onClick={() => router.push('/AppliedActivity')} className="flex items-center gap-2 border border-gray-100 p-1 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5 cursor-pointer">
                                <div className="text-3xl  bg-white w-10 flex justify-center text-purple-800">{activityAppliedCount}</div>
                                <p className="text-sm ">Activity Applied</p>
                            </div>
                            <div onClick={() => router.push('/OngoingActivities')} className="flex items-center gap-2 border border-gray-100 p-1 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5 cursor-pointer">
                                <div className="text-3xl  bg-white w-10 flex justify-center text-purple-800">{ongoingActivitiesCount}</div>
                                <p className="text-sm ">Ongoing Activity</p>
                            </div>
                            <div className="flex items-center gap-2 border border-gray-100 p-1 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <div className="text-3xl  bg-white w-10 flex justify-center text-purple-800">{submissionPendingCount}</div>
                                <p className="text-sm ">Submission Pending</p>
                            </div>
                            <div onClick={() => router.push('/PaymentPending')} className="flex items-center gap-2 border border-gray-100 p-1 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5 cursor-pointer">
                                <div className="text-3xl  bg-white w-10 flex justify-center text-purple-800">{paymentPendingCount}</div>
                                <p className="text-sm ">Payment Pending</p>
                            </div>
                            <div className="flex items-center gap-2 border border-gray-100 p-1 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <div className="text-3xl  bg-white w-10 flex justify-center text-purple-800">{completedActivitiesCount}</div>
                                <p className="text-sm ">Completed Activity</p>
                            </div>
                            <div className="flex items-center gap-2 border border-gray-100 p-1 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <div className="text-3xl  bg-white w-10 flex justify-center text-purple-800">{totalScoreCount}</div>
                                <p className="text-sm ">Total Score</p>
                            </div>
                            <div className="flex items-center gap-2 border border-gray-100 p-1 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <div className="text-3xl  bg-white w-10 flex justify-center text-purple-800">0</div>
                                <p className="text-sm ">Skill Endorsement from Corporate</p>
                            </div>
                            <div className="flex items-center gap-2 border border-gray-100 p-1 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <p className="text-sm py-1.5">Leaderborad is Being Evaluated...</p>
                            </div>
                        </div>
                    </div>



                    <div className="grid grid-cols-5 gap-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 col-span-2 h-max">
                            <div className="bg-purple-100 p-4 rounded-lg hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <h3 className="text-lg  text-purple-800 mb-2">Profile Status</h3>
                                <div className="flex justify-center hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                    {ProfileStatus ?
                                        <CircularProgressBar value={ProfileStatusCount} text={`${ProfileStatusCount}%`} color="text-pink-500" />
                                        : null}
                                </div>
                                <p className="text-center text-sm text-purple-600 mt-2">Completed</p>
                            </div>
                            <div className="bg-purple-100 p-4 rounded-lg hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <h3 className="text-lg  text-purple-800 mb-2">Activity/Curriculum</h3>
                                <div className="flex justify-center hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                    <CircularProgressBar value={ActivityCurriculumStatusCount} text={`${ActivityCurriculumStatusCount}%`} color="text-pink-500" />
                                </div>
                                <p className="text-center text-sm text-purple-600 mt-2">Completed</p>
                            </div>
                            <div className="bg-purple-100 p-4 rounded-lg hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                <h3 className="text-lg  text-purple-800 mb-2">Score</h3>
                                <div className="flex justify-center hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
                                    <CircularProgressBar value={85} text="85%" color="text-pink-500" />
                                </div>
                                <p className="text-center text-sm text-purple-600 mt-2">Points Earned</p>
                            </div>
                        </div>
                        <div className="bg-pink-100 p-4 rounded-lg col-span-3 hover:drop-shadow-lg transition-transform duration-200 ease-in transform hover:translate-y-0.5">
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
                        </div>
                        <TopicModal isOpen={isModalOpen} onClose={closeModal} fetchTopicData={fetchTopicData} fetchDashboardData={fetchDashboardData} showToast={showToast} />
                    </div>
                    <ToastContainer position="top-right" autoClose={1000} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                </div>
                <CommentsSlider commentsData={commentsData} />
                {/* <Activities title="Activity" activityData={true} /> */}

                {favActivities && Array.isArray(favActivities) && favActivities.length > 0 ?
                    <Activities title="Favourite Activity" cardData={favActivities} />
                    : null}
                {recommendedActivities && Array.isArray(recommendedActivities) && recommendedActivities.length > 0 ?
                    <Activities title="Recommended Activity" cardData={recommendedActivities} />
                    : null}
                {newActivities && Array.isArray(newActivities) && newActivities.length > 0 ?
                    <Activities title="New Activity" bgDesign={"Full"} cardData={newActivities} />
                    : null}
            </div>
        </>
    );
}
