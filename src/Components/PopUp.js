'use client';

import React from 'react';
import { applyTrigger } from '../../redux/actions/triggerSlice';
import { useDispatch } from 'react-redux';
import { BookCheck, BookX } from 'lucide-react';

export default function PopUp({ onClose, activity, onSuccess }) {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(applyTrigger())
    onClose();
  };

  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full transform transition-transform duration-300 scale-100 animate-scaleIn">
        <img src="/images/emoji.gif" alt="Happy Icon" className="mx-auto mb-4 w-24 h-24" />
        <h2 className="text-2xl font-bold text-center mb-5">Ready to Join this Activity !</h2>
        <p className="text-gray-600 text-center mb-6"> We're excited that you want to apply for the <br /><strong className='text-blue-600'>"{activity.name}"</strong> activity! <br /> Just confirm your choice below.</p>
        <div className="flex justify-center space-x-4">
          <button onClick={handleSuccess} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95">
            <span className="flex items-center justify-center gap-1"><BookCheck /> Yes, I'm In!</span>
          </button>
          <button onClick={handleCancel} className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95">
            <span className="flex items-center justify-center gap-1"><BookX />No, Thanks!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
