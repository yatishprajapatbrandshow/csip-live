"use client";
import CardCorporate from '@/Components/CardCorporate';
import { ArrowLeft, Check, MousePointerClick, Search, Undo2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { API_URL, API_URL_LOCAL } from '@/Config/Config';
import { useSelector } from 'react-redux';
import Header from '@/Components/Header';
import { useRouter } from 'next/router';
import { getLocalStorageItem } from '@/Config/localstorage';
function AllCurriculum() {

  const [isSession, setIsSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = getLocalStorageItem("userData");
    if (userData) {
      setIsSession(true);
      if (userData.type !== "Participant") {
        router.push('/')
      }
    } else {
      router.push('/')
      setIsSession(false);
    }
  }, []);

  const [allCurriculum, setAllCurriculum] = useState("inProcess");
  const fetchCurriculum = async () => {
    // Only append corporate_id if it's defined
    try {
      const response = await fetch(`${API_URL}curriculum/`, {
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
      // setError("Failed to fetch activities.");
    }
  };

  useEffect(() => {
    fetchCurriculum()
  }, [])

  const handleClick = (item) => {
    router.push({
      pathname: '/curriculum-details',
      query: { item: JSON.stringify(item.sid) }
    });
  };
  return (
    <>
      <Header />
      <div className="pl-10 p-6 max-w-7xl w-full h-screen bg-white">
        <button onClick={() => router.back()} className="flex items-center  mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
        {allCurriculum === "inProcess" ?
          <>
            <div className='flex flex-wrap gap-5'>
              <div className='w-[350px] bg-white shadow-md p-2 rounded-lg border-[1px] border-[#FFECF1]'>
                <div role="status" className="animate-pulse w-full mb-2">
                  <div className="h-2 bg-gray-200 rounded-full "></div>
                  <div className="h-2 bg-gray-200 rounded-full  mt-2"></div>
                  <span className="sr-only">Loading...</span>
                </div>
                <div role="status" className="animate-pulse w-full mb-2">
                  <div className="h-2 bg-gray-200 rounded-full "></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
              <div className='w-[350px] bg-white shadow-md p-2 rounded-lg border-[1px] border-[#FFECF1]'>
                <div role="status" className="animate-pulse w-full mb-2">
                  <div className="h-2 bg-gray-200 rounded-full "></div>
                  <div className="h-2 bg-gray-200 rounded-full  mt-2"></div>
                  <span className="sr-only">Loading...</span>
                </div>
                <div role="status" className="animate-pulse w-full mb-2">
                  <div className="h-2 bg-gray-200 rounded-full "></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </>
          : allCurriculum.length && allCurriculum.length > 0 ?
            <>
              <div className='flex flex-wrap gap-5'>
                {allCurriculum.map((ele, index) => {
                  return <div className='w-[350px] shadow-lg h-20 bg-[#FFFFFF]  rounded-lg border-[1px] border-[#FFECF1] mb-2 flex justify-start p-2 gap-5' style={{ backgroundImage: "url('../../images/pattern.svg')", backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "right" }} >
                    <div className='w-20 bg-gray-100 object-cover overflow-hidden'>
                      <img src="https://csip.fieindia.org/images/activity/image-banner.jpg" alt='logo' className='w-full h-full object-contain mix-blend-multiply' />
                    </div>
                    <div className='text-sm flex  flex-col items-start gap-2 font-medium'> {ele.name}  <button onClick={() => handleClick(ele)} className=' text-xs text-[#9779FF] hover:text-[#8d6eff]'> View Curriculum</button></div>
                  </div>
                })}
              </div>
            </> : null}

      </div>
    </>
  );
}

export default AllCurriculum;

