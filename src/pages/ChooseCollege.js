"use client";
import CardCorporate from '@/Components/CardCorporate';
import { ArrowLeft, Check, Home, MousePointerClick, Search, SquareMousePointer, Undo2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { API_URL, API_URL_LOCAL } from '@/Config/Config';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
function ChooseCollege() {
  const [allCurriculum, setAllCurriculum] = useState([]);
  const [AllCollege, setAllCollege] = useState([]);
  const router = useRouter();
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
    router.push('/curriculum-details')
  }

  const fecthColleges = async (value) => {
    console.log(value);

    try {
      const response = await fetch(`${API_URL}college/?name=${value}&limit=12`, {
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
        setAllCollege(responseData.data)
      }
    } catch (error) {
      // setError("Failed to fetch activities.");
    }
  }

  const onSearchChange = (e) => {
    if (e.target.value.length < 1 || e.target.value.trim() === "") {
      return;
    }
    fecthColleges(e.target.value);
  }
  return (
    <div className="pl-10 p-6 bg-white w-full h-screen ">
      <div className='flex items-center gap-2 mb-4 '><Undo2 className='w-5 h-5' />Go Back</div>
      <h2 className='my-10 text-4xl font-gilBold  '>
        Search College
      </h2>
      <input
        type="text"
        onChange={onSearchChange}
        placeholder="Search..."
        className="w-full max-w-md p-2 border rounded-md focus:outline-none"
      />
      <div>
        <div className='w-full h-max mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {
            AllCollege.map((ele, index) => {
              return (
                <div key={index} className="px-4 py-2 flex items-center space-x-3 rounded-lg shadow-md border-[1px] border-[#FEBBCC]"
                  style={{
                    backgroundImage: "url('../../images/pattern.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "right"
                  }}>
                  <div className="bg-gray-100 rounded-lg p-2">
                    <Home className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-sm font-medium text-gray-800 mb-2">{ele.collegename}</h2>
                    <div>
                      <button className="bg-violet-400 gap-2 px-2 hover:bg-violet-500 text-white text-sm font-medium py-1 rounded-lg transition duration-300 ease-in-out flex justify-center items-center">
                        <SquareMousePointer className='w-4 h-4' />
                        Choose Curriculum
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  );
}

export default ChooseCollege;
