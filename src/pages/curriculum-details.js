"use client";
import CardCorporate from '@/Components/CardCorporate';
import { ArrowLeft, Check, MousePointerClick, Search, Undo2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { API_URL, API_URL_LOCAL } from '@/Config/Config';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Header from '@/Components/Header';

function Curriculum() {
  const router = useRouter();
  const [CurriculumData, setCurriculumData] = useState();
  const [groupsData, setGroupData] = useState([]);
  const [curriId, setcurriId] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.session.userData);
  const [clickedCurriculum, setClickedCurriculum] = useState({});

  useEffect(() => {
    if (router.query.item) {
      const parsedItem = JSON.parse(router.query.item);
      console.log(parsedItem);
      setClickedCurriculum(parsedItem);
      fetchCurriculumDetails(parsedItem)
    }
  }, [router.query]);


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
      if (responseData.status === true) {
        console.log("User Mapped with this Curriculum : ", responseData.data[0].curriculum_id);
        setcurriId(responseData.data[0].curriculum_id);
      }
    } catch (error) {
      setError("Failed to fetch activities.");
    } finally {
      setLoading(false); // Set loading to false after fetch is done
    }
  };

  const chooseCurriculum = async (sid) => {

    try {
      const response = await fetch(`${API_URL}curriculum/choose`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify({ participant_id: userData?.sid, curriculum_id: sid }),
      });

      const responseData = await response.json();
      if (responseData.status === true) {
        console.log(responseData);
        setcurriId(responseData.data.curriculum_id);
      }
    } catch (error) {
      setError("Failed to fetch activities.");
    } finally {
      setLoading(false); // Set loading to false after fetch is done
    }
  };

  const fetchCurriculumDetails = async (value) => {
    if (!value) {
      return;
    }
    // Only append corporate_id if it's defined
    const APIURL = `${API_URL}curriculum/details?curriculum_sid=${value}`;

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
        setCurriculumData(responseData?.data?.curriculum);
        setGroupData(responseData?.data?.groups);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
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
    setLoading(true)
    if (userData) {
      fetchCurriculumID();
    }
  }, [userData]);

  const handleClick = (sid) => {
    chooseCurriculum(sid);
  }

  return (
    <>
      <Header />
      <div className="bg-white w-full max-w-6xl mx-auto shadow-xl mt-10">
      <div className='flex items-center gap-2 mb-4 cursor-pointer ' onClick={() => router.back()}><Undo2 className='w-5 h-5' />Go Back</div>
        {
          loading ? <div className='text-center'>Loading ....</div> :
            <div className='bg-white w-full '>
              <h5 className="text-2xl p-2 px-4 uppercase rounded-t-lg text-white bg-blue-600 ">{CurriculumData?.name}</h5>
              <div className='p-10'>
                {
                  curriId !== clickedCurriculum &&
                  <button onClick={() => handleClick(clickedCurriculum)} className='mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition'>
                    Choose This Curriculum
                  </button>
                }
                <div className='grid grid-cols-2 gap-5'>
                  {
                    groupsData.map((item, index) =>
                      <ul className=' mb-5 col-span-1 max-md:col-span-2' key={index}>
                        {item.topics.length > 0 && <h4 className='mb-3 text-gray-900 font-medium '>{item?.groupName}</h4>}
                        {
                          item?.topics.map((ele, idx) =>
                            <li className={`list-none gap-10 border-t border-[#F9DAEA] py-[.25rem] ${idx === item?.topics.length - 1 && 'border-b-[1px] border-[#F9DAEA] '}`}>
                              {/* Column for Check and Topic Name */}
                              <div className="flex items-center gap-5 w-full">
                                <p className="text-gray-700 font-medium text-sm">{ele?.topic}</p>
                              </div>
                            </li>
                          )
                        }
                      </ul>
                    )
                  }
                </div>
              </div>
            </div>
        }
      </div>
    </>
  );
}

export default Curriculum;
