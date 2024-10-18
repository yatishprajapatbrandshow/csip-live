'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
// import JoditEditor from 'jodit-react';
import dynamic from 'next/dynamic';
import { API_URL, API_URL_LOCAL } from "@/Config/Config";
import { useSelector } from 'react-redux';
import Header from '@/Components/Header';
import { X } from 'lucide-react';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import { useRouter } from 'next/router';
import { decrypt } from '@/utils/cryptoUtils';

const Edit = () => {
    const editor = useRef(null);
    const userData = useSelector((state) => state.session.userData);
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
    const [tag, setTag] = useState('');
    const [snapShot, setSnapShot] = useState('');
    const [youtubeVideoLink, setYoutubeVideoLink] = useState('');
    const [imageAssc, setImageAssc] = useState('');
    const [entryType, setEntryType] = useState('');
    const [activityCategory, setActivityCategory] = useState('');
    const [activityType, setActivityType] = useState('');
    const [amount, setAmount] = useState('');
    const [participantQuantity, setParticipantQuantity] = useState('');
    const [needApproval, setNeedApproval] = useState(false);
    const [activityStartDate, setActivityStartDate] = useState('');
    const [activityEndDate, setActivityEndDate] = useState('');
    const [submissionStartDate, setSubmissionStartDate] = useState('');
    const [submissionEndDate, setSubmissionEndDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [id, setId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const dataFormStepData = ['Basic Information', 'Scenario and Description', 'Corporate Information', 'Tools Used', 'Video Podcast Link', 'Job Roles And Description', "Related Topic News", 'Activity Details', 'Participant and Approval', 'Activity and Submission Dates', "Empty", 'Top Employees'];

    const router = useRouter();

    useEffect(() => {
        if (router.query.item) {
            const decryptedItem = decrypt(router.query.item);
            console.log(decryptedItem);
            if (decryptedItem) {
                setId(decryptedItem);
            }
        }
    }, [router.query]);


    const fetchAllCurriculum = async () => {
        const APIURL = `${API_URL}activity/get-by-id?_id=${id}`;
        console.log(APIURL);
        try {
            const response = await fetch(APIURL, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();

            if (responseData.status === true) {
                const data = responseData.data;
                setName(data?.name);
                setShortName(data?.short_name);
                setObjective(data?.objective);
                setShortDesc(data?.short_desc);
                setCaseScenario(data?.case_scenario);
                setCaseScenarioTitle(data?.case_scenario_title);
                setDescription(data?.description);
                setNote(data?.note);
                setCorporateHierarchyOverview(data?.corporate_hierarchy_overview);
                setTag(data?.tag);
                setSelectedTopic(data?.topic_id);
                setToolsUsed(data?.tools_used);
                setSnapShot(data?.snap_shot);
                setYoutubeVideoLink(data?.youtube_video_link);
                setImageAssc(data?.image_assc);
                setJobRolesAndDescription(data?.job_roles_and_description);
                setRelatedTopicNews(data?.related_topic_news);
                setEntryType(data?.entry_type);
                setActivityCategory(data?.activity_category);
                setActivityType(data?.activity_type);
                setAmount(data?.amount);
                setParticipantQuantity(data?.participant_quantity);
                setNeedApproval(data?.need_approval);
                setActivityStartDate(data?.activity_start_date);
                setActivityEndDate(data?.activity_end_date);
                setSubmissionStartDate(data?.submission_start_date);
                setSubmissionEndDate(data?.submission_end_date);
                setTopEmployees(data?.top_employees);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        if (id) {
            fetchAllCurriculum()
        }
    }, [id])

    // Job Roles And Description Functionality
    const [jobRolesAndDescription, setJobRolesAndDescription] = useState([
        {
            jobTitle: '',
            jobRole: '',
            description: '',
            averageSalary: '',
            employmentType: '',
            skillsRequired: [''], // Initialize with one empty skill
        }
    ]);

    // Function to handle changes in the input fields for each job role
    const handleJobRoleChange = (index, field, value) => {
        const newJobRoles = [...jobRolesAndDescription];
        newJobRoles[index][field] = value; // Update the specific field for the job role
        setJobRolesAndDescription(newJobRoles);
    };

    // Function to handle skill changes
    const handleSkillChange = (index, skillIndex, value) => {
        const newJobRoles = [...jobRolesAndDescription];
        newJobRoles[index].skillsRequired[skillIndex] = value; // Update the specific skill
        setJobRolesAndDescription(newJobRoles);
    };

    // Function to add a new skill field
    const addSkillField = (index) => {
        const newJobRoles = [...jobRolesAndDescription];
        newJobRoles[index].skillsRequired.push(''); // Add an empty skill
        setJobRolesAndDescription(newJobRoles);
    };

    // Function to remove a skill field
    const removeSkillField = (index, skillIndex) => {
        const newJobRoles = [...jobRolesAndDescription];
        newJobRoles[index].skillsRequired.splice(skillIndex, 1); // Remove the skill
        setJobRolesAndDescription(newJobRoles);
    };

    // Function to add a new job role
    const addJobRoleField = () => {
        setJobRolesAndDescription([
            ...jobRolesAndDescription,
            {
                jobTitle: '',
                jobRole: '',
                description: '',
                averageSalary: '',
                employmentType: '',
                skillsRequired: [''], // Initialize with one empty skill
            }
        ]);
    };

    // Function to check if the "Add New Job Role" button should be enabled
    const canAddNewJobRole = () => {
        return jobRolesAndDescription.every(jobRole => jobRole.jobTitle && jobRole.jobRole);
    };

    // Tools Used Functionality
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
        return lastTool?.name?.trim() !== '' && lastTool?.category?.trim() !== ''; // Only check required fields
    };

    // Related Topic And News Functionality
    const [relatedTopicNews, setRelatedTopicNews] = useState([
        {
            title: '',
            description: '',
            link: '',
            image: ''
        }
    ]);

    // Handle change for input fields
    const handleNewsChange = (index, field, value) => {
        const newrelatedTopicNews = [...relatedTopicNews];
        newrelatedTopicNews[index][field] = value; // Update the specific field
        setRelatedTopicNews(newrelatedTopicNews);
    };

    // Add a new news item
    const addNewsItem = () => {
        setRelatedTopicNews([
            ...relatedTopicNews,
            {
                title: '',
                description: '',
                link: '',
                image: ''
            }
        ]);
    };

    // Remove a news item
    const removeNewsItem = (index) => {
        const newrelatedTopicNews = [...relatedTopicNews];
        newrelatedTopicNews.splice(index, 1); // Remove the news item
        setRelatedTopicNews(newrelatedTopicNews);
    };

    // TopEmployees 
    const [topEmployees, setTopEmployees] = useState([
        { name: '', companyName: '', linkedInProfile: '' }
    ]);

    const handleEmployeeChange = (index, field, value) => {
        const newEmployees = [...topEmployees];
        newEmployees[index][field] = value;
        setTopEmployees(newEmployees);
    };

    const addEmployee = () => {
        setTopEmployees([...topEmployees, { name: '', companyName: '', linkedInProfile: '' }]);
    };

    const removeEmployee = (index) => {
        const newEmployees = topEmployees.filter((_, i) => i !== index);
        setTopEmployees(newEmployees);
    };

    const addActivityAPI = async (step) => {
        const payload = {}
        if (step === 0) {
            payload._id = id,
                payload.name = name,
                payload.short_name = shortName,
                payload.objective = objective,
                payload.short_desc = shortDesc,
                payload.corporate_id = userData?.sid
        }
        if (step === 1) {
            payload.case_scenario = caseScenario,
                payload.case_scenario_title = caseScenarioTitle,
                payload.description = description,
                payload.note = note
        }
        if (step === 2) {
            payload.corporate_hierarchy_overview = corporateHierarchyOverview,
                payload.corporate_id = userData?.sid,
                payload.tag = tag,
                payload.topic_id = selectedTopic?.sid || ""
        }
        if (step === 3) {
            payload.tools_used = toolsUsed,
                payload.snap_shot = snapShot
        }
        if (step === 4) {
            payload.youtube_video_link = youtubeVideoLink,
                payload.image_assc = imageAssc
        }

        if (step === 5) {
            payload.job_roles_and_description = jobRolesAndDescription
        }
        if (step === 6) {
            payload.related_topic_news = relatedTopicNews
        }
        if (step === 7) {
            payload.entry_type = entryType,
                payload.activity_category = activityCategory,
                payload.activity_type = activityType,
                payload.amount = amount
        }
        if (step === 8) {
            payload.participant_quantity = participantQuantity,
                payload.need_approval = needApproval == "on" ? true : false
        }
        if (step === 9) {
            payload.activity_start_date = activityStartDate,
                payload.activity_end_date = activityEndDate,
                payload.submission_start_date = submissionStartDate,
                payload.submission_end_date = submissionEndDate
        }
        if (step === 10) {

        }
        if (step === 11) {
            payload.top_employees = topEmployees
        }

        if (step > 0) {
            payload._id = id;
            payload.step = step + 1; // Add the step field for steps greater than 0
        }
        if (step == 0) {
            fetchEditApi(payload);
        } else if (step != 0) {
            fetchStepApi(payload)
        } else {
            setStep((pre) => pre += 1)
        }
    }
    const fetchEditApi = async (payload) => {
        try {
            const response = await fetch(`${API_URL_LOCAL}activity/edit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const responseData = await response.json();
            console.log(responseData);

            if (responseData.status === true) {
                alert(`Activity Updated successfully`);
                setStep((prevStep) => prevStep + 1);
            } else {
                alert(responseData.message)
            }
        } catch (error) {
            console.error('API Error:', error);
            throw error; // Rethrow the error for the caller to handle
        }
    }

    const fetchStepApi = async (payload) => {

        try {
            const response = await fetch(`${API_URL}activity/step`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const responseData = await response.json();
            console.log(responseData);

            if (responseData.status === true) {
                alert(responseData.message);
                if (step === 11) {
                    router.push('ActivityList')
                }
                setStep((prevStep) => prevStep + 1);
            } else {
                alert(responseData.message)
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    }
    // Handle topic click
    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
        setSearchTerm('');
    };

    const fetchTopic = async () => {
        setTopics([])
        const APIURL = `${API_URL}topic`
        try {
            const response = await fetch(APIURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    TopicSearch: searchTerm
                }),
            });

            const responseData = await response.json();

            if (responseData.status === true) {
                setTopics(responseData.data)
                console.log(responseData.data);
            } else {
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (searchTerm.length > 2) {
            setErrorMessage('')
            fetchTopic();
        }
    }, [searchTerm])

    return (
        <>
            <Header />
            <section className="bg-bgForm bg-cover bg-center min-h-screen relative overflow-hidden mb-20">
                <div className="absolute bg-white/50 backdrop-blur-sm w-full h-full left-0 top-0" style={{
                    clipPath: 'polygon(100% 35%, 0% 100%, 100% 100%)'
                }} />

                <div className="mx-auto pt-24 relative z-10 px-10 bg-white">
                    <div className='grid grid-cols-4'>
                        <div className='col-span-1 sticky top-0'>
                            <ol className="h-fit overflow-hidden space-y-8">
                                {dataFormStepData?.map((label, index) => (
                                    <li
                                        onClick={() => {
                                            setStep(index)
                                        }}
                                        key={index}
                                        className={`relative flex-1 after:content-[''] after:w-0.5 after:h-full ${step + 1 > index ? 'after:bg-blue-500' : 'after:bg-gray-300'
                                            } after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5 cursor-pointer`}
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
                                        <label className="block text-sm font-medium text-gray-700">Corporate ID</label>
                                        <input type="text" name="corporate_id" value={userData?.sid || ''} disabled className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
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
                                    <div className='flex gap-4'>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                        }} type="button" className="mt-4 p-2 bg-gray-600 text-white rounded " disabled>Back</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addActivityAPI(0)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                                    </div>
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
                                    <div className='flex gap-4'>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setStep((pre) => pre -= 1)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded ">Back</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addActivityAPI(1)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                                    </div>
                                </form>
                            )}
                            {step === 2 && (
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Corporate Hierarchy Overview</label>
                                        <input type="text" name="corporate_hierarchy_overview" value={corporateHierarchyOverview || ''} onChange={(e) => setCorporateHierarchyOverview(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Tag</label>
                                        <input type="text" name="tag" value={tag || ''} onChange={(e) => setTag(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Search Topic</label>

                                        {/* Search Input */}
                                        <input
                                            type="text"
                                            placeholder="Search topics..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                        />

                                        {/* Show selected topic */}
                                        {selectedTopic && (
                                            <p className="mt-2 text-gray-600 p-2 bg-green-200 rounded-lg flex items-center justify-between ">{selectedTopic?.topic} <span className='cursor-pointer' onClick={() => { setSelectedTopic('') }}><X /></span></p>
                                        )}

                                        {/* Div to show filtered topics */}
                                        {searchTerm && (
                                            <div className="mt-2 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto">
                                                {topics.length > 0 ? (
                                                    topics.map((topic) => (
                                                        <div
                                                            key={topic.sid}
                                                            onClick={() => handleTopicClick(topic)}
                                                            className="cursor-pointer p-2 hover:bg-blue-100"
                                                        >
                                                            {topic.topic}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-2 text-gray-500">No topics found</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex gap-4'>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setStep((pre) => pre -= 1)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded ">Back</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addActivityAPI(2)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                                    </div>
                                </form>
                            )}
                            {step === 3 && (
                                <form>
                                    <div className="mb-4">
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
                                    <div className='flex gap-4'>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setStep((pre) => pre -= 1)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded ">Back</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addActivityAPI(3)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                                    </div>
                                </form>
                            )}
                            {step === 4 && (
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Youtube Video Link</label>
                                        <input type="text" name="youtube_video_link" value={youtubeVideoLink || ''} onChange={(e) => setYoutubeVideoLink(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Image Associated</label>
                                        <input type="text" name="image_assc" value={imageAssc || ''} onChange={(e) => setImageAssc(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                    </div>

                                    <div className='flex gap-4'>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setStep((pre) => pre -= 1)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded ">Back</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addActivityAPI(4)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                                    </div>
                                </form>
                            )}
                            {step === 5 && (
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Job Roles and Description</label>
                                        {jobRolesAndDescription.map((jobRole, index) => (
                                            <div key={index} className="mb-6 p-4 border rounded-md shadow-sm">
                                                <h4 className="font-medium text-lg mb-2">Job Role {index + 1}</h4>

                                                <label className="block text-sm font-medium text-gray-700">Job Title <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    value={jobRole.jobTitle}
                                                    onChange={(e) => handleJobRoleChange(index, 'jobTitle', e.target.value)}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                    required
                                                />

                                                <label className="block text-sm font-medium text-gray-700 mt-2">Job Role <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    value={jobRole.jobRole}
                                                    onChange={(e) => handleJobRoleChange(index, 'jobRole', e.target.value)}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                    required
                                                />

                                                <label className="block text-sm font-medium text-gray-700 mt-2">Description</label>
                                                <textarea
                                                    value={jobRole.description}
                                                    onChange={(e) => handleJobRoleChange(index, 'description', e.target.value)}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                    rows="3"
                                                />

                                                <label className="block text-sm font-medium text-gray-700 mt-2">Average Salary</label>
                                                <input
                                                    type="number"
                                                    value={jobRole.averageSalary}
                                                    onChange={(e) => handleJobRoleChange(index, 'averageSalary', e.target.value)}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                />

                                                <label className="block text-sm font-medium text-gray-700 mt-2">Employment Type</label>
                                                <select
                                                    value={jobRole.employmentType}
                                                    onChange={(e) => handleJobRoleChange(index, 'employmentType', e.target.value)}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                >
                                                    <option value="">Select Employment Type</option>
                                                    <option value="Full-Time">Full-Time</option>
                                                    <option value="Part-Time">Part-Time</option>
                                                    <option value="Contract">Contract</option>
                                                </select>

                                                <label className="block text-sm font-medium text-gray-700 mt-2">Skills Required</label>
                                                {jobRole.skillsRequired.map((skill, skillIndex) => (
                                                    <div key={skillIndex} className="flex mb-2">
                                                        <input
                                                            type="text"
                                                            value={skill}
                                                            onChange={(e) => handleSkillChange(index, skillIndex, e.target.value)}
                                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md mr-2"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSkillField(index, skillIndex)}
                                                            className="mt-1 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => addSkillField(index)}
                                                    className="mt-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                >
                                                    Add Skill
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={addJobRoleField}
                                            className={`mt-4 p-2 ${canAddNewJobRole() ? 'bg-green-600' : 'bg-gray-300 cursor-not-allowed'} text-white rounded hover:bg-green-700`}
                                            disabled={!canAddNewJobRole()}
                                        >
                                            Add Another Job Role
                                        </button>
                                    </div>

                                    <div className='flex gap-4'>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setStep((pre) => pre -= 1)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded ">Back</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addActivityAPI(5)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                                    </div>
                                </form>
                            )}
                            {step === 6 && (
                                <form>
                                    {relatedTopicNews.map((newsItem, index) => (
                                        <div key={index} className="mb-6 p-4 border rounded-md shadow-sm">
                                            <h4 className="font-medium text-lg mb-2">News Item {index + 1}</h4>

                                            <label className="block text-sm font-medium text-gray-700">
                                                Title <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={newsItem.title}
                                                onChange={(e) => handleNewsChange(index, 'title', e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />

                                            <label className="block text-sm font-medium text-gray-700 mt-2">Description</label>
                                            <textarea
                                                value={newsItem.description}
                                                onChange={(e) => handleNewsChange(index, 'description', e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                rows="3"
                                            />

                                            <label className="block text-sm font-medium text-gray-700 mt-2">
                                                Link <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="url"
                                                value={newsItem.link}
                                                onChange={(e) => handleNewsChange(index, 'link', e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />

                                            <label className="block text-sm font-medium text-gray-700 mt-2">Image</label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    // Convert the file to a base64 string or handle it as needed
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            handleNewsChange(index, 'image', reader.result); // Store the base64 image data
                                                        };
                                                        reader.readAsDataURL(file);
                                                    } else {
                                                        handleNewsChange(index, 'image', ''); // Clear the image if no file is selected
                                                    }
                                                }}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeNewsItem(index)}
                                                className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Remove News Item
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addNewsItem}
                                        className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Add Another News Item
                                    </button>

                                    <div className='flex gap-4'>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setStep((pre) => pre -= 1)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded ">Back</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addActivityAPI(6)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                                    </div>
                                </form>
                            )}
                            {step === 7 && (
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

                                    <div className='flex gap-4'>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setStep((pre) => pre -= 1)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded ">Back</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addActivityAPI(7)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                                    </div>
                                </form>
                            )}
                            {step === 8 && (
                                <form>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Participant Quantity</label>
                                        <input type="number" name="participant_quantity" value={participantQuantity || ''} onChange={(e) => setParticipantQuantity(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Need Approval</label>
                                        <input type="checkbox" name="need_approval" checked={needApproval || false} onChange={(e) => setNeedApproval(e.target.value)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    </div>
                                    <div className='flex gap-4'>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setStep((pre) => pre -= 1)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded ">Back</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addActivityAPI(8)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                                    </div>
                                </form>
                            )}
                            {step === 9 && (
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

                                    <div className='flex gap-4'>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setStep((pre) => pre -= 1)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded ">Back</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addActivityAPI(9)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                                    </div>
                                </form>
                            )}
                            {step === 10 && (
                                <form>
                                    <div className='flex gap-4'>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setStep((pre) => pre -= 1)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded ">Back</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addActivityAPI(10)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Next</button>
                                    </div>
                                </form>
                            )}
                            {step === 11 && (
                                <form>
                                    {topEmployees.map((employee, index) => (
                                        <div key={index} className="mb-6 p-4 border rounded-md shadow-sm">
                                            <h4 className="font-medium text-lg mb-2">Employee {index + 1}</h4>

                                            <label className="block text-sm font-medium text-gray-700">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={employee.name}
                                                onChange={(e) => handleEmployeeChange(index, 'name', e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />

                                            <label className="block text-sm font-medium text-gray-700 mt-2">
                                                Company Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={employee.companyName}
                                                onChange={(e) => handleEmployeeChange(index, 'companyName', e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                                required
                                            />

                                            <label className="block text-sm font-medium text-gray-700 mt-2">
                                                LinkedIn Profile
                                            </label>
                                            <input
                                                type="url"
                                                value={employee.linkedInProfile}
                                                onChange={(e) => handleEmployeeChange(index, 'linkedInProfile', e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeEmployee(index)}
                                                className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Remove Employee
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={addEmployee}
                                        className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        disabled={topEmployees.some(emp => !emp.name || !emp.companyName)}
                                    >
                                        Add Another Employee
                                    </button>

                                    <div className='flex gap-4'>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setStep((pre) => pre -= 1)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded ">Back</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addActivityAPI(11)
                                        }} type="button" className="mt-4 p-2 bg-blue-600 text-white rounded">Submit</button>
                                    </div>
                                </form>
                            )}
                            {errorMessage && <div className="text-red-600 text-sm mb-4">{errorMessage}</div>}
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default Edit;
