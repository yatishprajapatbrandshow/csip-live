'use client';

import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Hightlights = [
    {
        name: "Aligned Learning Experience",
        img: "/images/aligned-learning-experience.jpg",
        desc: "CSIP synchronizes academic subjects with practical industrial activities. As you study organizational behavior in class, engage in activities that showcase its real-world applications.",
    },
    {
        name: "Customized Learning Paths",
        img: "/images/customized-learning-paths.jpg",
        desc: "Tailor your learning journey by choosing activities based on your interests. Dive deep into your chosen field, whether it's finance, marketing, or more.",
    },
    {
        name: "Virtual Industry Experience",
        img: "/images/virtual-industry-experience.jpg",
        desc: "Immerse yourself in the corporate world through our virtual activities. Understand work cultures, industry dynamics, and corporate expectations.",
    },
    {
        name: "Quantifiable Progress",
        img: "/images/quantifiable-progress.jpg",
        desc: "Track your growth on our leaderboard. See how your engagement and performance compare with peers, motivating you to excel.",
    },
    {
        name: "Insightful Analytics",
        img: "/images/insightful-analytics.jpg",
        desc: "Receive detailed progress reports showcasing your strengths and areas for improvement. Tailor your learning journey with personalized guidance.",
    },
    {
        name: "Average Employability Score",
        img: "/images/average-employability-score.jpg",
        desc: "Showcase your readiness for the job market with our employability report. Demonstrate your alignment with industry requirements.",
    },
    {
        name: "Co-Branded Certifications",
        img: "/images/co-branded-certifications.jpg",
        desc: "Earn certifications endorsed by both CSIP and industry partners. Showcase your practical skills to potential employers.",
    },
    {
        name: "Peer Collaboration",
        img: "/images/peer-collaboration.jpg",
        desc: "Collaborate with a diverse group of peers. Learn from each other's experiences and insights, enhancing your holistic growth.",
    },
    {
        name: "Case Bank",
        img: "/images/case-bank.jpg",
        desc: "Access a collection of real-world and simulated industry cases. Hone your problem-solving abilities and apply theoretical concepts to practical challenges.",
    },
]

const ProgramHighlightsSlider = () => {
    const sliderRef = React.useRef(null);

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="relative">
            <h2 className="text-3xl text-gray-700 font-normal mb-6">
                Program Highlights:
            </h2>
            <div className="relative">
                <ul
                    ref={sliderRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {Hightlights.map((highlight, index) => (
                        <li key={index} className="flex-shrink-0 snap-start mr-5 last:mr-0">
                            <div className="relative flex aspect-[9/16] w-72 shrink-0 flex-col justify-end overflow-hidden rounded-3xl sm:aspect-[3/4] sm:w-[19rem]">
                                <img
                                    alt={highlight.name}
                                    src={highlight.img}
                                    className="absolute inset-x-0 top-0 aspect-square w-full object-cover"
                                />
                                <div aria-hidden="true" className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-[calc(7/16*100%)] ring-1 ring-inset ring-gray-950/10 sm:from-25%" />
                                <figure className="relative p-10">
                                    <blockquote>
                                        <p className="relative text-xl/7 text-white">
                                            <span aria-hidden="true" className="absolute  -translate-x-full">"</span>{highlight.name}
                                            <span aria-hidden="true" className="absolute">"</span>
                                        </p>
                                    </blockquote>
                                    <figcaption className="mt-3 border-t border-white/20 pt-2">
                                        <p className="text-base font-normal">
                                            <span className="bg-gradient-to-r line-clamp-2 from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] bg-clip-text text-transparent">
                                                {highlight.desc}
                                            </span>
                                        </p>
                                    </figcaption>
                                </figure>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    className="absolute -left-10 top-1/2 -translate-y-1/2 bg-black/80 p-1 rounded-full"
                    onClick={() => scroll('left')}
                >
                    <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                    className="absolute -right-10 top-1/2 -translate-y-1/2 bg-black/80 p-1 rounded-full"
                    onClick={() => scroll('right')}
                >
                    <ChevronRight className="h-6 w-6 text-white" />
                </button>
            </div>
        </section>
    )
}

export default ProgramHighlightsSlider