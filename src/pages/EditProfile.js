"use client"
import Header from "@/Components/Header";
import { API_URL, API_URL_LOCAL } from "@/Config/Config";
import { getLocalStorageItem, setLocalStorageItem } from "@/Config/localstorage"; // Assuming a function to set data in localStorage
import { useEffect, useState } from "react";

export default function EditProfile() {
  const [userProfileData, setUserProfileData] = useState({});
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }
    console.log(file);

    const formData = new FormData();
    formData.append('fileUp', file); // Append the file to the form data

    for (const [key, value] of formData.entries()) {
      console.log(key, value); // This will log the key-value pairs in the FormData
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData, // Send the FormData object
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("error here", error);
    }
  };
  const [activeLink, setActivelink] = useState(1);
  const [formData, setFormData] = useState({
    sid: "",
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    aadhar_number: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    tshirtsize: "",
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
    participantpic: "",
  });

  // Fetch user profile data from local storage on component mount
  useEffect(() => {
    const userData = getLocalStorageItem('userData');
    if (userData) {
      console.log(userData);

      setUserProfileData(userData);
      setFormData(userData); // Directly populate formData with userProfileData
    }
  }, []);

  // Handle input change and update the corresponding key in formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for saving changes
  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Validation logic (example: email format, passwords match, etc.)
    if (activeLink === 2) {
      // Ensure all required passwords are present
      if (!formData?.oldPassword || formData.oldPassword.trim() === '') {
        alert('Old Password is required');
        return;
      }

      if (!formData?.newPassword || formData.newPassword.trim() === '') {
        alert('New Password is required');
        return;
      }

      if (!formData?.retypePassword || formData.retypePassword.trim() === '') {
        alert('Please retype your new Password');
        return;
      }

      // Check if new password and retype password match
      if (formData.newPassword !== formData.retypePassword) {
        alert('New Password and Retyped Password must be the same');
        return;
      }

      // Add any additional validation conditions as needed
      // For example: Password strength check
      if (formData.newPassword.length < 8) {
        alert('New Password must be at least 8 characters long');
        return;
      }

      if (!/[A-Z]/.test(formData.newPassword)) {
        alert('New Password must contain at least one uppercase letter');
        return;
      }

      if (!/[a-z]/.test(formData.newPassword)) {
        alert('New Password must contain at least one lowercase letter');
        return;
      }

      if (!/[0-9]/.test(formData.newPassword)) {
        alert('New Password must contain at least one number');
        return;
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)) {
        alert('New Password must contain at least one special character');
        return;
      }
    }

    console.log(formData);
    // Save updated profile to local storage
    setLocalStorageItem('userData', formData); // Assuming setLocalStorageItem updates the user data
    updateProfile();
  };
  const updateProfile = async () => {


    const payload = {
      sid: formData?.sid || "",
      name: formData?.name || "",
      email: formData?.email || "",
      mobile: formData?.mobile || "",
      dob: formData?.dob || "",
      gender: formData?.gender || "",
      aadhar_number: formData?.aadhar_number || "",
      address: formData?.address || "",
      city: formData?.city || "",
      state: formData?.state || "",
      pincode: formData?.pincode || "",
      tshirtsize: formData?.tshirtsize || "",
      oldPassword: formData?.oldPassword || "",
      password: formData?.newPassword || "",
      r_password: formData?.retypePassword || "",
      participantpic: formData?.participantpic || ""
    }

    try {
      const response = await fetch(`${API_URL}register/update`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        alert(responseData?.message)
        // setFormData({...formData,[newPassword]:"",[retypePassword]:""})
      } else {
        alert(responseData?.message)
      }
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <>
      <Header />
      <div className="flex w-full flex-col gap-4 lg:flex-row min-h-[80vh] bg-white py-10">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <nav>
            <button onClick={() => setActivelink(1)} className={`w-full text-left py-2 text-gray-600 font-medium ${activeLink === 1 && 'text-purple-600'}`}>
              General
            </button>
            <button onClick={() => setActivelink(2)} className={`w-full text-left py-2 text-gray-600 ${activeLink === 2 && 'text-purple-600'}`}>
              Change Password
            </button>
          </nav>
        </aside>

        {/* Main content */}
        {activeLink === 1 && (
          <main className="flex-1">
            <div className="bg-white h-full rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>
              <form className="space-y-6" onSubmit={handleSaveChanges}>
                <div className="flex flex-col-reverse lg:flex-row lg:space-x-6">
                  {/* Form fields */}
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input onChange={handleInputChange} type="text" id="name" name="name" value={formData.name} className="w-full p-2 border rounded" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input onChange={handleInputChange} type="email" id="email" name="email" value={formData.email} className="w-full p-2 border rounded outline-none " readOnly />
                      </div>

                      <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                        <input onChange={handleInputChange} type="tel" id="mobile" name="mobile" value={formData.mobile} className="w-full p-2 border rounded" />
                      </div>
                      <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input onChange={handleInputChange} type="date" id="dob" name="dob" value={formData.dob} className="w-full p-2 border rounded" />
                      </div>

                      <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select id="gender" name="gender" value={formData?.gender} className="w-full p-2 border rounded" onChange={handleInputChange} >
                          <option>Select Gender</option>
                          <option value="male" >Male</option>
                          <option value="female" >Female</option>
                          <option value="other" >Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="aadhar_number" className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                        <input onChange={handleInputChange} type="text" id="aadhar_number" name="aadhar_number" value={formData.aadhar_number} className="w-full p-2 border rounded" placeholder="Type Here" />
                      </div>
                    </div>
                  </div>

                  {/* Profile photo */}
                  <aside className="w-full lg:w-64 lg:flex-shrink-0 max-lg:my-4">
                    <div className="bg-gray-100 px-4 py-6 rounded-lg text-center">
                      {/* Image Preview */}
                      <div className="w-32 h-32 mx-auto bg-gray-300 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        {formData.profileImage ? (
                          <img
                            src={URL.createObjectURL(formData.profileImage)}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                      </div>

                      {/* File Input (Hidden) */}
                      <input
                        type="file"
                        id="profile-image-input"
                        accept="image/*"
                        style={{ display: "none" }} // Hide the input
                        onChange={(e) => handleFileChange(e)}
                      />

                      {/* Button to trigger file input */}
                      <button
                        onClick={() => document.getElementById('profile-image-input').click()}
                        className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700"
                      >
                        Upload Photo
                      </button>
                    </div>
                  </aside>

                </div>

                {/* Address */}
                {/* <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input onChange={handleInputChange} type="text" id="address" name="address" value={formData.address} className="w-full p-2 border rounded" placeholder="Type Here" />
                </div> */}

                {/* City, State, Pincode */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input onChange={handleInputChange} type="text" id="city" name="city" value={formData.city} className="w-full p-2 border rounded" placeholder="Type Here" />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input onChange={handleInputChange} type="text" id="state" name="state" value={formData.state} className="w-full p-2 border rounded" placeholder="Type Here" />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input onChange={handleInputChange} type="text" id="pincode" name="pincode" value={formData.pincode} className="w-full p-2 border rounded" placeholder="Type Here" />
                  </div>
                </div>

                {/* T-shirt Size */}
                <div>
                  <label htmlFor="tshirtsize" className="block text-sm font-medium text-gray-700 mb-1">T-Shirt Size</label>
                  <select id="tshirtsize" name="tshirtsize" value={formData.tshirtsize} className="w-full p-2 border rounded" onChange={handleInputChange}>
                    <option>Select T-Shirt Size</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                  </select>
                </div>

                {/* Save Changes Button */}
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700">Save Changes</button>
              </form>
            </div>
          </main>
        )}

        {activeLink === 2 && (
          <main className="flex-1">
            <div className="bg-white h-full rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-semibold mb-6">Change Password</h1>

              <form className="space-y-6" onSubmit={handleSaveChanges}>
                <div>
                  <label htmlFor="old-password" className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                  <input onChange={handleInputChange} type="password" id="old-password" name="oldPassword" className="w-full p-2 border rounded" placeholder="Enter your old password" />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input onChange={handleInputChange} type="password" id="new-password" name="newPassword" className="w-full p-2 border rounded" placeholder="Enter your new password" />
                </div>
                <div>
                  <label htmlFor="retype-password" className="block text-sm font-medium text-gray-700 mb-1">Retype New Password</label>
                  <input onChange={handleInputChange} type="password" id="retype-password" name="retypePassword" className="w-full p-2 border rounded" placeholder="Retype your new password" />
                </div>

                {/* Save Changes Button */}
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700">Save Changes</button>
              </form>
            </div>
          </main>
        )}
      </div>
    </>
  );
}
