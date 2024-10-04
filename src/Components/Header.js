"use client";
import { useState, useEffect } from "react";
import { AlignJustify, ChevronRight } from "lucide-react";
const Header = ({ session = false }) => {

    const [isSession, setIsSession] = useState(session);
    const [ShowQuickLink, setShowQuickLink] = useState(false);
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();

            // Format time as HH : MM : SS
            const formattedTime = now
                .toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false, // 24-hour format
                })
                .replace(/:/g, " : "); // Replace ':' with ' : '

            // Format date as Mon, 30 September 2024
            const options = { weekday: "short", year: "numeric", month: "long", day: "numeric" };
            const formattedDate = now.toLocaleDateString("en-US", options);

            setTime(formattedTime);
            setDate(formattedDate);
        }, 1000); // Update every second

        // Clean up the interval on component unmount
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {isSession ? (
                <header className="bg-white shadow-md py-4 px-1 relative ">
                    <div className="flex justify-between items-center w-full">
                        {/* Logo */}
                        <div className="flex items-center md:mb-0 gap-2">
                            <img
                                src="https://csip.fieindia.org/img/logo.jpg"
                                alt="CSIP Logo"
                                className="h-14 " // Adjust logo height for responsiveness
                            />
                            <div className="max-lg:flex hidden">
                                <AlignJustify width={27} height={27} />
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-5">
                            <div className="timer max-lg:hidden">
                                <h3 className="font-bold text-xl text-end">
                                    {time}
                                </h3>
                                <span className="text-sm text-gray-600">{date}</span>
                            </div>
                            <div className="QuickLink max-sm:hidden">
                                <button
                                    className="px-4 py-2 rounded-full bg-[#9779FF] text-white font-semibold"
                                    onClick={() => {
                                        setShowQuickLink(!ShowQuickLink);
                                    }}
                                >
                                    Quick Links
                                </button>
                            </div>
                            <div className="flex gap-5 pr-10 max-sm:pr-1">
                                <div className="max-sm:hidden">
                                    <h3 className="font-bold text-lg text-end">User Name</h3>
                                    <span className="text-sm text-gray-500">
                                        yatishprajapat.official@gmail.com
                                    </span>
                                </div>
                                <div className="profile">
                                    <img
                                        src="https://csip.fieindia.org/images/profile/default.jpg"
                                        alt="profile image"
                                        className="h-16 rounded-full" // Adjust logo height for responsiveness
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Quick Link */}
                    <div
                        className={`h-40 w-1/4 bg-white border-[#FF628A] border-[1px] rounded-3xl absolute top-[105%] p-6 transition-transform duration-700 ease-in-out transform ${ShowQuickLink ? "-translate-x-5" : "translate-x-[200%]"
                            } right-0`}
                        style={{ willChange: "transform" }}
                    >
                        <div
                            onClick={() => {
                                setShowQuickLink(false);
                            }}
                            className="absolute top-6 bg-[#FF628A] -left-12 p-3 rounded-s-lg text-white cursor-pointer"
                        >
                            <ChevronRight />
                        </div>
                        <div className="w-full h-full flex justify-center flex-col gap-1">
                            <button
                                onClick={() => { setShowQuickLink(false) }}
                                className="flex gap-2 text-xl text-[#8280FD] font-medium hover:text-[#acabfc]"
                            >
                                <ChevronRight /> Dashboard
                            </button>
                            <button
                                className="flex gap-2 text-xl text-[#8280FD] font-medium hover:text-[#acabfc]"
                            >
                                <ChevronRight /> Edit Profile
                            </button>
                            <button
                                className="flex gap-2 text-xl text-[#8280FD] font-medium hover:text-[#acabfc]"
                            >
                                <ChevronRight /> Logout
                            </button>
                        </div>
                    </div>
                </header>
            ) : (
                <header className="bg-white px-4 sm:px-8 md:px-20 lg:px-40 ">
                    <div className="container mx-auto flex max-sm:flex-col  justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center mb-4 md:mb-0">
                            <img
                                src="https://csip.fieindia.org/img/logo.jpg"
                                alt="CSIP Logo"
                                className="h-18 sm:h-22 md:h-24" // Adjust logo height for responsiveness
                            />
                        </div>

                        {/* Login and Register Links */}
                        <div className="flex space-x-4">
                            <button
                                className="text-[#3455CE] text-sm sm:text-base md:text-lg font-medium hover:underline"
                            >
                                Login
                            </button>
                            <button
                                className="text-[#3455CE] text-sm sm:text-base md:text-lg font-medium hover:underline"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </header>
            )}
        </>
    );
};

export default Header;
