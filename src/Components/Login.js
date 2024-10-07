"use client"
import { setLocalStorageItem } from "@/Config/localstorage";
import { RedoDot } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLocalStorageItem } from "@/Config/localstorage";

function Login() {
    const router = useRouter()
    const [isChecked, setIsChecked] = useState(false);
    const [isEmailLogin, setIsEmailLogin] = useState(true);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [LoginProcess, setLoginProcess] = useState(false);
    const [otpSentSuccessfully, setOtpSentSuccessfully] = useState(false);
    //
    const [ResendOTp, setResendOTp] = useState(false);


    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        const userData = getLocalStorageItem("userData")
        if(userData){
            router.replace('/dashboard')
        }
    }, []);



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
        setLoginProcess(true)
        const payload = {
            email,
            password,
        };

        if(!payload.email || !payload.password){
            alert("Please fill all feilds givven below")
        }

        try {
            // API call using fetch
            const response = await fetch('https://csip-backend.onrender.com/login/login-with-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            console.log(result);
            if (result.status === true) {

                alert("Logged in successfully")
                setLocalStorageItem('userData', result?.data);
                router.push('/dashboard')
                setLoginProcess(false)
            } else {
                alert(result?.message)
                setLoginProcess(false)
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Request failed:', error);
        }
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setemail(value);
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
                                <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                                    Email Address
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 rounded-lg mt-1 bg-[#F0F0F0] outline-none px-4"
                                    placeholder="Enter Email"
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
                                    placeholder="Enter Password "
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
                                className="px-6 py-2 flex gap-2 justify-center items-center bg-[#6045E2] text-white rounded-full hover:bg-[#8a74fc] focus:bg-[#8a74fc] font-semibold mt-5 duration-150"
                            >
                                Log In
                                {!LoginProcess ? <>

                                    <div role="status">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>

                                </> : null}
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

export default Login;