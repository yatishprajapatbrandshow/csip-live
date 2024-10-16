'use client';

import React, { useState, useEffect } from 'react';
import { CircularProgressBar } from "@/Components/CircularProgressBar";
import ReviewSlider from "@/Components/ReviewSlider";
import TopicModal from '@/Components/TopicModal';
import { SquareX, Star } from 'lucide-react';
import Activities from "@/Components/Activities";
import { API_URL, API_URL_LOCAL } from "@/Config/Config";
import { useSelector } from "react-redux";
import Header from '@/Components/Header';
import ActivityHeader from '@/Components/ActivityHeader';

import { useRouter } from 'next/router';





export default function DashboardCombind() {
    const router = useRouter();


    const isTriggeredApply = useSelector((state) => state.trigger.applyTrigger);
    const userData = useSelector((state) => state.session.userData);

    const FetchActivityDetails = async () =>{
        
        const datatoSend = {
            activityid: 431950
        }
        const APIURL =`${API_URL}activity-progress`

        try{
            const response = await fetch(APIURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datatoSend)
            })
            const data = await response.json();
            console.log(data)
        }catch (error) {
            console.log("Error fetching activity details:", error);
        }
    }
    useEffect(() => {
        FetchActivityDetails();
    }, []);

    return (
        <>
            <div className="relative max-w-[1500px] mx-auto w-full">
              <ActivityHeader />
                <div class="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8 lg:ml-72 xl:ml-80">
                    <main class="flex-auto">
                        <article class="flex h-full flex-col pb-10 pt-16">
                            <div class="flex-auto prose dark:prose-invert [html_:where(&amp;>*)]:mx-auto [html_:where(&amp;>*)]:max-w-2xl [html_:where(&amp;>*)]:lg:mx-[calc(50%-min(50%,theme(maxWidth.lg)))] [html_:where(&amp;>*)]:lg:max-w-3xl">
                                <div class="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
                                    <div class="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
                                        <div class="absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#DBFF75] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100">
                                            <svg aria-hidden="true" class="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/2.5 dark:stroke-white/5">
                                                <defs>
                                                    <pattern id=":S1:" width="72" height="56" patternUnits="userSpaceOnUse" x="-12" y="4"><path d="M.5 56V.5H72" fill="none"></path></pattern>
                                                </defs>
                                                <rect width="100%" height="100%" stroke-width="0" fill="url(#:S1:)"></rect>
                                                <svg x="-12" y="4" class="overflow-visible">
                                                    <rect stroke-width="0" width="73" height="57" x="288" y="168"></rect>
                                                    <rect stroke-width="0" width="73" height="57" x="144" y="56"></rect>
                                                    <rect stroke-width="0" width="73" height="57" x="504" y="168"></rect>
                                                    <rect stroke-width="0" width="73" height="57" x="720" y="336"></rect>
                                                </svg>
                                            </svg>
                                        </div>
                                        <svg viewBox="0 0 1113 440" aria-hidden="true" class="absolute left-1/2 top-0 ml-[-19rem] w-[69.5625rem] fill-white blur-[26px] dark:hidden">
                                            <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <h1>API Documentation</h1>
                                <p class="lead">Use the Protocol API to access contacts, conversations, group messages, and more and seamlessly integrate your product into the workflows of dozens of devoted Protocol users.</p>
                                <div class="not-prose mb-16 mt-6 flex gap-3">
                                    <a
                                        class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
                                        href="/quickstart"
                                    >
                                        Quickstart
                                        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 -mr-1"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path></svg>
                                    </a>
                                    <a
                                        class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white"
                                        href="/sdks"
                                    >
                                        Explore SDKs
                                    </a>
                                </div>
                                <h2 class="scroll-mt-24" id="getting-started">Getting started</h2>
                                <p class="lead">
                                    To get started, create a new application in your <a href="#">developer settings</a>, then read about how to make requests for the resources you need to access using our HTTP APIs or dedicated client SDKs. When your
                                    integration is ready to go live, publish it to our <a href="#">integrations directory</a> to reach the Protocol community.
                                </p>
                                <div class="not-prose">
                                    <a class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500" href="/sdks">
                                        Get your API key
                                        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 relative top-px -mr-1">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path>
                                        </svg>
                                    </a>
                                </div>
                                <div class="my-16 xl:max-w-none">
                                    <h2 class="scroll-mt-24" id="guides">
                                        <a class="group text-inherit no-underline hover:text-inherit" href="#guides">
                                            <div
                                                class="absolute ml-[calc(-1*var(--width))] mt-1 hidden w-[var(--width)] opacity-0 transition [--width:calc(2.625rem+0.5px+50%-min(50%,calc(theme(maxWidth.lg)+theme(spacing.8))))] group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50 2xl:[--width:theme(spacing.10)]"
                                            >
                                                <div
                                                    class="group/anchor block h-5 w-5 rounded-lg bg-zinc-50 ring-1 ring-inset ring-zinc-300 transition hover:ring-zinc-500 dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:hover:ring-zinc-600"
                                                >
                                                    <svg viewBox="0 0 20 20" fill="none" stroke-linecap="round" aria-hidden="true" class="h-5 w-5 stroke-zinc-500 transition dark:stroke-zinc-400 dark:group-hover/anchor:stroke-white">
                                                        <path d="m6.5 11.5-.964-.964a3.535 3.535 0 1 1 5-5l.964.964m2 2 .964.964a3.536 3.536 0 0 1-5 5L8.5 13.5m0-5 3 3"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            Guides
                                        </a>
                                    </h2>
                                    <div class="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
                                        <div>
                                            <h3 class="text-sm font-semibold text-zinc-900 dark:text-white">Authentication</h3>
                                            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Learn how to authenticate your API requests.</p>
                                            <p class="mt-4">
                                                <a class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500" href="/authentication">
                                                    Read more
                                                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 relative top-px -mr-1">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path>
                                                    </svg>
                                                </a>
                                            </p>
                                        </div>
                                        <div>
                                            <h3 class="text-sm font-semibold text-zinc-900 dark:text-white">Pagination</h3>
                                            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Understand how to work with paginated responses.</p>
                                            <p class="mt-4">
                                                <a class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500" href="/pagination">
                                                    Read more
                                                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 relative top-px -mr-1">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path>
                                                    </svg>
                                                </a>
                                            </p>
                                        </div>
                                        <div>
                                            <h3 class="text-sm font-semibold text-zinc-900 dark:text-white">Errors</h3>
                                            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Read about the different types of errors returned by the API.</p>
                                            <p class="mt-4">
                                                <a class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500" href="/errors">
                                                    Read more
                                                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 relative top-px -mr-1">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path>
                                                    </svg>
                                                </a>
                                            </p>
                                        </div>
                                        <div>
                                            <h3 class="text-sm font-semibold text-zinc-900 dark:text-white">Webhooks</h3>
                                            <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Learn how to programmatically configure webhooks for your app.</p>
                                            <p class="mt-4">
                                                <a class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-500" href="/webhooks">
                                                    Read more
                                                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 relative top-px -mr-1">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path>
                                                    </svg>
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="my-16 xl:max-w-none">
                                    <h2 class="scroll-mt-24" id="resources">
                                        <a class="group text-inherit no-underline hover:text-inherit" href="#resources">
                                            <div
                                                class="absolute ml-[calc(-1*var(--width))] mt-1 hidden w-[var(--width)] opacity-0 transition [--width:calc(2.625rem+0.5px+50%-min(50%,calc(theme(maxWidth.lg)+theme(spacing.8))))] group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50 2xl:[--width:theme(spacing.10)]"
                                            >
                                                <div
                                                    class="group/anchor block h-5 w-5 rounded-lg bg-zinc-50 ring-1 ring-inset ring-zinc-300 transition hover:ring-zinc-500 dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:hover:ring-zinc-600"
                                                >
                                                    <svg viewBox="0 0 20 20" fill="none" stroke-linecap="round" aria-hidden="true" class="h-5 w-5 stroke-zinc-500 transition dark:stroke-zinc-400 dark:group-hover/anchor:stroke-white">
                                                        <path d="m6.5 11.5-.964-.964a3.535 3.535 0 1 1 5-5l.964.964m2 2 .964.964a3.536 3.536 0 0 1-5 5L8.5 13.5m0-5 3 3"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            Resources
                                        </a>
                                    </h2>
                                    <div class="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
                                        <div class="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5">
                                            <div class="pointer-events-none">
                                                <div class="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
                                                    <svg aria-hidden="true" class="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5">
                                                        <defs>
                                                            <pattern id=":r1i:" width="72" height="56" patternUnits="userSpaceOnUse" x="50%" y="16"><path d="M.5 56V.5H72" fill="none"></path></pattern>
                                                        </defs>
                                                        <rect width="100%" height="100%" stroke-width="0" fill="url(#:r1i:)"></rect>
                                                        <svg x="50%" y="16" class="overflow-visible">
                                                            <rect stroke-width="0" width="73" height="57" x="0" y="56"></rect>
                                                            <rect stroke-width="0" width="73" height="57" x="72" y="168"></rect>
                                                        </svg>
                                                    </svg>
                                                </div>
                                                <div
                                                    class="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
                                                    
                                                ></div>
                                                <div class="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100">
                                                    <svg aria-hidden="true" class="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10">
                                                        <defs>
                                                            <pattern id=":r1j:" width="72" height="56" patternUnits="userSpaceOnUse" x="50%" y="16"><path d="M.5 56V.5H72" fill="none"></path></pattern>
                                                        </defs>
                                                        <rect width="100%" height="100%" stroke-width="0" fill="url(#:r1j:)"></rect>
                                                        <svg x="50%" y="16" class="overflow-visible">
                                                            <rect stroke-width="0" width="73" height="57" x="0" y="56"></rect>
                                                            <rect stroke-width="0" width="73" height="57" x="72" y="168"></rect>
                                                        </svg>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20"></div>
                                            <div class="relative rounded-2xl px-4 pb-4 pt-16">
                                                <div
                                                    class="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400"
                                                >
                                                    <svg
                                                        viewBox="0 0 20 20"
                                                        aria-hidden="true"
                                                        class="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400"
                                                    >
                                                        <path
                                                            stroke-width="0"
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M10 .5a9.5 9.5 0 0 1 5.598 17.177C14.466 15.177 12.383 13.5 10 13.5s-4.466 1.677-5.598 4.177A9.5 9.5 0 0 1 10 .5ZM12.5 8a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"
                                                        ></path>
                                                        <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M10 .5a9.5 9.5 0 0 1 5.598 17.177A9.458 9.458 0 0 1 10 19.5a9.458 9.458 0 0 1-5.598-1.823A9.5 9.5 0 0 1 10 .5Z"></path>
                                                        <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M4.402 17.677C5.534 15.177 7.617 13.5 10 13.5s4.466 1.677 5.598 4.177M10 5.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"></path>
                                                    </svg>
                                                </div>
                                                <h3 class="mt-4 text-sm font-semibold leading-7 text-zinc-900 dark:text-white">
                                                    <a href="/contacts"><span class="absolute inset-0 rounded-2xl"></span>Contacts</a>
                                                </h3>
                                                <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Learn about the contact model and how to create, retrieve, update, delete, and list contacts.</p>
                                            </div>
                                        </div>
                                        <div class="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5">
                                            <div class="pointer-events-none">
                                                <div class="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
                                                    <svg aria-hidden="true" class="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5">
                                                        <defs>
                                                            <pattern id=":r1k:" width="72" height="56" patternUnits="userSpaceOnUse" x="50%" y="-6"><path d="M.5 56V.5H72" fill="none"></path></pattern>
                                                        </defs>
                                                        <rect width="100%" height="100%" stroke-width="0" fill="url(#:r1k:)"></rect>
                                                        <svg x="50%" y="-6" class="overflow-visible">
                                                            <rect stroke-width="0" width="73" height="57" x="-72" y="112"></rect>
                                                            <rect stroke-width="0" width="73" height="57" x="72" y="168"></rect>
                                                        </svg>
                                                    </svg>
                                                </div>
                                                <div
                                                    class="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
                                                    
                                                ></div>
                                                <div class="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100" >
                                                    <svg aria-hidden="true" class="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10">
                                                        <defs>
                                                            <pattern id=":r1l:" width="72" height="56" patternUnits="userSpaceOnUse" x="50%" y="-6"><path d="M.5 56V.5H72" fill="none"></path></pattern>
                                                        </defs>
                                                        <rect width="100%" height="100%" stroke-width="0" fill="url(#:r1l:)"></rect>
                                                        <svg x="50%" y="-6" class="overflow-visible">
                                                            <rect stroke-width="0" width="73" height="57" x="-72" y="112"></rect>
                                                            <rect stroke-width="0" width="73" height="57" x="72" y="168"></rect>
                                                        </svg>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20"></div>
                                            <div class="relative rounded-2xl px-4 pb-4 pt-16">
                                                <div
                                                    class="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400"
                                                >
                                                    <svg
                                                        viewBox="0 0 20 20"
                                                        aria-hidden="true"
                                                        class="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M10 16.5c4.142 0 7.5-3.134 7.5-7s-3.358-7-7.5-7c-4.142 0-7.5 3.134-7.5 7 0 1.941.846 3.698 2.214 4.966L3.5 17.5c2.231 0 3.633-.553 4.513-1.248A8.014 8.014 0 0 0 10 16.5Z"
                                                        ></path>
                                                        <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.5h5M8.5 11.5h3"></path>
                                                    </svg>
                                                </div>
                                                <h3 class="mt-4 text-sm font-semibold leading-7 text-zinc-900 dark:text-white">
                                                    <a href="/conversations"><span class="absolute inset-0 rounded-2xl"></span>Conversations</a>
                                                </h3>
                                                <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Learn about the conversation model and how to create, retrieve, update, delete, and list conversations.</p>
                                            </div>
                                        </div>
                                        <div class="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5">
                                            <div class="pointer-events-none">
                                                <div class="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
                                                    <svg aria-hidden="true" class="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5">
                                                        <defs>
                                                            <pattern id=":r1m:" width="72" height="56" patternUnits="userSpaceOnUse" x="50%" y="32"><path d="M.5 56V.5H72" fill="none"></path></pattern>
                                                        </defs>
                                                        <rect width="100%" height="100%" stroke-width="0" fill="url(#:r1m:)"></rect>
                                                        <svg x="50%" y="32" class="overflow-visible">
                                                            <rect stroke-width="0" width="73" height="57" x="0" y="112"></rect>
                                                            <rect stroke-width="0" width="73" height="57" x="72" y="224"></rect>
                                                        </svg>
                                                    </svg>
                                                </div>
                                                <div
                                                    class="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
                                                
                                                ></div>
                                                <div class="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100" >
                                                    <svg aria-hidden="true" class="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10">
                                                        <defs>
                                                            <pattern id=":r1n:" width="72" height="56" patternUnits="userSpaceOnUse" x="50%" y="32"><path d="M.5 56V.5H72" fill="none"></path></pattern>
                                                        </defs>
                                                        <rect width="100%" height="100%" stroke-width="0" fill="url(#:r1n:)"></rect>
                                                        <svg x="50%" y="32" class="overflow-visible">
                                                            <rect stroke-width="0" width="73" height="57" x="0" y="112"></rect>
                                                            <rect stroke-width="0" width="73" height="57" x="72" y="224"></rect>
                                                        </svg>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20"></div>
                                            <div class="relative rounded-2xl px-4 pb-4 pt-16">
                                                <div
                                                    class="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400"
                                                >
                                                    <svg
                                                        viewBox="0 0 20 20"
                                                        aria-hidden="true"
                                                        class="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400"
                                                    >
                                                        <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M2.5 5.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-8Z"></path>
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 10 4.526 5.256c-.7-.607-.271-1.756.655-1.756h9.638c.926 0 1.355 1.15.655 1.756L10 10Z"></path>
                                                    </svg>
                                                </div>
                                                <h3 class="mt-4 text-sm font-semibold leading-7 text-zinc-900 dark:text-white">
                                                    <a href="/messages"><span class="absolute inset-0 rounded-2xl"></span>Messages</a>
                                                </h3>
                                                <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Learn about the message model and how to create, retrieve, update, delete, and list messages.</p>
                                            </div>
                                        </div>
                                        <div class="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5">
                                            <div class="pointer-events-none">
                                                <div class="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
                                                    <svg aria-hidden="true" class="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5">
                                                        <defs>
                                                            <pattern id=":r1o:" width="72" height="56" patternUnits="userSpaceOnUse" x="50%" y="22"><path d="M.5 56V.5H72" fill="none"></path></pattern>
                                                        </defs>
                                                        <rect width="100%" height="100%" stroke-width="0" fill="url(#:r1o:)"></rect>
                                                        <svg x="50%" y="22" class="overflow-visible"><rect stroke-width="0" width="73" height="57" x="0" y="56"></rect></svg>
                                                    </svg>
                                                </div>
                                                <div
                                                    class="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
                                                    
                                                ></div>
                                                <div class="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100" >
                                                    <svg aria-hidden="true" class="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10">
                                                        <defs>
                                                            <pattern id=":r1p:" width="72" height="56" patternUnits="userSpaceOnUse" x="50%" y="22"><path d="M.5 56V.5H72" fill="none"></path></pattern>
                                                        </defs>
                                                        <rect width="100%" height="100%" stroke-width="0" fill="url(#:r1p:)"></rect>
                                                        <svg x="50%" y="22" class="overflow-visible"><rect stroke-width="0" width="73" height="57" x="0" y="56"></rect></svg>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20"></div>
                                            <div class="relative rounded-2xl px-4 pb-4 pt-16">
                                                <div
                                                    class="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400"
                                                >
                                                    <svg
                                                        viewBox="0 0 20 20"
                                                        aria-hidden="true"
                                                        class="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400"
                                                    >
                                                        <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M10.046 16H1.955a.458.458 0 0 1-.455-.459C1.5 13.056 3.515 11 6 11h.5"></path>
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15.454C7.5 12.442 9.988 10 13 10s5.5 2.442 5.5 5.454a.545.545 0 0 1-.546.546H8.045a.545.545 0 0 1-.545-.546Z"></path>
                                                        <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M6.5 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"></path>
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"></path>
                                                    </svg>
                                                </div>
                                                <h3 class="mt-4 text-sm font-semibold leading-7 text-zinc-900 dark:text-white">
                                                    <a href="/groups"><span class="absolute inset-0 rounded-2xl"></span>Groups</a>
                                                </h3>
                                                <p class="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Learn about the group model and how to create, retrieve, update, delete, and list groups.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer class="mx-auto mt-16 w-full max-w-2xl lg:max-w-5xl">
                                <div class="relative h-8">
                                    <form class="duration-300 data-[leave]:pointer-events-none data-[closed]:opacity-0 absolute inset-0 flex items-center justify-center gap-6 md:justify-start">
                                        <p class="text-sm text-zinc-600 dark:text-zinc-400">Was this page helpful?</p>
                                        <div class="group grid h-8 grid-cols-[1fr,1px,1fr] overflow-hidden rounded-full border border-zinc-900/10 dark:border-white/10">
                                            <button type="submit" class="px-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white" data-response="yes">
                                                Yes
                                            </button>
                                            <div class="bg-zinc-900/10 dark:bg-white/10"></div>
                                            <button type="submit" class="px-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white" data-response="no">
                                                No
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </footer>
                        </article>
                    </main>
                    <footer class="mx-auto w-full max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
                        <div class="flex">
                            <div class="ml-auto flex flex-col items-end gap-3">
                                <a
                                    class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                                    aria-label="Next: Quickstart"
                                    href="/quickstart"
                                >
                                    Next<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 -mr-1"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path></svg>
                                </a>
                                <a tabindex="-1" aria-hidden="true" class="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300" href="/quickstart">Quickstart</a>
                            </div>
                        </div>
                        <div class="flex flex-col items-center justify-between gap-5 border-t border-zinc-900/5 pt-8 sm:flex-row dark:border-white/5">
                            <p class="text-xs text-zinc-600 dark:text-zinc-400">

                            </p>
                            <div class="flex gap-4">
                                <a class="group" href="#">
                                    <span class="sr-only">Follow us on X</span>
                                    <svg viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-900 dark:group-hover:fill-zinc-500">
                                        <path
                                            d="M11.1527 8.92804L16.2525 3H15.044L10.6159 8.14724L7.07919 3H3L8.34821 10.7835L3 17H4.20855L8.88474 11.5643L12.6198 17H16.699L11.1524 8.92804H11.1527ZM9.49748 10.8521L8.95559 10.077L4.644 3.90978H6.50026L9.97976 8.88696L10.5216 9.66202L15.0446 16.1316H13.1883L9.49748 10.8524V10.8521Z"
                                        ></path>
                                    </svg>
                                </a>
                                <a class="group" href="#">
                                    <span class="sr-only">Follow us on GitHub</span>
                                    <svg viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-900 dark:group-hover:fill-zinc-500">
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M10 1.667c-4.605 0-8.334 3.823-8.334 8.544 0 3.78 2.385 6.974 5.698 8.106.417.075.573-.182.573-.406 0-.203-.011-.875-.011-1.592-2.093.397-2.635-.522-2.802-1.002-.094-.246-.5-1.005-.854-1.207-.291-.16-.708-.556-.01-.567.656-.01 1.124.62 1.281.876.75 1.292 1.948.93 2.427.705.073-.555.291-.93.531-1.143-1.854-.213-3.791-.95-3.791-4.218 0-.929.322-1.698.854-2.296-.083-.214-.375-1.09.083-2.265 0 0 .698-.224 2.292.876a7.576 7.576 0 0 1 2.083-.288c.709 0 1.417.096 2.084.288 1.593-1.11 2.291-.875 2.291-.875.459 1.174.167 2.05.084 2.263.53.599.854 1.357.854 2.297 0 3.278-1.948 4.005-3.802 4.219.302.266.563.78.563 1.58 0 1.143-.011 2.061-.011 2.35 0 .224.156.491.573.405a8.365 8.365 0 0 0 4.11-3.116 8.707 8.707 0 0 0 1.567-4.99c0-4.721-3.73-8.545-8.334-8.545Z"
                                        ></path>
                                    </svg>
                                </a>
                                <a class="group" href="#">
                                    <span class="sr-only">Join our Discord server</span>
                                    <svg viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-900 dark:group-hover:fill-zinc-500">
                                        <path
                                            d="M16.238 4.515a14.842 14.842 0 0 0-3.664-1.136.055.055 0 0 0-.059.027 10.35 10.35 0 0 0-.456.938 13.702 13.702 0 0 0-4.115 0 9.479 9.479 0 0 0-.464-.938.058.058 0 0 0-.058-.027c-1.266.218-2.497.6-3.664 1.136a.052.052 0 0 0-.024.02C1.4 8.023.76 11.424 1.074 14.782a.062.062 0 0 0 .024.042 14.923 14.923 0 0 0 4.494 2.272.058.058 0 0 0 .064-.02c.346-.473.654-.972.92-1.496a.057.057 0 0 0-.032-.08 9.83 9.83 0 0 1-1.404-.669.058.058 0 0 1-.029-.046.058.058 0 0 1 .023-.05c.094-.07.189-.144.279-.218a.056.056 0 0 1 .058-.008c2.946 1.345 6.135 1.345 9.046 0a.056.056 0 0 1 .059.007c.09.074.184.149.28.22a.058.058 0 0 1 .023.049.059.059 0 0 1-.028.046 9.224 9.224 0 0 1-1.405.669.058.058 0 0 0-.033.033.056.056 0 0 0 .002.047c.27.523.58 1.022.92 1.495a.056.056 0 0 0 .062.021 14.878 14.878 0 0 0 4.502-2.272.055.055 0 0 0 .016-.018.056.056 0 0 0 .008-.023c.375-3.883-.63-7.256-2.662-10.246a.046.046 0 0 0-.023-.021Zm-9.223 8.221c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.717 1.814-1.618 1.814Zm5.981 0c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.71 1.814-1.618 1.814Z"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>

            </div>
        </>
    );
}
