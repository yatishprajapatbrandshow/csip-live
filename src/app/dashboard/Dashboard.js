import { BarChart, Activity, FileText, BookOpen, MapPin } from "lucide-react";
import SideBar from "@/Components/Sidebar"

export default function Dashboard() {
    return (
        <div className="flex">
            <SideBar />
            <div className="w-full p-8  bg-white">
                <div className="flex flex-wrap max-lg:justify-center">
                    {/* Congratulation Card */}
                    <div className="bg-pink-100 max-lg:w-full p-6 md:p-8 rounded-lg flex flex-col md:flex-row items-center md:items-start">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                            <h2 className="text-4xl font-bold">
                                86<span className="text-xl">% Increased</span>
                            </h2>
                            <h1 className="text-3xl font-bold mb-2">Congratulation!</h1>
                            <p>You're successfully registered with US.</p>
                        </div>
                        <img
                            src="https://csip.fieindia.org/img/congratulation-img.png"
                            alt="Congratulation"
                            className="mx-auto w-1/2 md:w-[200px] lg:w-[250px]"
                        />
                    </div>

                    {/* Charts */}
                    {[
                        "https://csip.fieindia.org/img/chart/activity-progress-chart.jpg",
                        "https://csip.fieindia.org/img/chart/corporate-reviews.jpg",
                        "https://csip.fieindia.org/img/chart/points-earned.jpg",
                        "https://csip.fieindia.org/img/chart/corporate-skill-endorsement.jpg",
                    ].map((url, index) => (
                        <div
                            key={index}
                            className="bg-white p-2 rounded-lg flex justify-center"
                        >
                            <img src={url} alt="Chart" className="w-full h-auto " />
                        </div>
                    ))}
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* College Details */}
                    <div className="bg-[#FFFBF2] p-4 rounded-lg">
                        <h2 className="font-bold text-xl mb-4">College Details:</h2>
                        <div className="flex items-center mb-4">
                            <div className="w-20 h-20 bg-blue-500 overflow-hidden border-4 border-[#FFF3DA] rounded-lg mr-4">
                                <img
                                    src="https://csip.fieindia.org/images/college-logo/logo-1-5c41a849a2339.jpg"
                                    alt="College Logo"
                                    className="w-full h-full"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold w-[80%] text-lg">
                                    Accurate Institute of Management & Technology
                                </h3>
                                <p className=" text-gray-600 text-base flex gap-2 my-2">
                                    <MapPin /> Uttar Pradesh, Greater Noida
                                </p>
                            </div>
                        </div>
                        <div className="w-full bg-[#FFF3DA] p-2">
                            <button className="flex items-center w-full bg-white p-4 rounded mb-2">
                                <BookOpen className="mr-2" /> View Curriculum
                            </button>
                            <button className="flex items-center w-full bg-white p-4 rounded mb-2">
                                <FileText className="mr-2" /> View Report
                            </button>
                            <button className="flex items-center w-full bg-white p-4 rounded mb-2">
                                <Activity className="mr-2" /> Change Topic
                            </button>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="bg-purple-100 p-4 rounded-lg lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { number: "1", title: "Topic Studying" },
                                { number: "1", title: "Activity Applied" },
                                { number: "0", title: "Ongoing Activity" },
                                { number: "0", title: "Submission Pending" },
                                { number: "0", title: "Completed Activity" },
                                { number: "0", title: "Total Score" },
                                { number: "0", title: "Skill Endorsement from Corporate" },
                                { title: "Leaderboard is Being Evaluated..." },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`bg-white p-4 rounded-lg ${index === 7 ? "col-span-2" : ""
                                        }`}
                                >
                                    {item.number && (
                                        <span className="text-3xl font-bold mr-2">
                                            {item.number}
                                        </span>
                                    )}
                                    <span className="text-sm">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
