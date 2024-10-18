'use client'
import React from 'react'
import Header from "../Components/Header";
import SignUp from "../Components/SignUp";
import { CircleCheck } from "lucide-react";
import Footer from "../Components/Footer";
import PrimaryFeatures from "../Components/PrimaryFeatures";
import ProgramHighlightsSlider from "../Components/ProgramHighlightsSlider";


function HomePage() {
  return (
    <div>
      <Header place="home" />
      <main >
        <section className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-700 mb-4 leading-8">
                Unlock Your Potential With Practical Learning!
              </h1>
              <p className="text-base text-gray-700 mb-6">
                Are you a management student seeking to bridge the gap between
                classroom knowledge and real-world industry experience? Look no
                further than the Curriculum Synced Industrial Program (CSIP). Our
                innovative program is designed to provide you with a seamless
                blend of academic learning and hands-on industrial exposure.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/home1.jpg"
                alt="CSIP Illustration"
                className="max-w-full h-auto"
              />
            </div>
          </div>
          <ProgramHighlightsSlider />
        </section>
   

       
        <section className="bg-gray-800 ">
          <div className="max-w-7xl mx-auto ">
            <PrimaryFeatures />
          </div>
        </section>
        <section className="max-w-7xl mx-auto ">
          <h2 className="text-3xl text-gray-700 font-normal mb-2 mt-5">
            How CSIP Benefits You:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ul className="space-y-4">
              {[
                "Students: Gain practical exposure, track your progress, and enhance your job readiness.",
                "Training & Placement: Access employability reports and promote job-ready graduates to recruiters.",
                "Virtual Industry Experience: Immerse yourself in the corporate world through our virtual activities. Understand work cultures, industry dynamics, and corporate expectations.",
                "Admission & Marketing: Showcase achievements, reviews, and dynamic learning environment to attract potential students.",
                "Academics: Enrich the curriculum, encourage hands-on learning, and promote peer collaboration.",
              ].map((highlight, index) => (
                <li key={index} className="flex items-start ">
                  <span className="flex items-start">
                    <span className="text-xl text-gray-500 ml-2 font-normal leading-6">
                      {highlight}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <img
                src="/images/home.jpg"
                alt="CSIP Illustration"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </section>
        {/* <section className='h-[80vh] flex justify-center items-center max-sm:w-full' id='signupForm'>
                    <SignUp />
                </section> */}
            </main>
            <Footer />
        </div>
    )
}

export default HomePage
