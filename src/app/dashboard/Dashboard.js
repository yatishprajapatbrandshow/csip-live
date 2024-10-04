import SideBar from "@/Components/Sidebar"
import { CircularProgressBar } from "@/Components/CircularProgressBar";
import Link from "next/link";



export default function Dashboard() {
    return (
        <div className="relative">
            <div className="absolute top-0 left-0 z-20">
                <SideBar />
            </div>
            <div className="ml-20 p-6 bg-purple-100 space-y-6 font-sans">
                <div className="grid grid-cols-12 gap-4">
                    <div className="bg-pink-200 p-4 rounded-lg col-span-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-gilBold text-purple-800">86<sup className="text-[17px]">%</sup></h2>
                                <p className="text-purple-600 font-gilSemiBold">Transformed!</p>
                                <p className="text-sm text-purple-500 font-gilMedium">You've successfully mimicked a new form!</p>
                            </div>
                            <img
                                src="https://csip.fieindia.org/img/congratulation-img.png"
                                alt="Ditto transformation"
                                width={150}
                                height={150}
                                className="w-60"
                            />
                        </div>
                    </div>
                    <div className="bg-purple-200 col-span-2 p-4 rounded-lg">
                        <h3 className="text-lg font-gilBold text-purple-800 mb-2">Activity Progress Chart</h3>
                        <div className="flex justify-center">
                            <CircularProgressBar value={90} text="90%" color="text-pink-500" />
                        </div>
                    </div>
                    <div className="bg-blue-200 col-span-2 p-4 rounded-lg">
                        <h3 className="text-lg font-gilBold text-purple-800 mb-2">Corporate Reviews</h3>
                        <p className="text-sm text-purple-600 font-gilMedium">No Data to Generate Report</p>
                    </div>
                    <div className="bg-pink-200 col-span-2 p-4 rounded-lg">
                        <h3 className="text-lg font-gilBold text-purple-800 mb-2">Points Earned</h3>
                        <p className="text-sm text-purple-600 font-gilMedium">No Data to Generate Report</p>
                    </div>
                    <div className="bg-pink-200 col-span-2 p-4 rounded-lg">
                        <h3 className="text-lg font-gilBold text-purple-800 mb-2">Corporate Skill Endorsement</h3>
                        <p className="text-sm text-purple-600 font-gilMedium">No Data to Generate Report</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-yellow-100 p-4 rounded-lg space-y-2">
                        <button className="w-full text-left text-purple-800 border-b pb-1 border-gray-400 font-gilBold">👀 View Curriculum</button>
                        <button className="w-full text-left text-purple-800 border-b pb-2 border-gray-400 font-gilBold">📊 View Report</button>
                        <button className="w-full text-left text-purple-800 font-gilBold">🔄 Change Form</button>
                    </div>
                    <div className="bg-purple-200 p-4 rounded-lg col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2 border border-gray-100 p-1">
                            <div className="text-3xl font-gilBold bg-white px-3 text-purple-800">3</div>
                            <p className="text-sm text-purple-600">Topic Studying</p>
                        </div>
                        <div className="flex items-center gap-2 border border-gray-100 p-1">
                            <div className="text-3xl font-gilBold bg-white px-3 text-purple-800">1</div>
                            <p className="text-sm text-purple-600">Activity Applied</p>
                        </div>
                        <div className="flex items-center gap-2 border border-gray-100 p-1">
                            <div className="text-3xl font-gilBold bg-white px-3 text-purple-800">0</div>
                            <p className="text-sm text-purple-600">Ongoing Activity</p>
                        </div>
                        <div className="flex items-center gap-2 border border-gray-100 p-1">
                            <div className="text-3xl font-gilBold bg-white px-3 text-purple-800">0</div>
                            <p className="text-sm text-purple-600">Submission Pending</p>
                        </div>
                        <div className="flex items-center gap-2 border border-gray-100 p-1">
                            <div className="text-3xl font-gilBold bg-white px-3 text-purple-800">0</div>
                            <p className="text-sm text-purple-600">Completed Activity</p>
                        </div>
                        <div className="flex items-center gap-2 border border-gray-100 p-1">
                            <div className="text-3xl font-gilBold bg-white px-3 text-purple-800">0</div>
                            <p className="text-sm text-purple-600">Total Score</p>
                        </div>
                        <div className="flex items-center gap-2 border border-gray-100 p-1">
                            <div className="text-3xl font-gilBold bg-white px-3 text-purple-800">0</div>
                            <p className="text-sm text-purple-600">Skill Endorsement from Corporate</p>
                        </div>
                        <div className="flex items-center gap-2 border border-gray-100 p-1">
                            <div className="text-3xl font-gilBold bg-white px-3 text-purple-800">0</div>
                            <p className="text-sm text-purple-600">Leaderborad is Being Evaluated...</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="text-lg font-gilBold text-purple-800 mb-2">Profile Status</h3>
                        <div className="flex justify-center">
                            <CircularProgressBar value={0} text="0%" color="text-pink-500" />
                        </div>
                        <p className="text-center text-sm text-purple-600 mt-2">Completed</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="text-lg font-gilBold text-purple-800 mb-2">Activity/Curriculum</h3>
                        <div className="flex justify-center">
                            <CircularProgressBar value={0} text="0%" color="text-yellow-500" />
                        </div>
                        <p className="text-center text-sm text-purple-600 mt-2">Completed</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="text-lg font-gilBold text-purple-800 mb-2">Score</h3>
                        <div className="flex justify-center">
                            <CircularProgressBar value={0} text="0%" color="text-pink-400" />
                        </div>
                        <p className="text-center text-sm text-purple-600 mt-2">Points Earned</p>
                    </div>
                </div>

                <div className="bg-pink-100 p-4 rounded-lg">
                    <h3 className="text-lg font-gilBold text-purple-800 mb-2">📚 Topics:</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded">Advances in Business Communication </span>
                        <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded">Advances in Business Communication </span>
                        <Link href="" className="bg-green-400 text-white px-2 py-1 rounded">Add New Topic </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
