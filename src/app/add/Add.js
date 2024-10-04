'use client';

import React, { useState } from 'react';
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
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  objective: Yup.string().required('Required'),
  case_scenario: Yup.string().required('Required'),
  case_scenario_title: Yup.string().required('Required'),
  corporate_hierarchy_overview: Yup.string().required('Required'),
  tools_used: Yup.string().required('Required'),
  job_roles_and_description: Yup.string().required('Required'),
  short_name: Yup.string().required('Required'),
  note: Yup.string().required('Required'),
  short_desc: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  image_assc: Yup.string().required('Required'),
  amount: Yup.number().required('Required').min(0, 'Must be greater than or equal to 0'),
  corporate_id: Yup.string().required('Required'),
  topic_id: Yup.string().required('Required'),
  tag: Yup.string().required('Required'),
  entry_type: Yup.string().required('Required'),
  activity_category: Yup.string().required('Required'),
  participant_quantity: Yup.number().required('Required').min(1, 'Must be at least 1'),
  activity_start_date: Yup.date().required('Required'),
  activity_end_date: Yup.date().required('Required'),
  submission_start_date: Yup.date().required('Required'),
  submission_end_date: Yup.date().required('Required'),
  activity_type: Yup.string().required('Required'),
});

const Add = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({}); // Keep track of form data

  const nextStep = (values) => {
    const fieldsCount = step === 4 ? 5 : 4; // Step 5 has 5 fields; all others have 4
    const filledFields = Object.keys(values).length;

    if (filledFields < fieldsCount) {
      return; // Prevent moving to the next step if fields are not filled
    }

    setFormData({ ...formData, ...values });
    setStep((prevStep) => Math.min(prevStep + 1, 6)); // Adjust to the last step
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setFormData({ ...formData, ...values });
    alert('Data submitted successfully!'); // Alert on submission
    console.log('Final Data:', { ...formData, ...values });
    // Perform the submission logic here, like sending to an API
    setSubmitting(false); // Reset submitting state
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
    <section className='flex items-start max-w-7xl mx-auto w-full pt-20'>
      <div className=''>
        <ol className="h-fit overflow-hidden space-y-8">
          {data?.map((label, index) => (
            <li key={index} className={`relative flex-1 after:content-[''] after:w-0.5 after:h-full ${step > index ? 'after:bg-indigo-600' : 'after:bg-gray-200'} after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5`}>
              <a className="flex items-center font-medium w-full">
                <span className={`w-8 h-8 ${step > index ? 'bg-indigo-600' : 'bg-gray-50'} border-2 border-gray-200 rounded-full flex justify-center items-center mr-3 text-sm ${step > index ? 'text-white' : 'text-gray-900'} lg:w-10 lg:h-10`}>
                  {step > index ? (
                    <svg className="w-5 h-5 stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7" stroke="stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="my-path"></path>
                    </svg>
                  ) : index + 1}
                </span>
                <div className="block">
                  <h4 className="text-lg text-indigo-600">{`Step ${index + 1}`}</h4>
                  <span className="text-sm">{label}</span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <div className="max-w-xl w-full mx-auto p-6 h-fit rounded-md">
        <h2 className="text-2xl font-semibold mb-4">{data[step]}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              {fieldsToShow.map((field) => (
                <div key={field.name} className="mb-4">
                  <div>
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-600">{field.label}</label>
                  </div>
                  {field.type === 'checkbox' ? (
                    <div className="flex items-center mt-1">
                      <Field
                        type="checkbox"
                        name={field.name}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor={field.name} className="ml-2 text-gray-600">{field.label}</label>
                    </div>
                  ) : (
                    <Field
                      type={field.type || 'text'}
                      name={field.name}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                    />
                  )}
                  <ErrorMessage name={field.name} component="div" className="text-red-600 text-sm" />
                </div>
              ))}

              <div className="flex justify-between mt-6">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                  >
                    Previous
                  </button>
                )}
                {step === data.length - 1 ? ( // Change this condition
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => nextStep(values)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
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
