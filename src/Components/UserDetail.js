'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { API_URL } from '@/Config/Config';
import EmployeeProfile from '@/Components/LinkedInProfile'
import StudentComments from '@/Components/StudentComments'


const CommentsSlider = ({ participant_id }) => {
    const [UserData, setUserData] = useState("inProcess");

    const FetchUserDetails = async (ID) =>{
        const APIURL =`${API_URL}userdetail/get?participant_id=${ID}`
        try{
            const response = await fetch(APIURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },                
            })
            const data = await response.json();
            console.log(data);
            if(data.status === true){
                setUserData(data.data)
            }else{
                setUserData(false)
            }
        }catch (error) {
            // setUserData(false)
        }
            
  }

  useEffect(()=>{
    FetchUserDetails(participant_id)
  }, [participant_id])


console.log(UserData);
  return (
    <div className=''>
        {UserData === "inProcess" ? <>
        <div className='flex gap-5'>
            <div className='w-10 h-10 rounded-full bg-gray-200'></div>
            <div className='flex-1'>
                <span className='w-[50%] block bg-gray-200 h-4 mb-2' />
                <span className='w-full block bg-gray-200 h-4' />
            </div>
        </div>
        </> : UserData && UserData !== "inProcess" ? <>
            <div className='flex gap-5 border-b border-b-gray-100 pb-2'>
                <div className='w-10 h-10 rounded-full overflow-hidden border-2 p-1 bg-white border-cyan-500'>
                    <img src={`https://csip-image.blr1.digitaloceanspaces.com/csip-image/img/content/${UserData.participantpic}`} />
                </div>
                <div className='flex-1'>
                    <p className='text-sm text-gray-800 font-normal'>{UserData.name}fxcbv</p>
                    <p className='text-xs text-gray-800 font-normal'>{UserData.email}</p>
                </div>
            </div>
        </>: null }
      {/* {participant_id} */}
    </div>
  );
};

export default CommentsSlider;
