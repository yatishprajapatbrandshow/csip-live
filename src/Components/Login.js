"use client"
import { RedoDot } from "lucide-react";
import React, { useState } from "react";
function Login() {
    const [isChecked, setIsChecked] = useState(false);
    const [isEmailLogin, setIsEmailLogin] = useState(true);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpSentSuccessfully, setOtpSentSuccessfully] = useState(false);
    //
    const [ResendOTp, setResendOTp] = useState(false);


    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');




    // Toggle checkbox state
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    // Toggle between Mobile and Email login forms
    const handleFormSwitch = () => {
        setIsEmailLogin(!isEmailLogin);
    };

    // Handle sending OTP
    const handleSendOtp = () => {
        // Simulate OTP send and show the OTP input field
        setIsOtpSent(true);
        setTimeout(() => {
            // Simulate OTP sent successfully after a delay
            setOtpSentSuccessfully(true);
            setTimeout(() => {
                setResendOTp(true)
            }, 4000);
        }, 2000); 
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            mobileNumber,
            password,
        };

        try {
            // API call using fetch
            const response = await fetch('https://your-api-endpoint.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
        } catch (error) {
            // Handle network or other errors
            console.error('Request failed:', error);
        }
    };

       // Function to handle input changes
       const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'mobileNumber') {
            setMobileNumber(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };



    return (
        <div className='max-w-[430px] w-[35%] bg-white h-max px-10 py-20 '>
            <h3 className='text-xl font-bold text-gray-700 leading-5 mb-6'>Login to Federation of Industrial Education's Portal</h3>
            
            {!isEmailLogin && (
                
                <div>
                    <div className="flex flex-col gap-1 mb-5">
                        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-800">
                            Registered Mobile Number*
                        </label>
                        <input
                            required
                            type="text"
                            id="mobileNumber"
                            name="mobileNumber"
                            className="w-full p-2 rounded-lg mt-1 bg-[#F0F0F0] outline-none px-4"
                            placeholder="Enter 10 Digits Mobile Number Here..."
                        />
                    </div>

                    {/* OTP Field */}
                    {isOtpSent && (
                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-800">
                                OTP
                            </label>
                            <input
                                required
                                type="text"
                                id="otp"
                                name="otp"
                                className="w-full p-2 rounded-lg mt-1 bg-[#F0F0F0] outline-none px-4"
                                placeholder="Enter 4 Digit OTP Sent to Your Mobile"
                            />
                        </div>
                    )}

                    <div className="flex gap-2 items-center">
                        {/* Custom Checkbox */}
                        <input
                            type="checkbox"
                            id="custom-checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="hidden peer"
                        />

                        {/* Custom Label for Checkbox */}
                        <label
                            htmlFor="custom-checkbox"
                            className={`w-5 h-5 rounded-full bg-[#E9E7FF] flex items-center justify-center cursor-pointer
              ${isChecked ? "bg-[#6045E2] border-[#6045E2]" : ""}`}
                        >
                            {/* Check Icon (visible when checkbox is checked) */}
                            <svg
                                className={`w-4 h-4 text-[#4E54C8] font-bold ${isChecked ? "block" : "hidden"
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </label>

                        {/* Checkbox Label */}
                        <span className="text-gray-700 cursor-pointer" onClick={handleCheckboxChange}>
                            Remember Me
                        </span>

                    </div>

                    {/* Send OTP Button */}
                    {!otpSentSuccessfully && (
                        <button
                            type="button"
                            onClick={handleSendOtp}
                            className="px-6 py-2 bg-[#6045E2] text-white rounded-full hover:bg-[#8a74fc] focus:bg-[#8a74fc] font-semibold mt-5 duration-150"
                        >
                            Send OTP
                        </button>
                    )}

                    {/* Verify OTP Button */}
                    {otpSentSuccessfully && (
                        <>
                            {
                                ResendOTp && (<>
                                    <a className="text-red-600 flex gap-1 justify-start items-center mt-3 font-semibold"> <RedoDot width={17} height={17} /> Resend OTP</a>
                                </>)
                            }
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#6045E2] text-white rounded-full hover:bg-[#8a74fc] focus:bg-[#8a74fc] font-semibold mt-5 duration-150"
                            >
                                Verify OTP
                            </button>
                        </>
                    )}

                    <div className="w-full h-[1px] bg-gray-300 mt-5" />

                    <button
                        type="button"
                        onClick={handleFormSwitch}
                        className="px-6 py-2 bg-[#8a74fc] text-white rounded-full hover:bg-[#6045E2] focus:bg-[#6045E2] font-semibold mt-5 duration-150"
                    >
                        Login with Email & Password
                    </button>

                    <span className="text-[.75rem] text-gray-500 inline-block mt-2">
                        <a href="#" className="text-sm text-[#6045E2] font-medium hover:text-[#8a74fc] duration-150">
                            Sign Up
                        </a>
                        , If you have no account.
                    </span>
                </div>
            )}
            {
                isEmailLogin && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-800">
                                Email Address
                            </label>
                            <input
                                required
                                type="text"
                                id="namemobileNumber"
                                name="mobileNumber"
                                value={mobileNumber}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-lg mt-1 bg-[#F0F0F0] outline-none px-4"
                                placeholder="Enter 10 Digits Mobile Number Here..."
                            />
                        </div>
                        <div className="flex flex-col gap-1 mb-5">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                                Password
                            </label>
                            <input
                                required
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-lg mt-1 bg-[#F0F0F0] outline-none px-4"
                                placeholder="Enter otp sent on "
                            />
                        </div>
                        <div className="flex items-center w-full justify-between">
                            <div className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    id="custom-checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className="hidden peer"
                                />
                                <label
                                    htmlFor="custom-checkbox"
                                    className={`w-5 h-5 rounded-full bg-[#E9E7FF] flex items-center justify-center cursor-pointer
                                    ${isChecked ? "bg-[#6045E2] border-[#6045E2]" : ""}`}
                                >
                                    <svg
                                        className={`w-4 h-4 text-[#4E54C8] font-bold ${isChecked ? "block" : "hidden"}`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </label>
                                <span className="text-gray-700 cursor-pointer" onClick={handleCheckboxChange}>
                                    Remember Me
                                </span>
                            </div>
                            <div>
                                <a onClick={handleFormSwitch} className="text-sm text-gray-500">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#6045E2] text-white rounded-full hover:bg-[#8a74fc] focus:bg-[#8a74fc] font-semibold mt-5 duration-150"
                        >
                            Log In
                        </button>
                    </form>


                    <div className="w-full h-[1px] bg-gray-300 mt-5" />
                    <button
                        onClick={() => {
                            handleFormSwitch()
                            setOtpSentSuccessfully(false)
                            setResendOTp(false)
                            setIsOtpSent(false)
                        }}
                        type="submit"
                        className="px-6 py-2 bg-[#8a74fc] text-white rounded-full hover:bg-[#6045E2] focus:bg-[#6045E2] font-semibold mt-5 duration-150"
                    >
                        Log In with OTP
                    </button>
                    <div className="text-[.75rem] text-gray-500  mt-2">
                        <a href="#" className="text-sm text-[#6045E2] font-medium hover:text-[#8a74fc] duration-150 ">
                            Sign Up
                        </a>
                        ,  If you have no account.
                    </div>
                </div>)
            }
        </div>
    )
}

export default Login
