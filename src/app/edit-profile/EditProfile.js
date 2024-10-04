"use client"
import { useEffect, useState } from "react"

export default function EditProfile() {
  const [activeLink, setActivelink] = useState(1);
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row min-h-[80vh] bg-gray-100 p-10">
      {/* Sidebar */}
      <aside className="w-full  lg:w-64 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <nav>
          <button onClick={() => {
            setActivelink(1)
          }} className={`w-full text-left py-2 text-gray-600 font-medium ${activeLink === 1 && 'text-purple-600'}`}>General</button>
          <button onClick={() => {
            setActivelink(2)
          }} className={`w-full text-left py-2 text-gray-600 ${activeLink === 2 && 'text-purple-600'}`}>Change Password</button>
        </nav>
      </aside>
      {/* Main content */}
      {
        activeLink === 1 &&
        <main className="flex-1 ">
          <div className="bg-white h-full rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>

            <form className="space-y-6">
              {/* Flexbox container to have form fields on the left and profile on the right */}
              <div className="flex flex-col-reverse lg:flex-row lg:space-x-6  ">
                {/* Form fields on the left */}
                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input type="text" id="name" name="name" className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" id="email" name="email" className="w-full p-2 border rounded" />
                    </div>

                    <div>
                      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                      <input type="tel" id="mobile" name="mobile" className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input type="date" id="dob" name="dob" className="w-full p-2 border rounded" />
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select id="gender" name="gender" className="w-full p-2 border rounded">
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                      <input type="text" id="aadhar" name="aadhar" className="w-full p-2 border rounded" placeholder="Type Here" />
                    </div>
                  </div>
                </div>

                {/* Profile photo on the right */}
                <aside className="w-full lg:w-64 lg:flex-shrink-0 max-lg:my-4">
                  <div className="bg-gray-100 px-4 py-6 rounded-lg text-center">
                    <div className="w-32 h-32 mx-auto bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700">Upload Photo</button>
                  </div>
                </aside>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" id="address" name="address" className="w-full p-2 border rounded" placeholder="Type Here" />
              </div>

              {/* City, State, Pincode */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" id="city" name="city" className="w-full p-2 border rounded" placeholder="Type Here" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input type="text" id="state" name="state" className="w-full p-2 border rounded" placeholder="Type Here" />
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input type="text" id="pincode" name="pincode" className="w-full p-2 border rounded" placeholder="Type Here" />
                </div>
              </div>

              {/* T-shirt Size */}
              <div>
                <label htmlFor="tshirt" className="block text-sm font-medium text-gray-700 mb-1">T-Shirt Size</label>
                <select id="tshirt" name="tshirt" className="w-full p-2 border rounded">
                  <option>Select T-Shirt Size</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>

              {/* Save Changes Button */}
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700">Save Changes</button>
            </form>
          </div>
        </main>
      }
      {
        activeLink === 2 &&
        <main className="flex-1 ">
          <div className="bg-white h-full rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-semibold mb-6">Change Password</h1>

            <form className="space-y-6">
              <div>
                <label htmlFor="old-password" className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                <input
                  type="password"
                  id="old-password"
                  name="old-password"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your old password"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  id="new-password"
                  name="new-password"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your new password"
                />
              </div>
              <div>
                <label htmlFor="retype-password" className="block text-sm font-medium text-gray-700 mb-1">Retype New Password</label>
                <input
                  type="password"
                  id="retype-password"
                  name="retype-password"
                  className="w-full p-2 border rounded"
                  placeholder="Retype your new password"
                />
              </div>

              {/* Save Changes Button */}
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700">Save Changes</button>
            </form>
          </div>
        </main>
      }

    </div>
  )
}