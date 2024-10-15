import React, { useState } from "react";
import { useSignUpDetails } from "@/hooks/useSignUpDetails";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpField, setShowOtpField] = useState(false);
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        let formErrors = {};

        if (!name.trim()) formErrors.name = "Name is required";
        if (!email.trim()) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formErrors.email = "Email address is invalid";
        }
        if (!mobile.trim()) {
            formErrors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(mobile)) {
            formErrors.mobile = "Mobile number must be exactly 10 digits";
        }

        if (!password) {
            formErrors.password = "Password is required";
        } else if (password.length < 6) {
            formErrors.password = "Password should be at least 6 characters";
        }

        if (!retypePassword) {
            formErrors.retypePassword = "Please retype your password";
        } else if (retypePassword !== password) {
            formErrors.retypePassword = "Passwords do not match";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const userData = { name, email, mobile, password, retypePassword };

            const response = await useSignUpDetails(userData);
            if (response && response.message) {
                toast.success(response.message)
                setShowOtpField(true);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }

            setName('');
            setEmail('');
            setMobile('');
            setPassword('');
            setRetypePassword('');
            setErrors({});
        }
    };

    const handleVerifyOtp = () => {
        // Handle OTP verification logic here
        if (otp === "1234") {  // Replace with actual OTP check logic
            toast.success("OTP Verified Successfully!");
        } else {
            toast.error("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-w-[35%] bg-gray-200 rounded-xl p-1">
            <div className="bg-white py-10 px-2 shadow-2xl shadow-gray-400 rounded-xl w-full">
                <h1 className="px-10 max-sm:px-0 text-xl font-semibold mb-4">
                    Federation Of Industrial Education
                </h1>

                {!showOtpField ? (
                    <form onSubmit={handleSubmit} className="space-y-4 px-10 max-sm:px-1">
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 space-y-4 lg:space-y-0">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium">
                                    Name
                                </label>
                                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded-lg mt-1 bg-[#F0F0F0] outline-none px-4" placeholder="Name" />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">
                                    Email Address
                                </label>
                                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded-lg mt-1 bg-[#F0F0F0] outline-none px-4" placeholder="Email Address" />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium">
                                    Mobile Number
                                </label>
                                <input type="text" id="mobile" name="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full p-2 rounded-lg mt-1 bg-[#F0F0F0] outline-none px-4" placeholder="Mobile Number" />
                                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 rounded-lg mt-1 bg-[#F0F0F0] outline-none px-4"
                                    placeholder="Password"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div>
                                <label htmlFor="retype-password" className="block text-sm font-medium">
                                    Retype Password
                                </label>
                                <input
                                    type="password"
                                    id="retype-password"
                                    name="retype-password"
                                    value={retypePassword}
                                    onChange={(e) => setRetypePassword(e.target.value)}
                                    className="w-full p-2 rounded-lg mt-1 bg-[#F0F0F0] outline-none px-4"
                                    placeholder="Retype Password"
                                />
                                {errors.retypePassword && <p className="text-red-500 text-sm">{errors.retypePassword}</p>}
                            </div>
                        </div>

                        <div className="flex justify-start items-center mt-10 gap-5 max-sm:flex-col max-sm:items-start">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#6045E2] text-white rounded-full hover:bg-[#8a74fc] focus:bg-[#6045E2] font-semibold"
                            >
                                Register
                            </button>
                            <span className="text-[.75rem] text-gray-500">
                                <Link href="/login" className="text-sm text-[#6045E2] font-medium hover:text-[#8a74fc] ">
                                    Log In
                                </Link>, If you already have an account.
                            </span>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4 px-10 max-sm:px-0">
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium">
                                OTP
                            </label>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full p-2 rounded-lg mt-1 bg-[#F0F0F0] outline-none px-4"
                                placeholder="Enter OTP"
                            />
                        </div>
                        <div className="flex justify-start items-center mt-4 gap-4">
                            <button
                                onClick={handleVerifyOtp}
                                className="px-6 py-2 bg-[#6045E2] text-white rounded-full hover:bg-[#8a74fc] focus:bg-[#6045E2] font-semibold"
                            >
                                Verify OTP
                            </button>
                            <button
                                onClick={() => setShowOtpField(false)}
                                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 font-semibold"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                )}
                <ToastContainer position="top-right" autoClose={2000} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </div>
    );
};

export default SignupForm;
