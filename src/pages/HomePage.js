'use client'
import React from 'react'
import Header from "../Components/Header";
import SignUp from "../Components/SignUp";
import { CircleCheck } from 'lucide-react';
import Footer from '../Components/Footer';

function HomePage() {
    return (
        <div>
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-40 py-12 max-sm:mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl font-light text-gray-900 mb-4 leading-8">Unlock Your Potential With Practical Learning!</h1>
                        <p className="text-xl text-gray-500 mb-6">
                            Are you a management student seeking to bridge the gap between classroom knowledge and real-world industry experience? Look no further than the Curriculum Synced Industrial Program (CSIP). Our innovative program is designed to provide you with a seamless blend of academic learning and hands-on industrial exposure.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img src='/images/home1.jpg' alt="CSIP Illustration" className="max-w-full h-auto" />
                    </div>
                </div>

                <section >
                    <h2 className="text-3xl text-gray-700 font-normal mb-6">Program Highlights:</h2>
                    <ul className="space-y-6">
                        {[
                            "Aligned Learning Experience: CSIP synchronizes academic subjects with practical industrial activities. As you study organizational behavior in class, engage in activities that showcase its real-world applications.",
                            "Customized Learning Paths: Tailor your learning journey by choosing activities based on your interests. Dive deep into your chosen field, whether it's finance, marketing, or more.",
                            "Virtual Industry Experience: Immerse yourself in the corporate world through our virtual activities. Understand work cultures, industry dynamics, and corporate expectations.",
                            "Quantifiable Progress: Track your growth on our leaderboard. See how your engagement and performance compare with peers, motivating you to excel.",
                            "Insightful Analytics: Receive detailed progress reports showcasing your strengths and areas for improvement. Tailor your learning journey with personalized guidance.",
                            "Average Employability Score: Showcase your readiness for the job market with our employability report. Demonstrate your alignment with industry requirements.",
                            "Co-Branded Certifications: Earn certifications endorsed by both CSIP and industry partners. Showcase your practical skills to potential employers.",
                            "Peer Collaboration: Collaborate with a diverse group of peers. Learn from each other's experiences and insights, enhancing your holistic growth.",
                            "Case Bank: Access a collection of real-world and simulated industry cases. Hone your problem-solving abilities and apply theoretical concepts to practical challenges."
                        ].map((highlight, index) => (
                            <li key={index} className="flex items-start ">
                                <span className="flex items-start mb-2">
                                    <CircleCheck />
                                    <span className="text-xl text-gray-500 ml-2">{highlight}</span>
                                </span>

                            </li>
                        ))}
                    </ul>
                </section>
                <section className='max-sm:mb-10'>
                    <h2 className="text-3xl text-gray-700 font-normal mb-2 mt-5">How CSIP Benefits You:</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center' >
                        <ul className="space-y-4">
                            {[
                                "Students: Gain practical exposure, track your progress, and enhance your job readiness.",
                                "Training & Placement: Access employability reports and promote job-ready graduates to recruiters.",
                                "Virtual Industry Experience: Immerse yourself in the corporate world through our virtual activities. Understand work cultures, industry dynamics, and corporate expectations.",
                                "Admission & Marketing: Showcase achievements, reviews, and dynamic learning environment to attract potential students.",
                                "Academics: Enrich the curriculum, encourage hands-on learning, and promote peer collaboration."
                            ].map((highlight, index) => (
                                <li key={index} className="flex items-start ">
                                    <span className="flex items-start">
                                        <span className="text-xl text-gray-500 ml-2 font-normal leading-6">{highlight}</span>
                                    </span>

                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center">
                            <img src='/images/home.jpg' alt="CSIP Illustration" className="max-w-full h-auto" />
                        </div>
                    </div>
                </section>
                <section className='h-[80vh] flex justify-center items-center max-sm:w-full'>
                    <SignUp />
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default HomePage
