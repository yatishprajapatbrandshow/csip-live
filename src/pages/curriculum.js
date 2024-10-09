"use client";
import CardCorporate from '@/Components/CardCorporate';
import { ArrowLeft, Check, MousePointerClick, Search, Undo2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { API_URL, API_URL_LOCAL } from '@/Config/Config';
import { useSelector } from 'react-redux';

function Curriculum() {
  const [CurriculumData, setCurriculumData] = useState();
  const [groupsData, setGroupData] = useState([]);
  const [curriId, setcurriId] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const userData = useSelector((state) => state.session.userData);

  const fetchCurriculumID = async () => {

    // Only append corporate_id if it's defined
    const APIURL = userData?.sid
      ? `${API_URL}curriculum/maped-curriculum?participant_id=${userData?.sid}`
      : `${API_URL}curriculum/maped-curriculum?participant_id=${0}`;

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
        setcurriId(responseData.data[0].curriculum_id);
      }
    } catch (error) {
      setError("Failed to fetch activities.");
    } finally {
      setLoading(false); // Set loading to false after fetch is done
    }
  };

  const fetchCurriculumDetails = async () => {
    // Only append corporate_id if it's defined
    const APIURL = `${API_URL}curriculum/details?curriculum_sid=${curriId}`;

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
      if (responseData.status === true) {
        console.log(responseData);

        setCurriculumData(responseData?.data?.curriculum);
        setGroupData(responseData?.data?.groups);
        setLoading(false)
      }
    } catch (error) {
      setError("Failed to fetch activities.");
    } finally {
      setLoading(false); // Set loading to false after fetch is done
    }
  }
  
  useEffect(() => {
    if (curriId) {
      fetchCurriculumDetails();
    }
  }, [curriId])
  useEffect(() => {
    if (userData) {
      fetchCurriculumID();
    }
  }, [userData]);

  const handleClick = (item, topic) => {
    console.log(item);
    console.log(topic);
  }
  
  if (loading) return <div className="text-center w-full ">Loading...</div>; // Loading state

  return (
    <div className="pl-10 p-6 bg-[#F0F0F0] w-full">
      <div className='flex items-center gap-2 mb-4 '><Undo2 className='w-5 h-5' />Go Back</div>
      <div className='bg-white  w-full p-6'>
        <h1 className="text-3xl font-gilBold mb-6">Curriculum</h1>
        <h5 className="text-sm text-gray-700 mb-3">{CurriculumData?.name}</h5>
        {
          groupsData.map((item, index) =>
            <ul className=' border-b-[1px] border-[#F9DAEA] mb-5' key={index}>
              <h4 className='mb-3 text-gray-900 font-medium'>{item?.groupName}</h4>
              {
                item?.topics.map((ele, idx) =>
                  <li className="list-none grid grid-cols-4 gap-10 border-t border-[#F9DAEA] py-[.25rem]">
                    {/* Column for Check and Topic Name */}
                    <div className="flex items-center gap-5 col-span-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-gray-500" />
                      </div>
                      <p className="text-gray-700 font-medium text-sm">{ele?.topic}</p>
                    </div>

                    {/* Column for Search Activity */}
                    <div className="flex items-center col-span-1 text-gray-600  font-medium text-sm cursor-pointer">
                      <Search className="text-[#9779FF] w-4 h-4 mr-2" />
                      <span >Search Activity</span>
                    </div>

                    {/* Column for Click to Select */}
                    <div className="flex items-center justify-center col-span-1">
                      <button onClick={() => { handleClick(item, ele) }} className="flex items-center bg-[#9779FF] text-white py-1 px-4  text-sm hover:bg-[#8A6CE0] transition-colors duration-200">
                        <MousePointerClick className="w-4 h-4 mr-2" />
                        <span>Click to Select</span>
                      </button>
                    </div>
                  </li>
                )
              }
            </ul>
          )
        }
      </div>
    </div>
  );
}

export default Curriculum;
