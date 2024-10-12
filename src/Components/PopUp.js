'use client';

import React from 'react';
import { applyTrigger } from '../../redux/actions/triggerSlice';
import { API_URL } from '@/Config/Config';
import { useDispatch, useSelector } from 'react-redux';
import useRazorpay from '@/hooks/useRazorpay';
import { BookCheck, BookX } from 'lucide-react';

export default function PopUp({ onClose, activity }) {
  const { initiatePayment } = useRazorpay();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.session.userData);


  const handleApply = async () => {
    alert("Applying for activity")
    if (activity?.activity_category === "MCQ") {

      if (!userData?.sid) return;
      const payload = {
        participantId: userData?.sid,
        activityId: activity?.sid
      }

      try {
        const response = await fetch(`${API_URL}activity/apply`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: "POST",
          body: JSON.stringify(payload),
        });
        const responseData = await response.json();
        if (responseData.status === true) {
          dispatch(applyTrigger());
          await initiatePayment(activity.amount, responseData.orderId);
        } else {
          alert(responseData?.message)
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full transform transition-transform duration-300 scale-100 animate-scaleIn">
        <img src="/images/emoji.gif" alt="Happy Icon" className="mx-auto mb-4 w-24 h-24" />
        <h2 className="text-2xl font-bold text-center mb-2">Ready to Join this Activity !</h2>
        <p className="text-gray-600 text-center mb-6">
          We're excited that you want to apply for the "Productivity Tools and Techniques" activity!
          Just confirm your choice below.
        </p>
        <div className="flex justify-center space-x-4">
          {/* Confirm Button */}
          <button
            onClick={handleApply}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center justify-center gap-1">
              <BookCheck />
              Yes, I'm In!
            </span>
          </button>

          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center justify-center gap-1">
              <BookX />
              No, Thanks!
            </span>
          </button>
        </div>

      </div>
    </div>

  );
}
