"use client"; // Ensure you're using client-side rendering

import { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    participant_id: '',
    topic: '',
    major: '',
    tag: '',
    program_name: '',
    short_desc: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send multipart/form-data
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch(" ", {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      // Optionally, you can clear the form after submission
      setFormData({
        participant_id: '',
        topic: '',
        major: '',
        tag: '',
        program_name: '',
        short_desc: '',
        description: '',
        image: null,
      });

      alert('Form submitted successfully! Check console for data.');
    } catch (error) {
      console.error('Error:', error);
      alert('There was a problem submitting the form. Please try again.');
    }
  };

  return (
    <div className="gap-4 lg:flex-row min-h-[80vh] bg-gray-100 p-10 w-full flex items-center justify-center ">

      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg max-w-4xl w-full bg-white shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900">Add Topic</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="participant_id">Participant ID</label>
          <input
            type="text"
            name="participant_id"
            id="participant_id"
            value={formData.participant_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md border-0 -gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3.5 py-2 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="topic">Topic</label>
          <input
            type="text"
            name="topic"
            id="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md border-0 -gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3.5 py-2 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="major">Major</label>
          <input
            type="text"
            name="major"
            id="major"
            value={formData.major}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md border-0 -gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3.5 py-2 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="tag">Tag</label>
          <input
            type="text"
            name="tag"
            id="tag"
            value={formData.tag}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md border-0 -gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3.5 py-2 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="program_name">Program Name</label>
          <input
            type="text"
            name="program_name"
            id="program_name"
            value={formData.program_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md border-0 -gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3.5 py-2 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="short_desc">Short Description</label>
          <textarea
            name="short_desc"
            id="short_desc"
            value={formData.short_desc}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md border-0 -gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3.5 py-2 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md border-0 -gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3.5 py-2 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            required
            className="mt-4 h-auto border-gray-300 block w-full rounded-md border-0 -gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3.5 py-2 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-indigo-500 py-2 text-white hover:bg-indigo-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
