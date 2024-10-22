import Header from '@/Components/Header';
import { API_URL } from '@/Config/Config';
import { ArrowLeft, Award, PartyPopper } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Report() {
  const [reportData, setReportData] = useState([]);
  const userData = useSelector((state) => state.session.userData);
  const fetchReportData = async () => {
    if (!userData?.sid) return;
    try {
      const response = await fetch(`${API_URL}activity-result/?participant_id=${userData?.sid}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "GET",
      });

      const responseData = await response.json();
      console.log(responseData);
      
      if (responseData.status === true) {
        setReportData(responseData.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // const fetchActivitiyBySid = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}activity/get-by-id/?sid=${reportData?.activity_id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'GET',
  //     });
  //     console.log(response)

  //     const responseData = await response.json();
  //     console.log(responseData)
  //     if (responseData.status === true) {
  //       setActivities(responseData.data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching activities:', error);
  //   }
  // };

  useEffect(() => {
    if (userData?.sid) {
      fetchReportData();
    }
  }, [userData])
  const handleClick=(item)=>{
    console.log(item);
    
  }
  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="mb-6 text-2xl font-bold">Report</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-600">
                <th className="p-3">S No.</th>
                <th className="p-3">Topic</th>
                <th className="p-3">Activity</th>
                <th className="p-3">Created By</th>
                <th className="p-3">Submission Date</th>
                <th className="p-3">Result</th>
                <th className="p-3">Stage</th>
                <th className="p-3">Score</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <div>{'Test'}</div>
                    {/* <div className="text-sm text-gray-500">{item.subTopic}</div> */}
                  </td>
                  {/* <td className="p-3">{item.activity}</td> */}
                  <td className="p-3">
                    <div className="flex items-center">
                      <img
                        // src=
                        // alt={item.createdBy.name}
                        width={32}
                        height={32}
                        className="mr-2 rounded-full"
                      />
                      <div>
                        {/* <div>{item.createdBy.name}</div> */}
                        {/* <div className="text-sm text-gray-500">{item.createdBy.company}</div> */}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{item?.activity_sub_date.split('T')[0]}</td>
                  <td className="p-3">
                    <span className="rounded-full bg-purple-100 px-2 py-1 text-sm font-medium text-purple-800">
                      {item.result == "Pass" && "Passed"} <PartyPopper className="ml-1 inline-block h-4 w-4" />
                    </span>
                  </td>
                  <td className="p-3">{item.stage}</td>
                  <td className="p-3">{item.score}</td>
                  <td className="p-3">
                    <button onClick={()=>handleClick(item)} className="text-blue-600 hover:text-blue-800">View Certificate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Report
