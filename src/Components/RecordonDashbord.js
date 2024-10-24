import { API_URL } from "@/Config/Config";
import { getLocalStorageItem } from "@/Config/localstorage";
import { useEffect, useState } from "react";

const RecordonDashboard = () => {
    const [timeSpendData, setTimeSpendData] = useState('');
    const userData = getLocalStorageItem('userData');
    const getTime = async (participant_id) => {
        try {
            const response = await fetch(`${API_URL}visit/get?participant_id=${participant_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            console.log(responseData);

            if (responseData.status === true) {
                setTimeSpendData(responseData?.data?.timeSpend)
                return
            }
            setTimeSpendData("0:0:0");
            return
        } catch (error) {
            console.error("Error:", error);
            setTimeSpendData("0:0:0");
            return
        }
    };
    useEffect(() => {
        if (userData) {
            getTime(userData?.sid)
        }
    }, [])
    const [currentTime, setCurrentTime] = useState("");

    // Function to format the time in "HH:MM AM/PM" format
    const formatTime = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // If the hour is 0, set it to 12 (midnight)

        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${formattedMinutes} ${ampm}`;
    };

    useEffect(() => {
        // Update time every second
        const interval = setInterval(() => {
            setCurrentTime(formatTime());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="mx-auto w-fit items-end overflow-hidden rounded-[2.5rem] border bg-white p-2 shadow-md shadow-gray-950/5">
            <div className="space-y-1.5 rounded-[2rem] border bg-gray-200/50 p-1.5 sm:w-[16rem]">
                <div className="space-y-3 rounded-b-lg rounded-t-[1.625rem] bg-white p-4">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-1.5 text-info-500">
                            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M2 19v-6q0-.675.275-1.225T3 10.8V8q0-1.25.875-2.125T6 5h4q.575 0 1.075.213T12 5.8q.425-.375.925-.587T14 5h4q1.25 0 2.125.875T21 8v2.8q.45.425.725.975T22 13v6h-2v-2H4v2zm11-9h6V8q0-.425-.288-.712T18 7h-4q-.425 0-.712.288T13 8zm-8 0h6V8q0-.425-.288-.712T10 7H6q-.425 0-.712.288T5 8z"
                                ></path>
                            </svg>
                            <div className="text-sm font-medium">Time Spend</div>
                        </div>
                        <div className="text-caption text-xs">{currentTime}</div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="space-y-1">
                            <div className="text-sm font-medium">Time in Website</div>
                            <div className="flex gap-3">
                                <div className="space-x-0.5">
                                    <span className="text-title align-baseline text-xl font-medium">{timeSpendData?.split(':')[0] === "" ? 0 : timeSpendData?.split(':')[0]}</span>
                                    <span className="text-placeholder text-xs">hr</span>
                                </div>
                                <div className="space-x-0.5">
                                    <span className="text-title align-baseline text-xl font-medium">{timeSpendData?.split(':')[1] === "" ? 0 : timeSpendData?.split(':')[1]}</span>
                                    <span className="text-placeholder text-xs">min</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end gap-1">
                            <div aria-hidden="true" className="h-3 w-1.5 rounded bg-gray-200"></div>
                            <div aria-hidden="true" className="h-5 w-1.5 rounded bg-gray-200"></div>
                            <div aria-hidden="true" className="h-10 w-1.5 rounded bg-gray-200"></div>
                            <div aria-hidden="true" className="h-4 w-1.5 rounded bg-gray-200"></div>
                            <div aria-hidden="true" className="h-6 w-1.5 rounded bg-gray-200"></div>
                            <div aria-hidden="true" className="h-5 w-1.5 rounded bg-gray-200"></div>
                            <div aria-hidden="true" className="h-9 w-1.5 rounded bg-primary-500"></div>
                        </div>
                    </div>
                </div>
                <div className="rounded-b-[1.625rem] rounded-t-lg bg-white p-4">
                    <div className="flex justify-between">
                        <div className="flex gap-1.5">
                            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                                <g fill="none">
                                    <path
                                        fill="#ff6723"
                                        d="M26 19.34c0 6.1-5.05 11.005-11.15 10.641c-6.269-.374-10.56-6.403-9.752-12.705c.489-3.833 2.286-7.12 4.242-9.67c.34-.445.689 3.136 1.038 2.742c.35-.405 3.594-6.019 4.722-7.991a.694.694 0 0 1 1.028-.213C18.394 3.854 26 10.277 26 19.34"
                                    ></path>
                                    <path fill="#ffb02e" d="M23 21.851c0 4.042-3.519 7.291-7.799 7.144c-4.62-.156-7.788-4.384-7.11-8.739C9.07 14.012 15.48 10 15.48 10S23 14.707 23 21.851"></path>
                                </g>
                            </svg>
                            <span className="text-sm">Show all Health Data</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-placeholder size-4">
                            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecordonDashboard;
