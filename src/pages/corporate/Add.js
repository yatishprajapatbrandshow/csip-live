'use client';

import React, { useState, useRef, useMemo } from 'react';
// import JoditEditor from 'jodit-react';
import dynamic from 'next/dynamic';
import { API_URL } from "@/Config/Config";
import { useSelector } from 'react-redux';
import Header from '@/Components/Header';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Add = () => {

  const editor = useRef(null);
  const [content, setContent] = useState("");




  const userData = useSelector((state) => state.session.userData);
  const [formData, setFormData] = useState({});
  const [topics, setTopics] = useState([]);
  const [step, setStep] = useState(3);
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
  // const [toolsUsed, setToolsUsed] = useState([]);
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

  const [toolsUsed, setToolsUsed] = useState([
    {
      name: '',
      description: '',
      category: '',
      version: '',
      download: '',
      image: ''
    }
  ]);

  // Function to handle changes in the input fields
  const handleToolChange = (index, field, value) => {
    const newTools = [...toolsUsed];
    newTools[index][field] = value; // Update the specific field for the tool
    setToolsUsed(newTools);
  };

  // Function to add a new input field for tools used
  const addToolField = () => {
    setToolsUsed([
      ...toolsUsed,
      {
        name: '',
        description: '',
        category: '',
        version: '',
        download: '',
        image: ''
      }
    ]);
  };

  // Function to check if the last tool is filled with required fields
  const isLastToolFilled = () => {
    const lastTool = toolsUsed[toolsUsed.length - 1];
    return lastTool.name.trim() !== '' && lastTool.category.trim() !== ''; // Only check required fields
  };

  //   try {
  //     const response = await fetch(`${API_URL}activity/step`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const responseData = await response.json();
  //     if (responseData.status === true) {
  //       alert(`Step ${step} added successfully`);
  //     }

  //     setStep((prevStep) => prevStep + 1);
  //   } catch (error) {
  //     setErrorMessage(error.message);
  //   }
  // }


  // const formData = {
  //   name,
  //   short_name: shortName,
  //   objective,
  //   short_desc: shortDesc
  // };

  // try {
  //   const response = await fetch(`${API_URL}activity/add`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   });

  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }

  //   const data = await response.json();
  //   console.log("API Response:", data);
  //   setId(data?.data?.id);
  //   setSid(data?.data?.sid);
  //   setStep((prevStep) => prevStep + 1);

  // } catch (error) {
  //   console.error("Error submitting step 1:", error);
  //   setErrorMessage("There was an error submitting your data. Please try again.");
  // }



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


  const handleActivity = async () => {
    const formData = {
      name: name,
      short_name: shortName,
      objective: objective,
      short_desc: shortDesc
    };

    console.log(JSON.stringify(formData));
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
      console.log(data)


      setId(data?.data?.id);
      setSid(data?.data?.sid);
      setStep((prevStep) => prevStep + 1);

    } catch (error) {
      console.log(error);
      setErrorMessage("There was an error submitting your data. Please try again.");
    }



  }

  return (
    <>
      <Header />
      <section className="bg-bgForm bg-cover bg-center min-h-screen relative overflow-hidden">
        <div className="absolute bg-white/50 backdrop-blur-sm w-full h-full left-0 top-0" style={{
          clipPath: 'polygon(100% 35%, 0% 100%, 100% 100%)'
        }} />

        <div className="mx-auto pt-24 relative z-10 px-10 bg-white">
          <div className='grid grid-cols-4'>
            <div className='col-span-1 sticky top-0'>
              <ol className="h-fit overflow-hidden space-y-8">
                {dataFormStepData?.map((label, index) => (
                  <li
                    key={index}
                    className={`relative flex-1 after:content-[''] after:w-0.5 after:h-full ${step + 1 > index ? 'after:bg-blue-500' : 'after:bg-gray-300'
                      } after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5`}
                  >
                    <a className="flex items-center  w-full">
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
                        <h4 className="text-base  text-gray-800"> {label} </h4>
                        <span className="text-sm text-gray-600">{`Step ${index + 1}`}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ol>

            </div>
            <div className="col-span-3 w-full mx-auto p-6 h-fit bg-white shadow-inner rounded-md">
              <h2 className="text-3xl font-medium text-gray-800 mb-4">{dataFormStepData[step]}</h2>
              {step === 0 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Activity Name</label>
                    <input type="text" name="name" value={name || ''} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Activity Short Name</label>
                    <input type="text" name="short_name" value={shortName || ''} onChange={(e) => setShortName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Objective</label>
                    <JoditEditor
                      value={objective}
                      config={{
                        readonly: false, // Enable editing
                        height: 300, // Customize editor height
                      }}
                      onBlur={(newContent) => setObjective(newContent)} // Update content on blur (lose focus)
                    />
                  </div>
                  <div>

                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-4 font-medium text-gray-700">Short Description</label>
                    <JoditEditor
                      value={shortDesc}
                      config={{
                        readonly: false,
                        height: 400,
                      }}
                      onBlur={(newContent) => setShortDesc(newContent)}
                    />
                  </div>
                  <button onClick={() => handleActivity(0)} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                </form>
              )}
              {step === 1 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Case Scenario</label>
                    <input type="text" name="case_scenario" value={caseScenario || ''} onChange={(e) => setCaseScenario(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Case Scenario Title</label>
                    <input type="text" name="case_scenario_title" value={caseScenarioTitle || ''} onChange={(e) => setCaseScenarioTitle(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input type="text" name="description" value={description || ''} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Note</label>
                    <input type="text" name="note" value={note || ''} onChange={(e) => setNote(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <button onClick={() => handleActivity(1)} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                </form>
              )}
              {step === 2 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Corporate Hierarchy Overview</label>
                    <input type="text" name="corporate_hierarchy_overview" value={corporateHierarchyOverview || ''} onChange={(e) => setCorporateHierarchyOverview(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Corporate ID</label>
                    <input type="text" name="corporate_id" value={userData?.sid || ''} disabled className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tag</label>
                    <input type="text" name="tag" value={tag || ''} onChange={(e) => setTag(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Search Topic</label>
                    <select name="topic_id" value={topicId || ''} onChange={(e) => setTopicId(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
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
                    {toolsUsed.map((tool, index) => (
                      <div key={index} className="mb-6 p-4 border rounded-md shadow-sm">
                        <h4 className="font-medium text-lg mb-2">Tool {index + 1}</h4>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={tool.name}
                          onChange={(e) => handleToolChange(index, 'name', e.target.value)}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-2">Description</label>
                        <input
                          type="text"
                          value={tool.description}
                          onChange={(e) => handleToolChange(index, 'description', e.target.value)}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-2">Category</label>
                        <input
                          type="text"
                          value={tool.category}
                          onChange={(e) => handleToolChange(index, 'category', e.target.value)}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-2">Version</label>
                        <input
                          type="text"
                          value={tool.version}
                          onChange={(e) => handleToolChange(index, 'version', e.target.value)}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-2">Download Link</label>
                        <input
                          type="text"
                          value={tool.download}
                          onChange={(e) => handleToolChange(index, 'download', e.target.value)}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-2">Image</label>
                        <input
                          type="file"
                          onChange={(e) => handleToolChange(index, 'image', e.target.files[0])}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addToolField}
                      disabled={!isLastToolFilled()} // Disable if last tool's fields are not filled
                      className={`mt-4 p-2 rounded ${isLastToolFilled() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      Add Another Tool
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Snap Shot</label>
                    <input type="text" name="snap_shot" value={snapShot || ''} onChange={(e) => setSnapShot(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Youtube Video Link</label>
                    <input type="text" name="youtube_video_link" value={youtubeVideoLink || ''} onChange={(e) => setYoutubeVideoLink(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Image Associated</label>
                    <input type="text" name="image_assc" value={imageAssc || ''} onChange={(e) => setImageAssc(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <button type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                </form>
              )}
              {step === 4 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Entry Type</label>
                    <input type="text" name="entry_type" value={entryType || ''} onChange={(e) => setEntryType(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Activity Category</label>
                    <input type="text" name="activity_category" value={activityCategory || ''} onChange={(e) => setActivityCategory(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Activity Type</label>
                    <input type="text" name="activity_type" value={activityType || ''} onChange={(e) => setActivityType(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input type="number" name="amount" value={amount || ''} onChange={(e) => setAmount(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Job Roles and Description</label>
                    <input type="text" name="job_roles_and_description" value={jobRolesAndDescription || ''} onChange={(e) => setJobRolesAndDescription(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <button type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Submit</button>
                </form>
              )}
              {step === 5 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Participant Quantity</label>
                    <input type="number" name="participant_quantity" value={participantQuantity || ''} onChange={(e) => setParticipantQuantity(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Need Approval</label>
                    <input type="checkbox" name="need_approval" checked={needApproval || false} onChange={(e) => setNeedApproval(e.target.value)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  </div>
                  <button type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                </form>
              )}
              {step === 6 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Activity Start Date</label>
                    <input type="date" name="activity_start_date" value={activityStartDate || ''} onChange={(e) => setActivityStartDate(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Activity End Date</label>
                    <input type="date" name="activity_end_date" value={activityEndDate || ''} onChange={(e) => setActivityEndDate(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Submission Start Date</label>
                    <input type="date" name="submission_start_date" value={submissionStartDate || ''} onChange={(e) => setSubmissionStartDate(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Submission End Date</label>
                    <input type="date" name="submission_end_date" value={submissionEndDate || ''} onChange={(e) => setSubmissionEndDate(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                  </div>
                  <button type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                </form>
              )}

              {errorMessage && <div className="text-red-600 text-sm mb-4">{errorMessage}</div>}
              {/* <div className="flex justify-between">
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
            </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Add;
