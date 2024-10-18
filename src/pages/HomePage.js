"use client";
import React from "react";
import Header from "../Components/Header";
import SignUp from "../Components/SignUp";
import { CircleCheck } from "lucide-react";
import Footer from "../Components/Footer";
const Hightlights = [
    {
      name: "Aligned Learning Experience",
      desc: "CSIP synchronizes academic subjects with practical industrial activities. As you study organizational behavior in class, engage in activities that showcase its real-world applications.",
    },
    {
      name: "Customized Learning Paths",
      desc: "Tailor your learning journey by choosing activities based on your interests. Dive deep into your chosen field, whether it's finance, marketing, or more.",
    },
    {
      name: "Virtual Industry Experience",
      desc: "Immerse yourself in the corporate world through our virtual activities. Understand work cultures, industry dynamics, and corporate expectations.",
    },
    {
      name: "Quantifiable Progress",
      desc: "Track your growth on our leaderboard. See how your engagement and performance compare with peers, motivating you to excel.",
    },
    {
      name: "Insightful Analytics",
      desc: "Receive detailed progress reports showcasing your strengths and areas for improvement. Tailor your learning journey with personalized guidance.",
    },
    {
      name: "Average Employability Score",
      desc: "Showcase your readiness for the job market with our employability report. Demonstrate your alignment with industry requirements.",
    },
    {
      name: "Co-Branded Certifications",
      desc: "Earn certifications endorsed by both CSIP and industry partners. Showcase your practical skills to potential employers.",
    },
    {
      name: "Peer Collaboration",
      desc: "Collaborate with a diverse group of peers. Learn from each other's experiences and insights, enhancing your holistic growth.",
    },
    {
      name: "Case Bank",
      desc: "Access a collection of real-world and simulated industry cases. Hone your problem-solving abilities and apply theoretical concepts to practical challenges.",
    },
  ]
function HomePage() {
  return (
    <div>
      <Header place="home" />
      <main className="max-w-7xl mx-auto ">
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
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        ></ul>

        <section>
          <h2 className="text-3xl text-gray-700 font-normal mb-6">
            Program Highlights:
          </h2>
          <ul className="grid grid-cols-3 gap-5">
            {Hightlights.map((highlight, index) => (
              <>
                <div
                  style={{ opacity: 1 }}
                  className="relative flex aspect-[9/16] w-72 shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-end overflow-hidden rounded-3xl sm:aspect-[3/4] sm:w-96"
                >
                  <img
                    alt=""
                    src="https://img.freepik.com/free-photo/young-woman-with-backpack-walking-through-green-park-with-silver-laptop-hands_231208-8084.jpg?t=st=1729228000~exp=1729231600~hmac=cf0ea8b5398268eea2376b587bf61b8995ab44ab3780ace0e3d9a1de57b8bae6&w=740"
                    className="absolute inset-x-0 top-0 aspect-square w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-[calc(7/16*100%)] ring-1 ring-inset ring-gray-950/10 sm:from-25%"
                  />
                  <figure className="relative p-10">
                    <blockquote>
                      <p className="relative text-xl/7 text-white">
                        <span
                          aria-hidden="true"
                          className="absolute -translate-x-full"
                        >
                          “
                        </span>
                        
                        {highlight.name}
                        <span aria-hidden="true" className="absolute">
                          ”
                        </span>
                      </p>
                    </blockquote>
                    <figcaption className="mt-6 border-t border-white/20 pt-6">
                      <p className="text-base font-normal">
                        <span className="bg-gradient-to-r from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] bg-clip-text text-transparent">
                            {highlight.desc}
                        </span>
                      </p>
                    </figcaption>
                  </figure>
                </div>
              </>
            ))}
          </ul>
        </section>
        <section className="max-sm:mb-10">
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
  );
}

export default HomePage;
