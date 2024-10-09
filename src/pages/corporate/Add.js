'use client';

import React, { useState } from 'react';
import { API_URL } from "@/Config/Config";
import { useSelector } from 'react-redux';


const Add = () => {
  const userData = useSelector((state) => state.session.userData);
  const [formData, setFormData] = useState({});
  const [topics, setTopics] = useState([]);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [objective, setObjective] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [caseScenario, setCaseScenario] = useState('');
  const [caseScenarioTitle, setCaseScenarioTitle] = useState('');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  const [corporateHierarchyOverview, setCorporateHierarchyOverview] = useState('');
  const [corporateId, setCorporateId] = useState(userData?.sid || '');
  const [tag, setTag] = useState('');
  const [topicId, setTopicId] = useState('');
  const [toolsUsed, setToolsUsed] = useState('');
  const [snapShot, setSnapShot] = useState('');
  const [youtubeVideoLink, setYoutubeVideoLink] = useState('');
  const [imageAssc, setImageAssc] = useState('');
  const [entryType, setEntryType] = useState('');
  const [activityCategory, setActivityCategory] = useState('');
  const [activityType, setActivityType] = useState('');
  const [amount, setAmount] = useState('');
  const [jobRolesAndDescription, setJobRolesAndDescription] = useState('');
  const [participantQuantity, setParticipantQuantity] = useState('');
  const [needApproval, setNeedApproval] = useState(false);
  const [activityStartDate, setActivityStartDate] = useState('');
  const [activityEndDate, setActivityEndDate] = useState('');
  const [submissionStartDate, setSubmissionStartDate] = useState('');
  const [submissionEndDate, setSubmissionEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sid, setSid] = useState('');
  const [id, setId] = useState('');

  const dataFormStepData = ['Basic Information', 'Scenario and Description', 'Corporate Information', 'Media and Resources', 'Activity Details', 'Participant and Approval', 'Activity and Submission Dates'];

  const apiHandler = async (payload, step) => {
    try {
      const response = await fetch(`${API_URL}activity/step`, {
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
      if (responseData.status === true) {
        alert(`Step ${step} added successfully`);
      }

      setStep((prevStep) => prevStep + 1);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const nextStep = async () => {
    console.log(step);
    setErrorMessage('')

    if (step === 6) {
      handleSubmit();
      return;
    }

    if (step === 0) {
      if (!name || !shortName || !objective || !shortDesc) {
        setErrorMessage("Fill all required fields *");
        return;
      }

      const formData = {
        name,
        short_name: shortName,
        objective,
        short_desc: shortDesc
      };

      try {
        const response = await fetch(`${API_URL}activity/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("API Response:", data);
        setId(data?.data?.id);
        setSid(data?.data?.sid);
        setStep((prevStep) => prevStep + 1);

      } catch (error) {
        console.error("Error submitting step 1:", error);
        setErrorMessage("There was an error submitting your data. Please try again.");
      }
    } else if (step === 1) {
      const formData = {
        case_scenario: caseScenario,
        case_scenario_title: caseScenarioTitle,
        description: description,
        note: note
      };
      apiHandler(formData, step);
    }
    else if (step === 2) {
      const formData = {
        corporate_hierarchy_overview: corporateHierarchyOverview,
        corporate_id: corporateId,
        tag: tag,
        topic_id: topicId
      };
      apiHandler(formData, step);
    }
    else if (step === 3) {
      const formData = {
        tools_used: toolsUsed,
        snap_shot: snapShot,
        youtube_video_link: youtubeVideoLink,
        image_assc: imageAssc
      };
      apiHandler(formData, step);
    }
    else if (step === 4) {
      const formData = {
        entry_type: entryType,
        activity_category: activityCategory,
        activity_type: activityType,
        amount: amount,
        job_roles_and_description: jobRolesAndDescription
      };
      apiHandler(formData, step);
    }
    else if (step === 5) {
      const formData = {
        participant_quantity: participantQuantity,
        need_approval: needApproval
      };
      apiHandler(formData, step);
    }
    else if (step === 6) {
      const formData = {
        activity_start_date: activityStartDate,
        activity_end_date: activityEndDate,
        submission_start_date: submissionStartDate,
        submission_end_date: submissionEndDate
      };
      apiHandler(formData, step);
    }
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleSubmit = async () => {
    const payload = { sid, step: step + 1, _id: id };
    try {
      const response = await fetch(`${API_URL}activity/step`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, sid, step: step + 1, _id: id }),
      });

      const responseData = await response.json();
      if (responseData.status === true) {
        alert("Step submitted successfully");
        setStep(step + 1);
      }
    } catch (error) {
      setErrorMessage("Error submitting data.");
    }
  };



  const fetchTopic = async (topic) => {
    console.log(topic);
    setTopics([])

    const APIURL = `${API_URL}topic`
    try {
      const response = await fetch(APIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TopicSearch: topic
        }),
      });

      const responseData = await response.json();

      if (responseData.status === true) {
        setTopics(responseData.data)
        console.log(responseData.data);
      } else {
        setErrorMessage(responseData.message)
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length > 1) {
      setErrorMessage("")
      fetchTopic(value);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  }

  const dataFinder = () => {
    
  }

  const handleActivity = async (step) => {
    preventDefault();


  }

  return (
    <section className="max-w-5xl mx-auto pt-10">
      <div className='grid grid-cols-3 bg-white shadow-lg p-10'>
        <div className="col-span-1">
          <ol className="h-fit overflow-hidden space-y-8">
            {dataFormStepData?.map((label, index) => (
              <li
                key={index}
                className={`relative flex-1 after:content-[''] after:w-0.5 after:h-full ${step + 1 > index ? 'after:bg-blue-500' : 'after:bg-gray-300'
                  } after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5`}
              >
                <a className="flex items-center font-gilMedium w-full">
                  <span
                    className={`w-8 h-8 ${step + 1 > index ? 'bg-blue-500' : 'bg-gray-100'
                      } border-2 border-gray-300 rounded-full flex justify-center items-center mr-3 text-sm ${step + 1 > index ? 'text-white' : 'text-gray-900'
                      } lg:w-10 lg:h-10`}
                  >
                    {step + 1 > index ? (
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
          <h2 className="text-3xl font-medium text-gray-800 mb-4">{dataFormStepData[step]}</h2>
          {step === 0 && (
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={name || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Short Name</label>
                <input type="text" name="short_name" value={shortName || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Objective</label>
                <input type="text" name="objective" value={objective || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Short Description</label>
                <input type="text" name="short_desc" value={shortDesc || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <button onClick={() => handleActivity(0)} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
            </form>
          )}
          {step === 1 && (
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Case Scenario</label>
                <input type="text" name="case_scenario" value={caseScenario || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Case Scenario Title</label>
                <input type="text" name="case_scenario_title" value={caseScenarioTitle || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input type="text" name="description" value={description || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Note</label>
                <input type="text" name="note" value={note || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <button type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
            </form>
          )}
          {step === 2 && (
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Corporate Hierarchy Overview</label>
                <input type="text" name="corporate_hierarchy_overview" value={corporateHierarchyOverview || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Corporate ID</label>
                <input type="text" name="corporate_id" value={userData?.sid || ''} disabled className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tag</label>
                <input type="text" name="tag" value={tag || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Search Topic</label>
                <select name="topic_id" value={topicId || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                  <option value="">Select a topic</option>
                  <option value="1">Topic 1</option>
                  <option value="2">Topic 2</option>
                </select>
              </div>
              <button type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
            </form>
          )}
          {step === 3 && (
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tools Used</label>
                <input type="text" name="tools_used" value={toolsUsed || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Snap Shot</label>
                <input type="text" name="snap_shot" value={snapShot || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Youtube Video Link</label>
                <input type="text" name="youtube_video_link" value={youtubeVideoLink || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image Associated</label>
                <input type="text" name="image_assc" value={imageAssc || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <button type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
            </form>
          )}
          {step === 4 && (
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Entry Type</label>
                <input type="text" name="entry_type" value={entryType || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity Category</label>
                <input type="text" name="activity_category" value={activityCategory || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity Type</label>
                <input type="text" name="activity_type" value={activityType || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input type="number" name="amount" value={amount || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Job Roles and Description</label>
                <input type="text" name="job_roles_and_description" value={jobRolesAndDescription || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <button type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Submit</button>
            </form>
          )}
          {step === 5 && (
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Participant Quantity</label>
                <input type="number" name="participant_quantity" value={participantQuantity || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Need Approval</label>
                <input type="checkbox" name="need_approval" checked={needApproval || false} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              </div>
              <button type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
            </form>
          )}
          {step === 6 && (
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity Start Date</label>
                <input type="date" name="activity_start_date" value={activityStartDate || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity End Date</label>
                <input type="date" name="activity_end_date" value={activityEndDate || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Submission Start Date</label>
                <input type="date" name="submission_start_date" value={submissionStartDate || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Submission End Date</label>
                <input type="date" name="submission_end_date" value={submissionEndDate || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <button type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
            </form>
          )}

          {errorMessage && <div className="text-red-600 text-sm mb-4">{errorMessage}</div>}
          <div className="flex justify-between">
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)} className="py-2 px-4 bg-gray-500 text-white rounded-md">
                Previous
              </button>
            )}
            {step === 6 ? (
              <button type="button" onClick={nextStep} className="py-2 px-4 bg-blue-500 text-white rounded-md">
                Submit
              </button>
            ) : (
              <button type="button" onClick={nextStep} className="py-2 px-4 bg-blue-500 text-white rounded-md">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Add;