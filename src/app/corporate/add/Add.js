'use client';

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { API_URL } from "@/Config/Config";
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';


const Add = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [sid, setSid] = useState(''); // Store sid from step-1
  const [id, setId] = useState('');   // Store id from step-1

  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("v");
  const userData = useSelector((state) => state.session.userData);



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
    { name: 'corporate_id', label: 'Corporate ID', id: userData?.sid },
    { name: 'tag', label: 'Tag' },
    { name: 'topic_id', label: 'Search Topic', type: 'select' },
  
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
  
  const dataFormStepData = ['Basic Information', 'Scenario and Description', 'Corporate Information', 'Media and Resources', 'Activity Details', 'Participant and Approval', 'Activity and Submission Dates'];
  
  
  const steps = {
    2: ["case_scenario", "case_scenario_title", "description", "note"],
    3: ["corporate_hierarchy_overview", "corporate_id", "tag", "topic_id"],
    4: ["tools_used", "snap_shot", "youtube_video_link", "image_assc"],
    5: ["entry_type", "activity_category", "activity_type", "amount", "job_roles_and_description"],
    6: ["participant_quantity", "need_approval"],
    7: ["activity_start_date", "activity_end_date", "submission_start_date", "submission_end_date"],
  };



  



  const nextStep = async (values) => {
    setErrorMessage('')
    setFormData({ ...formData, ...values });

    if (step === 0) {
      const { name, short_name, objective, short_desc } = values

      if (!name || name == "", !short_desc || short_desc == "", !short_name || short_name == "", !objective || objective == "") {
        setErrorMessage("Fill the all Required Fields *")
        return;
      }

      // Step 1 logic (POST to activity/add API)
      const APIURL = `${API_URL}activity/add`
      try {
        const response = await fetch(APIURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("API Response:", data);
        setId(data?.data?.id);
        setSid(data?.data?.sid);

        // Move to the next step
        setStep((prevStep) => prevStep + 1);

      } catch (error) {
        console.error("Error submitting step 1:", error);
        setErrorMessage("There was an error submitting your data. Please try again.");
      }
    } else if (step > 0 && step <= 6) {
      // Other steps logic (POST to activity/step API)
      const keysToSubmit = steps[step + 1];
      const dataToSubmit = { ...values };
      
      const payload = {
        sid,
        step: step + 1,
        _id: id,
      };
      
      // Add the rest of the keys from keysToSubmit
      keysToSubmit.forEach(key => {
        if (key === "corporate_id") {
          payload[key] = userData?.sid;
        } else {
          payload[key] = dataToSubmit[key]; // Assign values from dataToSubmit for other keys
        }
      });

      console.log(payload)

      
      const APIURL = `${API_URL}activity/step`
      try {
        const response = await fetch(APIURL, {
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
        console.log(responseData);
        if(responseData.status === true){
          alert(`${dataFormStepData[step]} added successfully`);
        }

        // Move to the next step without invoking nextStep recursively
        setStep((prevStep) => Math.min(prevStep + 1, 6));

      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = async () => {
    const payload = { sid, step: step + 1, _id: id };
    keysToSubmit.forEach(key => {
      payload[key] = dataToSubmit[key];
    });
    try {
      const response = await fetch("http://localhost:3000/activity/step", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      if(responseData.status === true){
        alert(`${dataFormStepData[step]} added successfully`);
      }

      // Move to the next step without invoking nextStep recursively
      setStep((prevStep) => Math.min(prevStep + 1, 6));

    } catch (error) {
      setErrorMessage("df", error.message);
    }
  };


  const fieldsToShow = [
    inputFields.slice(0, 4),  // Step 1
    inputFields.slice(4, 8),  // Step 2
    inputFields.slice(8, 12), // Step 3
    inputFields.slice(12, 16), // Step 4
    inputFields.slice(16, 21), // Step 5
    inputFields.slice(21, 23), // Step 6
    inputFields.slice(23)      
  ][step];

  
// Define initialValues with default values for controlled inputs
const initialValues = inputFields.reduce((acc, field) => {
  if (field.name !== 'corporate_id') {
    acc[field.name] = formData[field.name] || ''; // Set to formData if available, otherwise empty string
  }
  return acc;
}, {});




  const fetchTopic = async (topic) => {
    const APIURL = `${API_URL}topic`
    try {
      const response = await fetch(APIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TopicSearch: topic || "Advances in Business Communication"
        }),
      });
 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
 
      const responseData = await response.json();
      console.log(responseData);
      setTopics(responseData.data)
      console.log(responseData.data);
     
    } catch (error) {
      setErrorMessage(error.message);
    }
  }


  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchTopic(value);
  };


  


  return (
    <section className="max-w-5xl mx-auto pt-10">
      <div className='grid grid-cols-3 bg-white shadow-lg p-10'>
        <div className="col-span-1">
          <ol className="h-fit overflow-hidden space-y-8">
            {dataFormStepData?.map((label, index) => (
              <li
                key={index}
                className={`relative flex-1 after:content-[''] after:w-0.5 after:h-full ${step+1 > index ? 'after:bg-blue-500' : 'after:bg-gray-300'
                  } after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5`}
              >
                <a className="flex items-center font-gilMedium w-full">
                  <span
                    className={`w-8 h-8 ${step+1 > index ? 'bg-blue-500' : 'bg-gray-100'
                      } border-2 border-gray-300 rounded-full flex justify-center items-center mr-3 text-sm ${step+1 > index ? 'text-white' : 'text-gray-900'
                      } lg:w-10 lg:h-10`}
                  >
                    {step+1 > index ? (
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
                    <h4 className="text-base font-gilBold text-gray-800"> {label} </h4>
                    <span className="text-sm text-gray-600">{`Step ${index + 1}`}</span>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </div>
        <div className="col-span-2 w-full mx-auto p-6 h-fit bg-white shadow-inner rounded-md">
          <h2 className="text-3xl font-gilMedium text-gray-800 mb-4">{dataFormStepData[step]}</h2>
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
                        className={`${field.name === "corporate_id" ? "hidden" : null} block  text-sm font-gilMedium text-gray-700`}
                      >
                        {field.label}
                      </label>
                    </div>

                    {/* Search input for Topic ID */}
                    {field.name === 'topic_id' && (
                      <>
                        <input
                          type="text"
                          placeholder="Search topics..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                      </>
                    )}

                    {/* {field.type === 'select' ? 
                      <Field as="select" name={field.name} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                        <option value="">Select a topic</option>
                        {topics.map((topic) => (
                          <option key={topic.id} value={topic.id}>
                            {topic.major}
                          </option>
                        ))}
                      </Field>
                    : null} */}



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
                      <>
                      {field.type === 'select' ?
                      <Field as="select" name={field.name} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Select a topic</option>
                      {topics.map((topic) => (
                        <option key={topic._id} value={topic._id}>
                          {topic.major}
                        </option>
                      ))}
                    </Field>
                       : 
                       <>
                        {field.id ? 
                          field.name === "corporate_id" ? 
                            <Field
                              type={field.type || 'text'}
                              name={field.name}
                              value={field.id}
                              className="mt-1 font-gilMedium w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                            />
                          : null
                        :
                        <Field
                            type={field.type || 'text'}
                            name={field.name}
                            className="mt-1 font-gilMedium block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                          />
                        }
                          
                       </>
                      }
                      </>
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
      </div>
    </section>
  );
};

export default Add;
