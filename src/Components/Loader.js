import React from 'react';

const Loader = () => {
    return (
        <>
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-4 pb-16 pt-20 lg:pt-32 grid grid-cols-12 gap-5">
                <div className='col-span-8'>
                    <div className="h-14 bg-gray-300 animate-pulse rounded mb-6 max-w-4xl"></div>
                    <div className="h-8 bg-gray-300 animate-pulse rounded mb-8 max-w-md"></div>
                    <div className="h-12 bg-gray-300 animate-pulse rounded mb-4 w-16"></div>
                    <div className="mt-10 flex justify-start gap-x-6">
                        <div className="h-10 w-36 bg-gray-300 animate-pulse rounded-full"></div>
                        <div className="h-10 w-36 bg-gray-300 animate-pulse rounded-full"></div>
                    </div>
                    <div className="mt-12 h-12 max-w-lg bg-gray-300 animate-pulse rounded-md"></div>
                </div>
                <div className='col-span-4'>
                    <div className="h-full bg-gray-300 animate-pulse "></div>
                </div>
            </div>
            <div className='mx-auto max-w-2xl lg:max-w-[1400px] bg-gray-300 rounded-2xl px-5 py-10'>
                <div className="h-12 w-52 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
            </div>
            <div className='mt-5 mx-auto max-w-2xl lg:max-w-[1400px] bg-gray-300 rounded-2xl px-5 py-10'>
                <div className="h-12 max-w-lg bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
            </div>
        </>
    );
};

export default Loader;
