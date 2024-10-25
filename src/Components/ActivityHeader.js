'use client';
 
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useRouter } from 'next/router';
import { decrypt, encrypt } from '@/utils/cryptoUtils';
 
const CommentsSlider = ({ data }) => {

    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const [ParamId, setParamId] = useState("");

    useEffect(() => {
        if (router.query.item) {
            setParamId(router.query.item)
        }
    }, [router.query]);
 
    const handleNext = () => {
        let nextIndex = activeIndex + 1;
        while (nextIndex < data.length && !data[nextIndex].data) {
            nextIndex++; // Skip over items with data: false
        }
        if (nextIndex < data.length) {
          setActiveIndex(nextIndex);
          router.push(`/activity/${data[nextIndex].name}?item=${ParamId}`);
        }
      };
   
      // Find the previous item where data is true
      const handlePrev = () => {
        let prevIndex = activeIndex - 1;
        while (prevIndex >= 0 && !data[prevIndex].data) {
            prevIndex--; // Skip over items with data: false
        }
        if (prevIndex >= 0) {
          setActiveIndex(prevIndex);
          router.push(`/activity/${data[prevIndex].name}?item=${ParamId}`);
        }
      };
   
      const handleButtonClick = (index) => {
        if (data[index].data) {
          setActiveIndex(index);
        //   console.log(encrypt(JSON.stringify(ParamId)))
          router.push(`/activity/${data[index].name}?item=${ParamId}`);
        }
      };
 
    return (
        <>
         
            <header class="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex">
                <div class="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 xl:w-80 lg:dark:border-white/10">
                    <div class="hidden lg:flex">
                        <a aria-label="Home" href="/">
                            <img
                                alt="CSIP"
                                src="/images/logo.jpg"
                                className="h-12 w-auto"
                            />
                        </a>
                    </div>
                    <div
                        class="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80 backdrop-blur-sm lg:left-72 xl:left-80 dark:backdrop-blur bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]"
                       
                    >
                        <div class="absolute inset-x-0 top-full h-px transition bg-zinc-900/7.5 dark:bg-white/7.5"></div>
                        <div class="hidden lg:block lg:max-w-md lg:flex-auto">
                            <button
                                type="button"
                                class="hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 ui-not-focus-visible:outline-none lg:flex dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20"
                            >
                                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="h-5 w-5 stroke-current">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"></path>
                                </svg>
                                Find something...<kbd class="ml-auto text-2xs text-zinc-400 dark:text-zinc-500"><kbd class="font-sans">⌘</kbd><kbd class="font-sans">K</kbd></kbd>
                            </button>
                           
                        </div>
                        <div class="flex items-center gap-5 lg:hidden">
                            <button type="button" class="flex h-8 w-8 mt-2 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5" aria-label="Toggle navigation">
                                <svg viewBox="0 0 10 9" fill="none" stroke-linecap="round" aria-hidden="true" class="w-8 stroke-zinc-900 dark:stroke-white"><path d="M.5 1h9M.5 8h9M.5 4.5h9"></path></svg>
                            </button>
                           
                            <img
                                alt="CSIP"
                                src="/images/logo.jpg"
                                className="h-12 w-auto"
                            />
                        </div>
                        <div class="flex items-center gap-5">
                            <nav class="hidden md:block">
                                <ul role="list" class="flex items-center gap-8">
                                    {/* <li><a class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/">Dashboard</a></li> */}
                                    <li><button onClick={()=> router.push("/AppliedActivity")} class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" >Apply activity</button></li>
                                    <li><button onClick={()=> router.push("/OngoingActivities")} class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" >Topic studying</button></li>
                                </ul>
                            </nav>
                            {/* <div class="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div> */}
                            {/* <div class="flex gap-4">
                                <div class="contents lg:hidden">
                                    <button type="button" class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 ui-not-focus-visible:outline-none lg:hidden dark:hover:bg-white/5" aria-label="Find something...">
                                        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="h-5 w-5 stroke-zinc-900 dark:stroke-white">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"></path>
                                        </svg>
                                    </button>
                                   
                                </div>
                                <button type="button" class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5" aria-label="Switch to dark theme">
                                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="h-5 w-5 stroke-zinc-900 dark:hidden">
                                        <path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
                                        <path stroke-linecap="round" d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 15.5v-1M6.11 13.889l.708-.707M4.5 10h1M6.11 6.111l.708.707"></path>
                                    </svg>
                                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="hidden h-5 w-5 stroke-white dark:block"><path d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z"></path></svg>
                                </button>
                            </div> */}
                            <div class="hidden min-[416px]:contents">
                                <button
                                onClick={()=> router.push("/dashboard")}
                                    class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
                                   
                                >
                                    Back to Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                   
                    <nav class="lg:mt-10 lg:block">
                        <ul role="list">
                            {data === 'inProcess' ? (
                                <div className='flex flex-col gap-5'>
                                    <span className='w-52 h-7 rounded-lg bg-gray-200'></span>
                                    <span className='w-52 h-7 rounded-lg bg-gray-200'></span>
                                    <span className='w-52 h-7 rounded-lg bg-gray-200'></span>
                                    <span className='w-52 h-7 rounded-lg bg-gray-200'></span>
                                    <span className='w-52 h-7 rounded-lg bg-gray-200'></span>
                                    <span className='w-52 h-7 rounded-lg bg-gray-200'></span>
                                </div>
                            ) : data && data !== 'inProcess' ? (
                                data.map((key, index) => {
                                    const formattedKey = key.name.replace(/[_-]/g, ' ');
                                    return (
                                        <li key={key.name}>
                                            <button
                                                disabled={!key.data}
                                                onClick={() => handleButtonClick(index)}
                                                className={`${!key.data ? 'opacity-50' : ''
                                                    } block capitalize py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white ${index === activeIndex ? 'font-bold' : ''
                                                    }`}
                                            >
                                                {formattedKey}
                                            </button>
                                        </li>
                                    );
                                })
                            ) : null}
 
                        </ul>
 
                       
                    </nav>
                    
                    <div
                        class="fixed inset-x-0 bottom-0 z-50 flex h-24 items-center justify-between gap-12 transition lg:left-72 lg:z-30  xl:left-80 backdrop-blur-sm dark:backdrop-blur ]"  
                    >
                         {data && data !== 'inProcess' ? <>
                        {data?.map((key, index) => {
                            const formattedKey = key.name.replace(/[_-]/g, ' ');
                            return (
                                    index === activeIndex ?
                                    <span
                                    title={formattedKey}
                                        className={`fixed  bottom-0 left-[50%] -translate-x-[50%] depth  font-montserrat font-black depth text-[100px] uppercase whitespace-nowrap `}
                                    >
                                        {formattedKey}
                                    </span>
                                    : null
                                
                            );
                        })}
                    </> :null}
                        <div className='flex justify-between items-center mt-4 w-full h-full px-8'>
                            <button className='bg-slate-300 flex py-2 px-5 rounded-full flex-row-reverse absolute left-10 z-20'
                                onClick={handlePrev}
                                disabled={activeIndex === 0}
                            >
                                Prev
                                <span className='rotate-180 mt-[2px]'>
                                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 -mr-1"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path></svg>
                                </span>
                            </button>
                            <button className='bg-slate-300 flex py-2 px-5 rounded-full absolute right-10 z-20'
                                onClick={handleNext}
                                disabled={activeIndex === data.length - 1}
                            >
                                Next<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 -mr-1"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
           
        </>
    )
}
 
export default CommentsSlider
