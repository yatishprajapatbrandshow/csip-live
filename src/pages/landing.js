'use client';

import { Boxes, ChartNoAxesCombined, Clapperboard, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { API_URL } from '@/Config/Config';
import { decrypt } from '@/utils/cryptoUtils';
import Loader from '@/Components/Loader';

const cardData = [
    {
        id: 1,
        title: "Exclusive Video Resources",
        description: "Access a curated library of videos offering deep insights into the corporate world and entrepreneurship.",
        moreData: "These videos cover topics such as market analysis, leadership strategies, and innovative business solutions.",
        icon: <Clapperboard strokeWidth={1} className='w-16 h-16' />,
    },
    {
        id: 2,
        title: "Industry News & Trends",
        description: "Stay ahead of the game with the latest industry updates and trends directly relevant to your field of interest.",
        moreData: "This section includes daily updates, industry forecasts, and expert opinions on market trends.",
        icon: <ChartNoAxesCombined strokeWidth={1} className='w-16 h-16' />,
    },
    {
        id: 3,
        title: "Professional Connections",
        description: "Connect with top industry leaders on LinkedIn, opening doors to mentorship and career opportunities.",
        moreData: "Discover professionals from various fields and expand your network for future career growth.",
        icon: <Boxes strokeWidth={1} className='w-16 h-16' />,
    },
];

const featureData = [
    {
        title: 'Real-World Business Scenarios:',
        description: 'Immerse yourself in dynamic virtual business case studies that simulate real corporate challenges, giving you hands-on experience before you even step into the office.',
    },
    {
        title: 'Essential Corporate Tools:',
        description: 'Master the same tools top industry professionals use, giving you a competitive edge as you enter the corporate landscape.',
    },
    {
        title: 'Career Exploration:',
        description: 'Uncover key job roles and responsibilities across industries, preparing you to confidently pursue the right career path for your future.',
    },
    {
        title: 'Knowledge Check:',
        description: 'Put your skills to the test with interactive MCQs that solidify your understanding and prepare you for real-world application.',
    },
    {
        title: 'Certification of Achievement:',
        description: 'Earn an industry-recognized certificate upon completion, boosting your resume and standing out to employers on LinkedIn.',
    },
];

const quoteSvg = (
    <svg aria-hidden="true" width="105" height="78" className="absolute left-6 top-6 fill-slate-100">
        <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
)

const landing = () => {
    const router = useRouter();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupContent, setPopupContent] = useState({ title: '', moreData: '', icon: '' });
    const [allCurriculum, setAllCurriculum] = useState([]);
    const [loader, setLoader] = useState(true);
    const [id, setId] = useState(null);

    useEffect(() => {
        if (router.query.item) {
            const decryptedItem = decrypt(router.query.item);
            if (decryptedItem) {
                setId(decryptedItem);
            }
        }
    }, [router.query]);



    const fetchAllCurriculum = async () => {

        setLoader(true);
        const APIURL = `${API_URL}activity/get-by-id?_id=${id}`;
        console.log(APIURL);
        try {
            const response = await fetch(APIURL, {
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
                setAllCurriculum(responseData.data);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchAllCurriculum();
        }
    }, [id]);

    const openPopup = (card) => {
        setPopupContent({ title: card.title, moreData: card.moreData, icon: card.icon });
        setIsPopupOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        document.body.style.overflow = '';
    };

    const { name = '', activity_category, activity_type, image_assc, amount, objective, short_name, short_desc, } = allCurriculum;

    const words = name.split(' ');
    const half = Math.ceil(words.length / 2);
    const firstHalf = words.slice(0, half).join(' ');
    const secondHalf = words.slice(half).join(' ');

    return (loader ? <Loader /> : <section>
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-4 pb-16 pt-20 lg:pt-32 grid grid-cols-12 gap-5">
            <div className='col-span-8'>
                <h1 className="max-w-4xl font-montserrat2 max-sm:text-3xl tracking-tight text-slate-900 sm:text-5xl">
                    {firstHalf}{" "}
                    <span className="relative whitespace-nowrap text-blue-600">
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 418 42"
                            className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                            preserveAspectRatio="none"
                        >
                            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                        </svg>
                        <span className="relative">{secondHalf}</span>
                    </span>
                </h1>
                <p className="my-8 max-w-2xl text-lg tracking-tight text-slate-700 font-montserrat2">Empower Your Career with Real-World Business Skills</p>
                <span className='font-montserrat2 text-3xl'>₹{amount}/-</span>
                <div className="mt-10 flex justify-start gap-x-6">
                    <a className="group inline-flex items-center justify-center rounded-full py-2.5 px-4 text-sm font-montserrat2 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900" href="/register" >Apply For Activity</a>
                    <a className="group inline-flex ring-1 items-center justify-center rounded-full py-2.5 px-4 text-sm font-montserrat2 focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        <svg aria-hidden="true" className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"><path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z"></path></svg>
                        <span className="ml-3">Watch video</span>
                    </a>
                </div>
                <div className="mt-10 flex justify-start gap-x-6 border border-gray-400 w-fit p-3 rounded-lg">
                    <h2 className='font-montserrat'>Assessment type → <span className='font-montserrat2 font-bold'>{activity_type}</span></h2>
                    <h2 className='font-montserrat'>Category → <span className='font-montserrat2 font-bold'>{activity_category}</span></h2>
                </div>
            </div>
            <div className='col-span-4'>
                <img className='' src={image_assc && '/images/girl.jpg'} alt={short_name} />
            </div>
        </div>
        <div className='mx-auto max-w-2xl lg:max-w-[1400px] bg-purple-200 rounded-2xl px-5'>
            <div className="py-10">
                <h3 className='font-montserrat2 tracking-tighter text-5xl'>Objective</h3>
                <p className='mt-5 font-montserrat text-lg'>{objective}</p>
            </div>
        </div>
        <div className='mt-5 mx-auto max-w-2xl lg:max-w-[1400px] bg-blue-200 rounded-2xl px-5'>
            <div className="py-10">
                <h3 className='font-montserrat2 tracking-tighter text-5xl'>{short_name}</h3>
                <div className="mt-5 font-montserrat text-lg" dangerouslySetInnerHTML={{ __html: short_desc }} />
            </div>
        </div>
        <div className="mt-16 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-[1400px]">
                <h1 className="text-3xl font-montserrat2 tracking-tighter text-gray-950 sm:text-6xl">
                    Enhance Skills for Future Success
                </h1>
                <p className="mt-6 pl-1 max-w-3xl text-lg font-montserrat text-gray-500">
                    Developing new skills can broaden your capabilities, improving both personal and professional opportunities.
                </p>
            </div>
        </div>
        <div className="relative py-24">
            <div className="absolute inset-x-2 bottom-0 top-48 rounded-4xl ring-1 ring-inset ring-black/5 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]"></div>
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-[1400px]">
                    <div className="relative">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {cardData.map((card) => (
                                <div
                                    key={card.id}
                                    className="-m-2 grid grid-cols-1 rounded-3xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md"
                                >
                                    <div className="grid grid-cols-1 rounded-3xl p-2 shadow-md shadow-black/5">
                                        <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
                                            {card.icon}
                                            <div className="mt-3">
                                                <h2 className="text-2xl font-montserrat2 tracking-tight font-bold text-gray-950">
                                                    {card.title}
                                                </h2>
                                                <p className="mt-3 font-montserrat font-medium text-gray-500 tracking-tight">
                                                    {card.description}
                                                </p>
                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    onClick={() => openPopup(card)}
                                                    className="inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap uppercase text-sm font-montserrat2 font-bold tracking-wider hover:scale-[1.02] text-white"
                                                >
                                                    Read More
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Popup Overlay */}
                        {isPopupOpen && (
                            <div
                                className="fixed inset-0 z-10 bg-black/30 backdrop-blur-md flex items-center justify-center"
                                onClick={closePopup}
                            >
                                {/* Popup Box */}
                                <div
                                    className="relative bg-white p-8 rounded-3xl max-w-lg w-full m-4 shadow-2xl"
                                    onClick={(e) => e.stopPropagation()} // Prevent close on clicking inside the popup
                                >
                                    {/* Close Button */}
                                    <button
                                        onClick={closePopup}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                    <div className="p-10">
                                        {popupContent.icon}
                                        <div className="mt-3">
                                            <h2 className="text-2xl font-montserrat2 tracking-tight font-bold text-gray-950">
                                                {popupContent.title}
                                            </h2>
                                            <p className="mt-3 font-montserrat font-medium text-gray-500 tracking-tight">
                                                {popupContent.moreData}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="py-24">
                        <h3 className='font-montserrat2 tracking-tighter text-4xl'>Engage and Network</h3>
                        <p className='mt-5 font-montserrat text-lg text-gray-600'>Get involved in our <strong>Student Comment Section</strong> and <strong>Corporate Discussion Forum</strong> to share your thoughts, ask questions, and collaborate with other aspiring professionals.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-16 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-7xl">
                <h1 className="text-pretty text-3xl font-montserrat2 tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl">
                    What You Will Achieve
                </h1>
                <p className="mt-6 max-w-3xl text-lg font-montserrat text-gray-500">
                    Gain new skills and perspectives that empower your future endeavors.
                </p>
            </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
            <div className="mx-auto max-w-2xl lg:max-w-none">
                <div className="lg:flex lg:items-center lg:justify-end">
                    <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
                        <div className="w-[33.75rem] max-sm:w-[22rem] flex-none lg:w-[45rem]" style={{ opacity: 1, transform: 'none' }}>
                            <div className="justify-center lg:justify-end relative flex aspect-[719/680] w-full grayscale">
                                <svg viewBox="0 0 655 680" fill="none" className="h-full">
                                    <g clipPath="url(#clip-path)" className="group">
                                        <g className="origin-center scale-100 transition duration-500 motion-safe:group-hover:scale-105">
                                            <foreignObject width="655" height="680">
                                                <img
                                                    alt="img"
                                                    loading="lazy"
                                                    width="2400"
                                                    height="3000"
                                                    decoding="async"
                                                    data-nimg="1"
                                                    className="w-full bg-neutral-100 object-cover"
                                                    style={{ color: 'transparent', aspectRatio: '655 / 680' }}
                                                    sizes="(min-width: 1024px) 41rem, 31rem"
                                                    srcSet="/images/laptop.webp"
                                                    src="/images/laptop.webp"
                                                />
                                            </foreignObject>
                                        </g>
                                        <use href="#shape" strokeWidth="2" className="stroke-neutral-950/10" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip-path">
                                            <path
                                                id="shape"
                                                d="M537.827 9.245A11.5 11.5 0 0 1 549.104 0h63.366c7.257 0 12.7 6.64 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 586.87 151h-28.275a15.999 15.999 0 0 0-15.689 12.862l-59.4 297c-1.98 9.901 5.592 19.138 15.689 19.138h17.275l.127.001c.85.009 1.701.074 2.549.009 11.329-.874 21.411-7.529 24.88-25.981.002-.012.016-.016.023-.007.008.009.022.005.024-.006l24.754-123.771A11.5 11.5 0 0 1 580.104 321h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 617.87 472H559c-22.866 0-28.984 7.98-31.989 25.931-.004.026-.037.035-.052.014-.015-.02-.048-.013-.053.012l-24.759 123.798A11.5 11.5 0 0 1 490.87 631h-29.132a14.953 14.953 0 0 0-14.664 12.021c-4.3 21.502-23.18 36.979-45.107 36.979H83.502c-29.028 0-50.8-26.557-45.107-55.021l102.4-512C145.096 91.477 163.975 76 185.902 76h318.465c10.136 0 21.179-5.35 23.167-15.288l10.293-51.467Zm-512 160A11.5 11.5 0 0 1 37.104 160h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 74.87 311H11.504c-7.257 0-12.7-6.639-11.277-13.755l25.6-128Z"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ul role="list" className="font-montserrat text-base text-neutral-600 mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
                            {featureData.map((feature, index) => (
                                <li key={index} className="group mt-5 first:mt-0">
                                    <div style={{ opacity: 1, transform: 'none' }}>
                                        <div className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden relative before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
                                            <strong className="font-montserrat text-neutral-950">{feature.title}</strong> {feature.description}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        {/* <section id="testimonials" aria-label="What our customers are saying" className="bg-slate-50 py-20 sm:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl md:text-center">
                        <h2 className="text-pretty text-3xl font-montserrat2 tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl">
                            <span className="relative whitespace-nowrap">
                                <svg aria-hidden="true" viewBox="0 0 281 40" preserveAspectRatio="none" className="absolute left-0 top-1/2 h-[0.8em] w-full fill-blue-300/70"><path fillRule="evenodd" clipRule="evenodd" d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"></path></svg>
                                <span className="relative">Loved by worldwide.</span>
                            </span>
                        </h2>
                        <p className="mt-6 text-lg font-montserrat tracking-tight text-slate-700">
                            "The level of service we received was outstanding. They truly listened to our needs and went above and beyond to deliver a product that exceeded our expectations."
                        </p>
                    </div>
                    <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
                        <li>
                            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                                {testimonials1?.map((testimonial, index) => (
                                    <li key={index}>
                                        <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                                            {quoteSvg}
                                            <blockquote className="relative">
                                                <p className="font-montserrat tracking-tight text-slate-900">
                                                    {testimonial.text}
                                                </p>
                                            </blockquote>
                                            <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                                                <div>
                                                    <div className="font-montserrat2 text-base text-slate-900">{testimonial.name}</div>
                                                    <div className="mt-1 font-montserrat2 text-sm text-slate-500">{testimonial.position}</div>
                                                </div>
                                                <div className="overflow-hidden rounded-full bg-slate-50">
                                                    <img alt="img" loading="lazy" width="56" height="56" decoding="async" className="h-14 w-14 object-cover" src={testimonial.imgSrc} />
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                                {testimonials2?.map((testimonial, index) => (
                                    <li key={index}>
                                        <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                                            {quoteSvg}
                                            <blockquote className="relative">
                                                <p className="font-montserrat tracking-tight text-slate-900">
                                                    {testimonial.text}
                                                </p>
                                            </blockquote>
                                            <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                                                <div>
                                                    <div className="font-montserrat2 text-base text-slate-900">{testimonial.name}</div>
                                                    <div className="mt-1 font-montserrat2 text-sm text-slate-500">{testimonial.position}</div>
                                                </div>
                                                <div className="overflow-hidden rounded-full bg-slate-50">
                                                    <img alt="img" loading="lazy" width="56" height="56" decoding="async" className="h-14 w-14 object-cover" src={testimonial.imgSrc} />
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                                {testimonials3?.map((testimonial, index) => (
                                    <li key={index}>
                                        <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                                            {quoteSvg}
                                            <blockquote className="relative">
                                                <p className="font-montserrat tracking-tight text-slate-900">
                                                    {testimonial.text}
                                                </p>
                                            </blockquote>
                                            <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                                                <div>
                                                    <div className="font-montserrat2 text-base text-slate-900">{testimonial.name}</div>
                                                    <div className="mt-1 font-montserrat2 text-sm text-slate-500">{testimonial.position}</div>
                                                </div>
                                                <div className="overflow-hidden rounded-full bg-slate-50">
                                                    <img alt="img" loading="lazy" width="56" height="56" decoding="async" className="h-14 w-14 object-cover" src={testimonial.imgSrc} />
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
            </section> */}
    </section>

    )
}

export default landing