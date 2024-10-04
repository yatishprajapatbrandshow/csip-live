import React from "react";

const SignupForm = () => {
    return (
        <div className="flex justify-center items-center w-full bg-gray-100">
            <div className="bg-white p-8  shadow-2xl shadow-gray-400 max-w-full w-full">
                <h1 className="px-14 max-sm:px-0 text-xl font-semibold mb-4">
                    Federation Of Industrial Education
                </h1>
                <div className="flex max-sm:flex-col  items-center justify-center w-ful  mx-auto mb-5">
                    <div className="flex-1 max-sm:w-full relative">
                        <div className="bg-green-100 text-green-800 text-center py-2 px-4 ">
                            Basic Details
                        </div>
                        <div className="absolute top-0 right-0 bottom-0 w-6 overflow-hidden">
                            <div className="h-full bg-green-100 -skew-x-12 transform origin-top-right"></div>
                        </div>
                    </div>
                    <div className="flex-1 relative max-sm:w-full">
                        <div className="bg-green-100 text-green-800 text-center py-2 px-4">
                            Mobile No. Verification
                        </div>
                        <div className="absolute top-0 right-0 bottom-0 w-6 overflow-hidden">
                            <div className="h-full bg-green-100 -skew-x-12 transform origin-top-right"></div>
                        </div>
                    </div>
                    <div className="w-12 max-sm:w-full max-sm:mt-1 bg-green-300 text-green-800 flex items-center justify-center py-2 ">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                <form className="space-y-4 px-14 max-sm:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 space-y-4 lg:space-y-0">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Email Address"
                            />
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium">
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Mobile Number"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Password"
                            />
                        </div>

                        {/* Retype Password */}
                        <div>
                            <label htmlFor="retype-password" className="block text-sm font-medium">
                                Retype Password
                            </label>
                            <input
                                type="password"
                                id="retype-password"
                                name="retype-password"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Retype Password"
                            />
                        </div>
                    </div>

                    {/* Register Button */}
                    <div className="flex justify-start items-center mt-10 gap-6">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#6045E2] text-white rounded-full hover:bg-[#8a74fc] focus:bg-[#6045E2] font-semibold"
                        >
                            Register
                        </button>
                        <span className="text-[.75rem] text-gray-500">
                            <a href="#" className="text-sm text-[#6045E2] font-medium hover:text-[#8a74fc] ">
                                Log In
                            </a>
                            , If you already have an account.
                        </span>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default SignupForm;
