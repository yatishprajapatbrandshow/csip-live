"use client";
import CardCorporate from '@/Components/CardCorporate';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { API_URL, API_URL_LOCAL } from '@/Config/Config';
import { useSelector } from 'react-redux';
import Header from '@/Components/Header';
import { useRouter } from 'next/router';
import { getLocalStorageItem } from '@/Config/localstorage';

function ActivityList() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.session.userData);

  const [isSession, setIsSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = getLocalStorageItem("userData");
    if (userData) {
      setIsSession(true);
      if (userData.type !== "Corporate") {
        router.push('/dashboard')
      }
    } else {
      router.push('/')
      setIsSession(false);
    }
  }, []);

  const fetchActivities = async () => {
    // Only append corporate_id if it's defined
    const APIURL = userData?.sid
      ? `${API_URL}activity/list?corporate_id=${userData?.sid}`
      : `${API_URL}activity/list`;
console.log(userData?.sid);
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
        setItems(responseData.data);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch activities.");
    } finally {
      setLoading(false); // Set loading to false after fetch is done
    }
  };

  useEffect(() => {
    if (userData) {
      fetchActivities();
    }
  }, [userData]);

  return (
    <>
      <Header />
      <div className="pl-20 p-6 bg-white">
        <h1 className="text-3xl  mb-6">Added Activity List</h1>
        <div className="flex flex-wrap justify-start gap-6">
          {items?.map((activity) => (
            <CardCorporate key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ActivityList;
