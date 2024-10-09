"use client";
import CardCorporate from '@/Components/CardCorporate';
import { ArrowLeft, Check, MousePointerClick, Search, Undo2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { API_URL, API_URL_LOCAL } from '@/Config/Config';
import { useSelector } from 'react-redux';
import Header from '@/Components/Header';
import { useRouter } from 'next/router';
function AllCurriculum() {
  const router = useRouter();
  const [allCurriculum, setAllCurriculum] = useState([]);
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
      <div className="pl-10 p-6 bg-[#F0F0F0] w-full h-screen ">
        <div className='flex items-center gap-2 mb-4 '><Undo2 className='w-5 h-5' />Go Back</div>
        {
          allCurriculum.map((ele, index) => {
            return <div className='w-[350px] h-20 bg-[#FFFFFF]  rounded-lg border-[1px] border-[#FFECF1] mb-2 flex justify-start p-2 gap-5' style={{ backgroundImage: "url('../../images/pattern.svg')", backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "right" }} >
              <div className='w-20 bg-red-400 object-cover overflow-hidden'>
                <img src="https://csip.fieindia.org/images/activity/image-banner.jpg" alt='logo' className='w-full h-full scale-125' />
              </div>
              <div className='text-sm flex  flex-col items-start gap-2 font-medium'> {ele.name}  <button onClick={() => handleClick(ele)} className=' text-xs text-[#9779FF] hover:text-[#8d6eff]'> View Curriculum</button></div>
            </div>
          })
        }
      </div>
    </>
  );
}

export default AllCurriculum;

