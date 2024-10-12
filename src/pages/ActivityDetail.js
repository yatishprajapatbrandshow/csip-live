"use client"
;import Link from 'next/link'
import React from 'react'
import { Calendar, Clock, MousePointer, ArrowLeft } from "lucide-react"


const ActivityDetail = () => {
    return (
        <section className='bg-[#f0f0f0] w-full h-screen'>
            <div className="p-6">
                <Link href="/dashboard" className="flex items-center  mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                </Link>
                <div className='border border-[#eee2e4] rounded-xl bg-white p-10'>
                    <h2 className='text-xl '>Time Management Principles</h2>
                    <div className="my-4 bg-[#fff3d9] p-4 max-w-lg">
                        <div className="space-y-3 w-fit">
                            <div className="bg-[#fff7e5] p-2 flex items-start space-x-3 border border-[#eee2e4]">
                                <div className="p-2 bg-[#ffe3a9]"><MousePointer className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-[13px] font-semibold text-gray-600">Apply Before:</p>
                                    <p className="font-semibold text-sm text-gray-600">29th Sep 2025</p>
                                </div>
                            </div>
                            <div className="bg-[#fff7e5] p-2 flex items-start space-x-3 border border-[#eee2e4]">
                                <div className="p-2 bg-[#ffe3a9]"><Calendar className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-[13px] font-semibold text-gray-600">Activity Start Date:</p>
                                    <p className="font-semibold text-sm text-gray-600">8th Aug 2023</p>
                                </div>
                            </div>
                            <div className="bg-[#fff7e5] p-2 flex items-start space-x-3 border border-[#eee2e4]">
                                <div className="p-2 bg-[#ffe3a9]"><Calendar className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-[13px] font-semibold text-gray-600">Submission Start Date:</p>
                                    <p className="font-semibold text-sm text-gray-600">9th Aug 2025</p>
                                </div>
                            </div>
                            <div className="bg-[#fff7e5] p-2 flex items-start space-x-3 border border-[#eee2e4]">
                                <div className="p-2 bg-[#ffe3a9]"><Clock className="w-6 h-6" /></div>
                                <div>
                                    <p className="text-[13px] font-semibold text-gray-600">Submission Last Date:</p>
                                    <p className="font-semibold text-sm text-gray-600">29th Sep 2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='space-y-1'>
                        <p className='text-gray-600 text-[15px]'>Participants engage in an 8-question MCQ quiz to assess their grasp of time management principles. Questions cover the Eisenhower Matrix, prioritization, time blocking, Pomodoro Technique, SMART goals, batching, and productivity principles.</p>
                        <p className='text-gray-600 text-[15px]'><strong className='text-gray-600'>Time Duration: </strong> Approx. 15-20 minutes.</p>
                        <p className='text-gray-600 text-[15px]'><strong className='text-gray-600'>Marks: </strong> Each question carries 2 marks.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ActivityDetail