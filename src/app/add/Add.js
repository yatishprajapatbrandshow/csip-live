'use client';

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const inputFields = [
  { name: 'name', label: 'Name' },
  { name: 'short_name', label: 'Short Name' },
  { name: 'objective', label: 'Objective' },
  { name: 'short_desc', label: 'Short Description' },

  { name: 'case_scenario', label: 'Case Scenario' },
  { name: 'case_scenario_title', label: 'Case Scenario Title' },
  { name: 'description', label: 'Description' },
  { name: 'note', label: 'Note' },

  { name: 'corporate_hierarchy_overview', label: 'Corporate Hierarchy Overview' },
  { name: 'corporate_id', label: 'Corporate ID' },
  { name: 'tag', label: 'Tag' },
  { name: 'topic_id', label: 'Topic ID' },

  { name: 'tools_used', label: 'Tools Used' },
  { name: 'snap_shot', label: 'Snap Shot' },
  { name: 'youtube_video_link', label: 'Youtube Video Link' },
  { name: 'image_assc', label: 'Image Associated' },

  { name: 'entry_type', label: 'Entry Type' },
  { name: 'activity_category', label: 'Activity Category' },
  { name: 'activity_type', label: 'Activity Type' },
  { name: 'amount', label: 'Amount', type: 'number' },
  { name: 'job_roles_and_description', label: 'Job Roles and Description' },

  { name: 'participant_quantity', label: 'Participant Quantity', type: 'number' },
  { name: 'need_approval', label: 'Need Approval', type: 'checkbox' },

  { name: 'activity_start_date', label: 'Activity Start Date', type: 'date' },
  { name: 'activity_end_date', label: 'Activity End Date', type: 'date' },
  { name: 'submission_start_date', label: 'Submission Start Date', type: 'date' },
  { name: 'submission_end_date', label: 'Submission End Date', type: 'date' },
];

const data = ['Basic Information', 'Scenario and Description', 'Corporate Information', 'Media and Resources', 'Activity Details', 'Participant and Approval', 'Activity and Submission Dates'];

// Define validation schema for each field
// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Required'),
//   objective: Yup.string().required('Required'),
//   case_scenario: Yup.string().required('Required'),
//   case_scenario_title: Yup.string().required('Required'),
//   corporate_hierarchy_overview: Yup.string().required('Required'),
//   tools_used: Yup.string().required('Required'),
//   job_roles_and_description: Yup.string().required('Required'),
//   short_name: Yup.string().required('Required'),
//   note: Yup.string().required('Required'),
//   short_desc: Yup.string().required('Required'),
//   description: Yup.string().required('Required'),
//   image_assc: Yup.string().required('Required'),
//   amount: Yup.number().required('Required').min(0, 'Must be greater than or equal to 0'),
//   corporate_id: Yup.string().required('Required'),
//   topic_id: Yup.string().required('Required'),
//   tag: Yup.string().required('Required'),
//   entry_type: Yup.string().required('Required'),
//   activity_category: Yup.string().required('Required'),
//   participant_quantity: Yup.number().required('Required').min(1, 'Must be at least 1'),
//   activity_start_date: Yup.date().required('Required'),
//   activity_end_date: Yup.date().required('Required'),
//   submission_start_date: Yup.date().required('Required'),
//   submission_end_date: Yup.date().required('Required'),
//   activity_type: Yup.string().required('Required'),
//   youtube_video_link: Yup.string().required('Required'),
//   snap_shot: Yup.string().required('Required'),
//   need_approval: Yup.boolean().required('Required'),
// });

const steps = {
  2: ["case_scenario", "case_scenario_title", "description", "note"],
  3: ["corporate_hierarchy_overview", "corporate_id", "tag", "topic_id"],
  4: ["tools_used", "snap_shot", "youtube_video_link", "image_assc"],
  5: ["entry_type", "activity_category", "activity_type", "amount", "job_roles_and_description"],
  6: ["participant_quantity", "need_approval"],
  7: ["activity_start_date", "activity_end_date", "submission_start_date", "submission_end_date"],
};

