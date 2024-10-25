import React, { useState, useEffect } from "react";
import {GetProfileDetail} from '@/function/GetProfileDetail'

const EmployeeProfile = ({ employee }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("console.log(URL);")
    const fetchData = async () => {
      const data = await GetProfileDetail(employee.linkedInProfile);
      if(data){
        console.log(data)
      }
      setProfileData(data);
      setLoading(false);
    };
    console.log("console.log(URL);")
    if (employee.linkedInProfile) {
      fetchData();
    } else {
      setLoading(false); // No profile to fetch
    }
  }, [employee.linkedInProfile]);
console.log(profileData)
  return (
    <>
        {loading ? (
        <p>Loading profile data...</p>
      ) : (
        <>
        {profileData ? <>
          <div class="flex rounded-lg bg-white p-5 shadow-lg gap-5">


            <span class="w-32 h-32">
              <img class="objec-contain" src={profileData.ogimage} alt="" />
            </span>
            <div className="flex-1">
              <h3 class="text-lg font-medium text-gray-700">{profileData.title}</h3>
              <p className="text-sm text-gray-700">{profileData.description}dg</p>
            </div>
          </div>
        </> : <>
        <div className="w-full items-end overflow-hidden rounded-[2.5rem] border bg-white p-2 shadow-md shadow-gray-950/5">
          <div className="space-y-1.5 rounded-[2rem] border bg-gray-200/50 p-1.5 sm:w-full">
            <div className="space-y-3 rounded-b-lg rounded-t-[1.625rem] bg-white p-4 flex gap-5">
              <span class="w-32 h-32 block">
                <img class="objec-contain rounded-lg " src={`/images/1c5u578iilxfi4m4dvc4q810q.svg`} alt="" />
              </span>
              <div className="flex-1">
                <h3 class="text-lg font-medium text-gray-700">{employee.name} </h3>
                <p className="text-sm text-gray-700">{employee.companyName}</p>
                  <a
                    href={employee.linkedInProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-xs mt-4"
                  >
                    View LinkedIn Profile
                  </a>
              </div>
            </div>
            <div className="rounded-b-[1.625rem] rounded-t-lg bg-white p-4 text-sm text-end">
              View LinkedIn Profile
            </div>
          </div>
        </div>
        </> }
             
        </>
      )}
    
    </>
  );
};


export default EmployeeProfile;


// "data": {
//   "title": "Nishant Verma - Boston Consulting Group (BCG) | LinkedIn",
//   "description": "Experienced Data Engineer with a demonstrated history of working in the management… · Experience: Boston Consulting Group (BCG) · Education: The NorthCap University · Location: Delhi · 500+ connections on LinkedIn. View Nishant Verma’s profile on LinkedIn, a professional community of 1 billion members.",
//   "ogTitle": "Nishant Verma - Boston Consulting Group (BCG) | LinkedIn",
//   "ogimage": "
// https://static.licdn.com/aero-v1/sc/h/1c5u578iilxfi4m4dvc4q810q"
// ,
//   "ogUrl": "
// https://in.linkedin.com/in/nishantverma02"
// }