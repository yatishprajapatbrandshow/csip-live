"use client";
import { useState } from "react";

export default function AddActivity() {
  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    note: "",
    short_desc: "",
    description: "",
    image_assc: "",
    amount: "",
    corporate_id: "",
    topic_id: "",
    tag: "",
    entry_type: "",
    activity_category: "",
    participant_quantity: "",
    activity_start_date: "",
    activity_end_date: "",
    submission_start_date: "",
    submission_end_date: "",
    activity_type: "",
    need_approval: false,
  });

  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0]; // Get the selected file
      setFormData({ ...formData, [name]: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview
      };
      if (file) {
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const missingFields = [];
    const {
      name,
      short_name,
      activity_start_date,
      activity_end_date,
      corporate_id,
      topic_id,
      submission_start_date,
      submission_end_date,
      entry_type,
      activity_category,
      participant_quantity,
      activity_type,
      need_approval,
    } = formData;

    // Check for missing required fields
    if (!name) missingFields.push("name");
    if (!short_name) missingFields.push("short_name");
    if (!activity_start_date) missingFields.push("activity_start_date");
    if (!activity_end_date) missingFields.push("activity_end_date");
    if (!corporate_id) missingFields.push("corporate_id");
    if (!topic_id) missingFields.push("topic_id");
    if (!submission_start_date) missingFields.push("submission_start_date");
    if (!submission_end_date) missingFields.push("submission_end_date");
    if (!entry_type) missingFields.push("entry_type");
    if (!activity_category) missingFields.push("activity_category");
    if (!participant_quantity) missingFields.push("participant_quantity");
    if (!activity_type) missingFields.push("activity_type");
    if (need_approval === undefined) missingFields.push("need_approval"); // Check for checkbox field

    if (missingFields.length > 0) {
      setErrorMessage(`Missing required fields: ${missingFields.join(", ")}`);
      return; // Stop form submission if there are missing fields
    }



    try {
      const response = await fetch("https://csip-backend.onrender.com/activity/add", {
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();


      // Clear form and error message
      setFormData({
        name: "",
        short_name: "",
        note: "",
        short_desc: "",
        description: "",
        image_assc: "",
        amount: "",
        corporate_id: "",
        topic_id: "",
        tag: "",
        entry_type: "",
        activity_category: "",
        participant_quantity: "",
        activity_start_date: "",
        activity_end_date: "",
        submission_start_date: "",
        submission_end_date: "",
        activity_type: "",
        need_approval: false,
      });
      setImagePreview(null); // Clear image preview
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "There was a problem with your submission. Please try again."
      );
    }
  };

  return (
    <div className="gap-4 lg:flex-row min-h-[80vh] bg-gray-100 p-10 w-full flex items-center justify-center ">
      <div className=" w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Activity Form</h1>

        {/* Display Error Message */}
        {errorMessage && (
          <div className="mb-4 text-red-600 font-semibold">{errorMessage}</div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              required
            />
          </div>

          {/* Short Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short Name
            </label>
            <input
              type="text"
              name="short_name"
              value={formData.short_name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <input
              type="text"
              name="short_desc"
              value={formData.short_desc}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              rows={3}
            />
          </div>

          {/* Image Association */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image Association
            </label>
            <input
              type="file"
              name="image_assc"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-40 w-40 object-cover rounded-md"
              />
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>

          {/* Corporate ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Corporate ID
            </label>
            <input
              type="text"
              name="corporate_id"
              value={formData.corporate_id}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>

          {/* Topic ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Topic ID
            </label>
            <input
              type="text"
              name="topic_id"
              value={formData.topic_id}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>

          {/* Tag */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>

          {/* Entry Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Entry Type
            </label>
            <input
              type="text"
              name="entry_type"
              value={formData.entry_type}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>

          {/* Activity Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Activity Category
            </label>
            <input
              type="text"
              name="activity_category"
              value={formData.activity_category}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>

          {/* Participant Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Participant Quantity
            </label>
            <input
              type="number"
              name="participant_quantity"
              value={formData.participant_quantity}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            />
          </div>

          {/* Activity Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Activity Start Date
            </label>
            <input
              type="date"
              name="activity_start_date"
              value={formData.activity_start_date}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              required
            />
          </div>

          {/* Activity End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Activity End Date
            </label>
            <input
              type="date"
              name="activity_end_date"
              value={formData.activity_end_date}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              required
            />
          </div>

          {/* Submission Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Submission Start Date
            </label>
            <input
              type="date"
              name="submission_start_date"
              value={formData.submission_start_date}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              required
            />
          </div>

          {/* Submission End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Submission End Date
            </label>
            <input
              type="date"
              name="submission_end_date"
              value={formData.submission_end_date}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              required
            />
          </div>

          {/* Activity Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Activity Type
            </label>
            <input
              type="text"
              name="activity_type"
              value={formData.activity_type}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md border-0  -gray-900  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50   px-3.5 py-2 text-gray-900   ring-1    ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              required
            />
          </div>

          {/* Need Approval */}
          <div className="sm:col-span-2 flex items-center">
            <input
              type="checkbox"
              name="need_approval"
              checked={formData.need_approval}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="block text-sm font-medium text-gray-700">
              Need Approval
            </label>
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