const Add = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [sid, setSid] = useState(''); // Store sid from step-1
  const [id, setId] = useState('');   // Store id from step-1

  const nextStep = async (values) => {
    setFormData({ ...formData, ...values });
    
    // Check if we are on step 1 (index 0)
    if (step === 0) {
      try {
        const response = await fetch("https://csip-backend.onrender.com/activity/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values), // Send the current step's values
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json(); // Assuming the API returns JSON
        console.log("API Response:", data); // Log the response data
        setId(data?.data?.id); // Store the id for future steps
        setSid(data?.data?.sid); // Store the sid for future steps
  
        // Optionally handle success response here, like showing a message
  
      } catch (error) {
        console.error("Error submitting step 1:", error);
        setErrorMessage("There was an error submitting your data. Please try again.");
      }
    } 
    if (step > 0 && step <= 6) {
      const keysToSubmit = steps[step + 1]; // Get keys for the current step
      const dataToSubmit = { ...values}; // Include sid and id in the request

      const payload = {sid, step, _id:id};
      keysToSubmit.forEach(key => {
        payload[key] = dataToSubmit[key]; // Collect only the necessary fields for the API
      });

      console.log("Submitting data for step", step + 1, ":", payload);
      

      try {
        const response = await fetch("https://csip-backend.onrender.com/activity/step", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData); // Handle the response data if needed

        // Move to the next step
        nextStep(values);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setSubmitting(false);
      }
    }
  
    setStep((prevStep) => Math.min(prevStep + 1, 6)); // Adjust to the last step
  };
  

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = () => {
    // Submit the final form data
    console.log("Submitting final form data:", formData);
  };


  const fieldsToShow = [
    inputFields.slice(0, 4),  // Step 1
    inputFields.slice(4, 8),  // Step 2
    inputFields.slice(8, 12), // Step 3
    inputFields.slice(12, 16), // Step 4
    inputFields.slice(16, 21), // Step 5
    inputFields.slice(21, 23), // Step 6
    inputFields.slice(23)      // Step 7
  ][step];

  // Define initialValues with default values for controlled inputs
  const initialValues = inputFields.reduce((acc, field) => {
    acc[field.name] = formData[field.name] || ''; // Set to empty string if undefined
    return acc;
  }, {});


  return (
    <section className="flex items-start max-w-7xl mx-auto w-full pt-20">
      <div className="">
        <ol className="h-fit overflow-hidden space-y-8">
          {data?.map((label, index) => (
            <li
              key={index}
              className={`relative flex-1 after:content-[''] after:w-0.5 after:h-full ${step > index ? 'after:bg-blue-500' : 'after:bg-gray-300'
                } after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5`}
            >
              <a className="flex items-center font-gilMedium w-full">
                <span
                  className={`w-8 h-8 ${step > index ? 'bg-blue-500' : 'bg-gray-100'
                    } border-2 border-gray-300 rounded-full flex justify-center items-center mr-3 text-sm ${step > index ? 'text-white' : 'text-gray-900'
                    } lg:w-10 lg:h-10`}
                >
                  {step > index ? (
                    <svg
                      className="w-5 h-5 stroke-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12L9.287 16.292C9.62 16.626 9.787 16.793 9.994 16.793C10.201 16.793 10.368 16.626 10.702 16.293L20 7"
                        stroke="stroke-current"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="my-path"
                      ></path>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <div className="block">
                  <h4 className="text-lg font-gilBold text-gray-800">{`Step ${index + 1}`}</h4>
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <div className="max-w-xl w-full mx-auto p-6 h-fit bg-[#e7e7e7] shadow-lg rounded-md">
        <h2 className="text-3xl font-gilMedium text-gray-800 mb-4">{data[step]}</h2>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form>
              {fieldsToShow.map((field) => (
                <div key={field.name} className="mb-4">
                  <div>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-gilMedium text-gray-700"
                    >
                      {field.label}
                    </label>
                  </div>
                  {field.type === 'checkbox' ? (
                    <div className="flex items-center mt-1">
                      <Field
                        type="checkbox"
                        name={field.name}
                        className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={field.name}
                        className="ml-2 text-gray-700"
                      >
                        {field.label}
                      </label>
                    </div>
                  ) : (
                    <Field
                      type={field.type || 'text'}
                      name={field.name}
                      className="mt-1 font-gilMedium block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                  )}
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
              ))}
              {errorMessage && <div className="text-red-600 text-sm mb-4">{errorMessage}</div>}

              <div className="flex justify-between">
                {step > 0 && (
                  <button type="button" onClick={prevStep} className="font-gilSemiBold inline-flex py-2 px-4 bg-gray-500 text-white rounded-md">
                    Previous
                  </button>
                )}
                {step === Object.keys(steps).length ? (
                <button type="submit" disabled={isSubmitting} className="font-gilSemiBold inline-flex py-2 px-4 bg-blue-500 text-white rounded-md">
                  Submit
                </button>
              ) : (
                <button type="button" onClick={() => nextStep(values)} className="font-gilSemiBold inline-flex py-2 px-4 bg-blue-500 text-white rounded-md">
                  Next
                </button>
              )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Add;
