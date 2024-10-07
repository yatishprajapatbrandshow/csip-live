"use client";
import React, { useEffect, useState } from 'react';

function ActivityList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading indicator

  const fetchActivities = async () => {
    try {
      const response = await fetch("https://csip-backend.onrender.com/activity/list", {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setItems(responseData.data); // Update state with fetched data

    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch activities."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetch is done
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  if (loading) return <div className="text-center w-full ">Loading...</div>; // Loading state

  return (
    <div className="gap-4 lg:flex-row min-h-[80vh] bg-gray-100 p-10 w-full flex items-start justify-center ">
      <div className="w-full mx-auto mt-10 ">
        <h1 className="text-3xl font-bold  text-gray-800 mb-6 text-left">Activity List</h1>
        {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:shadow-xl">
              <img src={item.image_assc} alt={item.name} className="w-full h-32 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.shortdesc}</p>
              <p className="text-gray-800 font-bold">${item.amount}</p>
              <div className="text-gray-500 mt-2">
                <p><strong>Activity Dates:</strong> {new Date(item.activity_start_date).toLocaleDateString()} - {new Date(item.activity_end_date).toLocaleDateString()}</p>
                <p><strong>Submission Dates:</strong> {new Date(item.submission_start_date).toLocaleDateString()} - {new Date(item.submission_end_date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActivityList;
