import React from 'react';

export default function Component() {
  // Event handlers for confirm and cancel actions
  const handleConfirm = () => {
    alert('You have confirmed!');
  };

  const handleCancel = () => {
    alert('You have canceled!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 absolute z-[1000] top-0 left-0">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-2">Are you sure?</h2>
        <p className="text-gray-600 text-center mb-6">
          You are Applying for "Productivity Tools and Techniques" Activity
        </p>
        <div className="flex justify-center space-x-4">
          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded"
          >
            Confirm
          </button>

          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
