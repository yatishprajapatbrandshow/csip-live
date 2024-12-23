"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
// import JoditEditor from 'jodit-react';
import dynamic from "next/dynamic";
import { API_URL, API_URL_LOCAL } from "@/Config/Config";
import { useSelector } from "react-redux";
import Header from "@/Components/Header";
import { X } from "lucide-react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import { useRouter } from "next/router";
import { getLocalStorageItem } from "@/Config/localstorage";
import ImageUploader from "@/Components/ImageUploader";

const Add = () => {
  const editor = useRef(null);
  const router = useRouter();
  const userData = useSelector((state) => state.session.userData);
  const [topics, setTopics] = useState([]);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [objective, setObjective] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [caseScenario, setCaseScenario] = useState("");
  const [caseScenarioTitle, setCaseScenarioTitle] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [videoUrl, setvideoUrl] = useState("");
  const [corporateHierarchyOverview, setCorporateHierarchyOverview] = useState("");
  // const [tag, setTag] = useState("");
  const [snapShot, setSnapShot] = useState("");
  const [youtubeVideoLink, setYoutubeVideoLink] = useState([""]);
  const [imageAssc, setImageAssc] = useState("");
  const [entryType, setEntryType] = useState("");
  const [activityCategory, setActivityCategory] = useState("");
  const [activityType, setActivityType] = useState("");
  const [amount, setAmount] = useState("");
  const [participantQuantity, setParticipantQuantity] = useState("");
  const [needApproval, setNeedApproval] = useState(false);
  const [activityStartDate, setActivityStartDate] = useState("");
  const [activityEndDate, setActivityEndDate] = useState("");
  const [submissionStartDate, setSubmissionStartDate] = useState("");
  const [submissionEndDate, setSubmissionEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [activityId, setActivityId] = useState(null);
  const [AllComments, setAllComments] = useState([]);
  const [comment, setComment] = useState({
    commentId: null,
    name: '',
    email: '',
    designation: '',
    companyName: '',
    comment: '',
    profilePic: '',
    parentId: 0,
    pageUrl: '',
  });

  // Function to update a comment using POST API
  const fetchComments = async (activity) => {
    try {
      const response = await fetch(`${API_URL}new-comments?activity_id=${activity}`, { // Use the POST API for updating
        method: 'GET', // Using POST for updating
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.status) {
        setAllComments(responseData.data);
      }
      // Update the AllComments state with the new updated comment data
      alert('Comment updated successfully!');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Error updating comment: ' + error.message);
    }
  };
  const updateCommentAPI = async (commentId) => {

    try {
      const response = await fetch(`${API_URL}new-comments/update-comment`, { // Use the POST API for updating
        method: 'POST', // Using POST for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...comment, commentId }), // Include the commentId in0 the body
      });

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }

      const updatedComment = await response.json();

      // Update the AllComments state with the new updated comment data
      setAllComments((prevComments) =>
        prevComments.map((item) =>
          item.commentId === updatedComment.data.commentId ? updatedComment.data : item
        )
      );

      alert('Comment updated successfully!');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Error updating comment: ' + error.message);
    }
  };
  const addCommentAPI = async () => {
    const payload = {
      name: comment.name,
      email: comment.email,
      designation: comment.designation,
      companyName: comment.companyName,
      comment: comment.comment,
      profilePic: comment.profilePic,
      parentId: comment.parentId,
      pageUrl: comment.pageUrl,
      activity_id: id
    }

    try {
      const response = await fetch(`${API_URL}new-comments/add-comment`, { // Use the POST API for updating
        method: 'POST', // Using POST for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload }), // Include the commentId in0 the body
      });

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }

      const newComment = await response.json();

      // Update the AllComments state with the new updated comment data
      setAllComments((prevComments) =>
        prevComments.map((item) =>
          item.commentId === newComment.data.commentId ? newComment.data : item
        )
      );
      setComment({
        commentId: null,
        name: '',
        email: '',
        designation: '',
        companyName: '',
        comment: '',
        profilePic: '',
        parentId: 0,
        pageUrl: '',
      })
      fetchComments(id)
      alert('Comment updated successfully!');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Error updating comment: ' + error.message);
    }
  };
  const [isAddingNewComment, setIsAddingNewComment] = useState(true); // Always true when no comments
  const [isEditing, setIsEditing] = useState(false);
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [editReplyIndex, setEditReplyIndex] = useState(null);     // New state to track reply editing
  // Handle input change in the comment form
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };


  // Handle click on Edit
  const onEdit = (index) => {
    setComment(AllComments[index]); // Pre-fill the form with selected comment data
    setIsEditing(true);
    setIsAddingNewComment(true); // Show the form when editing
    setEditCommentIndex(index);
  };
  // Handle click on Edit for a reply
  const onEditReply = (replyIndex, commentIndex) => {
    // Get the specific reply from the parent comment
    const selectedReply = AllComments[commentIndex].replies[replyIndex];

    // Pre-fill the form with the reply data
    setComment(selectedReply); // Fill the form with the selected reply data
    setIsEditing(true);        // Set to edit mode
    setIsAddingNewComment(true); // Show the form when editing
    setEditCommentIndex(commentIndex); // Track the parent comment index
    setEditReplyIndex(replyIndex); // Track the reply index for editing
  };
  // Handle click on Reply
  const onReply = async (item) => {
    setIsEditing(false);
    setIsAddingNewComment(true);
    setComment({
      commentId: null,
      name: '',
      email: '',
      designation: '',
      companyName: '',
      comment: '',
      profilePic: '',
      parentId: item.commentId,
      pageUrl: '',
    });
  };
  // Add new comment button
  const handleAddNewComment = () => {
    setIsAddingNewComment(true);
    setIsEditing(false); // Reset editing state
    setComment({
      name: '',
      email: '',
      designation: '',
      companyName: '',
      comment: '',
      profilePic: '',
      parentId: 0,
      pageUrl: '',
    });
  };
  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    const userData = getLocalStorageItem("userData");
    if (userData) {
      setIsSession(true);
      if (userData.type !== "Corporate") {
        router.push("/dashboard");
      }
    } else {
      router.push("/");
      setIsSession(false);
    }
  }, []);

  const dataFormStepData = [
    "Basic Information",
    "Scenario and Description",
    "Corporate Information",
    "Tools Used",
    "Video Podcast Link",
    "Job Roles And Description",
    "Related Topic News",
    "Activity Details",
    "Participant and Approval",
    "Activity and Submission Dates",
    "Comments",
    "Top Employees",
  ];

  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);

  // Function to handle adding the tag to the array
  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);  // Add tag to the tags array
      setTag('');  // Reset input field
    }
  };

  // Function to handle removing a tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));  // Remove the selected tag
  };

  // Handle "Enter" key press to add tag
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  // const [comment, setComment] = useState({
  //   name: '',
  //   email: '',
  //   designation: '',
  //   companyName: '',
  //   comment: '', // Renamed to comment to avoid confusion with state name
  //   profilePic: '',
  //   parentId: 0,
  //   pageUrl: '',
  // });


  // const handleCommentChange = (e) => {
  //   const { name, value } = e.target;
  //   setComment((prevComment) => ({
  //     ...prevComment,
  //     [name]: value,
  //   }));
  // };


  // Job Roles And Description Functionality
  const [jobRolesAndDescription, setJobRolesAndDescription] = useState([
    {
      jobTitle: "",
      jobRole: "",
      description: "",
      averageSalary: "",
      employmentType: "",
      skillsRequired: [""], // Initialize with one empty skill
    },
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
    newJobRoles[index].skillsRequired.push(""); // Add an empty skill
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
        jobTitle: "",
        jobRole: "",
        description: "",
        averageSalary: "",
        employmentType: "",
        skillsRequired: [""], // Initialize with one empty skill
      },
    ]);
  };

  // Function to check if the "Add New Job Role" button should be enabled
  const canAddNewJobRole = () => {
    return jobRolesAndDescription.every(
      (jobRole) => jobRole.jobTitle && jobRole.jobRole
    );
  };

  // Tools Used Functionality
  const [toolsUsed, setToolsUsed] = useState([
    {
      name: "",
      description: "",
      // category: "",
      // version: "",
      // download: "",
      image: "",
    },
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
        name: "",
        description: "",
        // category: "",
        // version: "",
        // download: "",
        image: "",
      },
    ]);
  };

  // Function to check if the last tool is filled with required fields
  const isLastToolFilled = () => {
    const lastTool = toolsUsed[toolsUsed.length - 1];
    return lastTool.name.trim() !== ""; // Only check required fields
    // return lastTool.name.trim() !== "" && lastTool.category.trim() !== ""; // Only check required fields
  };

  // Related Topic And News Functionality
  const [relatedTopicNews, setRelatedTopicNews] = useState([
    {
      title: "",
      description: "",
      link: "",
      image: "",
    },
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
        title: "",
        description: "",
        link: "",
        image: "",
      },
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
    { name: "", companyName: "", linkedInProfile: "" },
  ]);

  const handleEmployeeChange = (index, field, value) => {
    const newEmployees = [...topEmployees];
    newEmployees[index][field] = value;
    setTopEmployees(newEmployees);
  };

  const addEmployee = () => {
    setTopEmployees([
      ...topEmployees,
      { name: "", companyName: "", linkedInProfile: "" },
    ]);
  };

  const removeEmployee = (index) => {
    const newEmployees = topEmployees.filter((_, i) => i !== index);
    setTopEmployees(newEmployees);
  };



  // Youtube video multiple ulrs 
  const handleInputChange = (index, value) => {
    const newLinks = [...youtubeVideoLink];
    newLinks[index] = value;
    setYoutubeVideoLink(newLinks);
  };

  const handleAddInput = () => {
    setYoutubeVideoLink([...youtubeVideoLink, '']); // Add a new empty input
  };

  const handleRemoveInput = (index) => {
    const newLinks = youtubeVideoLink.filter((_, i) => i !== index);
    setYoutubeVideoLink(newLinks); // Remove the input at the specified index
  };


  const addActivityAPI = async (step) => {
    const payload = {};
    if (step === 0) {
      (payload.name = name),
        (payload.corporate_id = userData?.sid),
        (payload.short_name = shortName),
        (payload.objective = objective),
        (payload.short_desc = shortDesc);
      (payload.image_assc = imageAssc);
    }
    if (step === 1) {
      (payload.case_scenario = caseScenario),
        (payload.case_scenario_title = caseScenarioTitle),
        (payload.description = description),
        (payload.note = note);
      (payload.video_url = videoUrl);
    }
    if (step === 2) {
      (payload.corporate_hierarchy_overview = corporateHierarchyOverview),
        (payload.tag = tags),
        (payload.topic_id = selectedTopic?.sid || "");
    }
    if (step === 3) {
      (payload.tools_used = toolsUsed), (payload.snap_shot = snapShot);
    }
    if (step === 4) {
      (payload.youtube_video_link = youtubeVideoLink),
        (payload.image_assc = imageAssc);
    }

    if (step === 5) {
      payload.job_roles_and_description = jobRolesAndDescription;
    }
    if (step === 6) {
      payload.related_topic_news = relatedTopicNews;
    }
    if (step === 7) {
      (payload.entry_type = entryType),
        (payload.activity_category = activityCategory),
        (payload.activity_type = activityType),
        (payload.amount = amount);
    }
    if (step === 8) {
      (payload.participant_quantity = participantQuantity),
        (payload.need_approval = needApproval == "on" ? true : false);
    }
    if (step === 9) {
      (payload.activity_start_date = activityStartDate),
        (payload.activity_end_date = activityEndDate),
        (payload.submission_start_date = submissionStartDate),
        (payload.submission_end_date = submissionEndDate);
    }
    if (step === 10) {
    }
    if (step === 11) {
      payload.top_employees = topEmployees;
    }

    if (step > 0) {
      payload._id = id;
      payload.step = step + 1; // Add the step field for steps greater than 0
    }

    if (step == 0 && id === null) {
      fetchAddApi(payload);
    } else if (step != 0) {
      fetchStepApi(payload);
    } else {
      setStep((pre) => (pre += 1));
    }
  };

  const fetchAddApi = async (payload) => {

    if (payload.image_assc) {
      try {
        // Wait for the image upload to complete
        const result = await handleUpload(payload.image_assc);
        console.log(result);

        if (result?.fileUrl) {
          const imageAsscFinal = result?.fileUrl?.split('https://csip-image.blr1.digitaloceanspaces.com/img/content/')[1];
          console.log(imageAsscFinal);

          payload.image_assc = imageAsscFinal
        }
      } catch (error) {
        console.error(`Error uploading image`, error);
      }
    }

    try {
      const response = await fetch(`${API_URL}activity/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.status === true) {
        alert(`Activity Created successfully`);
        setId(responseData?.data?.id);
        setStep((prevStep) => prevStep + 1);
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };

  const fetchStepApi = async (payload) => {
    if (payload.tools_used) {
      for (const tool of payload.tools_used) {
        if (tool.image && typeof tool.image !== 'string') { // Ensure it's a file and not an already uploaded URL
          console.log(`Uploading image for tool: ${tool.name || "Unnamed tool"}`);
          try {
            // Wait for the image upload to complete
            const result = await handleUpload(tool.image);
            console.log(result);

            if (result?.fileUrl) {
              tool.image = result?.fileUrl?.split('https://csip-image.blr1.digitaloceanspaces.com/img/content/')[1];
            }
          } catch (error) {
            console.error(`Error uploading image for tool: ${tool.name || "Unnamed tool"}`, error);
          }
        }
      }
    }

    if (payload.related_topic_news) {

      for (const news of payload.related_topic_news) {
        if (news.image && typeof news.image !== 'string') { // Ensure it's a file and not an already uploaded URL
          console.log(`Uploading image for tool: ${news.name || "Unnamed news"}`);
          try {
            // Wait for the image upload to complete
            const result = await handleUpload(news.image);


            if (result?.fileUrl) {
              news.image = result?.fileUrl?.split('https://csip-image.blr1.digitaloceanspaces.com/img/content/')[1];
            }
          } catch (error) {
            console.error(`Error uploading image for tool: ${news.name || "Unnamed tool"}`, error);
          }
        }
      }
    }

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
          router.push("ActivityList");
        }
        setStep((prevStep) => prevStep + 1);
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const fetchUpdateStatus = async (status) => {
    const payload = {
      _id: id,
      status,
    };
    try {
      const response = await fetch(`${API_URL}activity/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();


      if (responseData.status === true) {
        alert(responseData.message);
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  // Handle topic click
  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setSearchTerm("");
  };

  const fetchTopic = async () => {
    setTopics([]);
    const APIURL = `${API_URL}topic`;
    try {
      const response = await fetch(APIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TopicSearch: searchTerm,
        }),
      });

      const responseData = await response.json();

      if (responseData.status === true) {
        setTopics(responseData.data);
        console.log(responseData.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 2) {
      setErrorMessage("");
      fetchTopic();
    }
  }, [searchTerm]);


  const handleUpload = async (file) => {

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

      return result.data;
    } catch (error) {
      console.log("error here", error);
    }
  };


  return (
    <>
      <Header />

      <section className="bg-bgForm bg-cover bg-center min-h-screen relative overflow-hidden mb-20">
        <div
          className="absolute bg-white/50 backdrop-blur-sm w-full h-full left-0 top-0"
          style={{
            clipPath: "polygon(100% 35%, 0% 100%, 100% 100%)",
          }}
        />

        <div className="mx-auto pt-24 relative z-10 px-10 bg-white">
          <div className="grid grid-cols-4">
            <div className="col-span-4 flex gap-5 mb-5 justify-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("activitylist");
                }}
                type="button"
                className="mb-2 p-2 bg-blue-600 text-white rounded"
              >
                Go To List
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                type="button"
                className="mb-2 p-2 bg-blue-600 text-white rounded cursor-not-allowed"
                disabled
              >
                Preview
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fetchUpdateStatus("Draft");
                }}
                type="button"
                className="mb-2 p-2 bg-blue-600 text-white rounded"
              >
                Draft
              </button>
              <ImageUploader />
            </div>
            <div className="col-span-1 sticky top-0">
              <ol className="h-fit overflow-hidden space-y-8">
                {dataFormStepData?.map((label, index) => (
                  <li
                    key={index}
                    className={`relative flex-1 after:content-[''] after:w-0.5 after:h-full ${step + 1 > index
                      ? "after:bg-blue-500"
                      : "after:bg-gray-300"
                      } after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5`}
                  >
                    <a className="flex items-center  w-full">
                      <span
                        className={`w-8 h-8 ${step + 1 > index ? "bg-blue-500" : "bg-gray-100"
                          } border-2 border-gray-300 rounded-full flex justify-center items-center mr-3 text-sm ${step + 1 > index ? "text-white" : "text-gray-900"
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
                        <span className="text-sm text-gray-600">{`Step ${index + 1
                          }`}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <div className="col-span-3 w-full mx-auto p-6 h-fit bg-white shadow-inner rounded-md">
              <h2 className="text-3xl font-medium text-gray-800 mb-4">
                {dataFormStepData[step]}
              </h2>
              {step === 0 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Activity Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name || ""}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Activity Short Name
                    </label>
                    <input
                      type="text"
                      name="short_name"
                      value={shortName || ""}
                      onChange={(e) => setShortName(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Corporate ID
                    </label>
                    <input
                      type="text"
                      name="corporate_id"
                      value={userData?.sid || ""}
                      disabled
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Image Associated
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        e.preventDefault()
                        setImageAssc(e.target.files[0])
                      }
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Objective
                    </label>
                    <JoditEditor
                      value={objective}
                      config={{
                        readonly: false, // Enable editing
                        height: 300, // Customize editor height
                      }}
                      onBlur={(newContent) => setObjective(newContent)} // Update content on blur (lose focus)
                    />
                  </div>
                  <div></div>
                  <div className="mb-4">
                    <label className="block text-sm mb-4 font-medium text-gray-700">
                      Short Description
                    </label>
                    <JoditEditor
                      value={shortDesc}
                      config={{
                        readonly: false,
                        height: 400,
                      }}
                      onBlur={(newContent) => setShortDesc(newContent)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      type="button"
                      className="mt-4 p-2 bg-gray-600 text-white rounded "
                      disabled
                    >
                      Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addActivityAPI(0);
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}
              {step === 1 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Case Scenario Title
                    </label>
                    <input
                      type="text"
                      name="case_scenario_title"
                      value={caseScenarioTitle || ""}
                      onChange={(e) => setCaseScenarioTitle(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Video Url
                    </label>
                    <input
                      type="text"
                      name="case_scenario_title"
                      value={videoUrl || ""}
                      onChange={(e) => setvideoUrl(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Case Scenario
                    </label>

                    <JoditEditor
                      value={caseScenario}
                      config={{
                        readonly: false,
                        height: 400,
                      }}
                      onBlur={(newContent) => setCaseScenario(newContent)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>

                    <JoditEditor
                      value={description}
                      config={{
                        readonly: false,
                        height: 400,
                      }}
                      onBlur={(newContent) => setDescription(newContent)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Note
                    </label>
                    {/*<input
                      type="text"
                      name="note"
                      value={note || ""}
                      onChange={(e) => setNote(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />*/}
                    <JoditEditor
                      value={note || ""}
                      config={{
                        readonly: false,
                        height: 400,
                      }}
                      onBlur={(newContent) => setNote(newContent)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setStep((pre) => (pre -= 1));
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded "
                    >
                      Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addActivityAPI(1);
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}
              {step === 2 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Corporate Hierarchy Overview
                    </label>
                    {/* <input
                      type="text"
                      name="corporate_hierarchy_overview"
                      value={corporateHierarchyOverview || ""}
                      onChange={(e) =>
                        setCorporateHierarchyOverview(e.target.value)
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    /> */}
                    <JoditEditor
                      value={corporateHierarchyOverview || ""}
                      config={{
                        readonly: false,
                        height: 400,
                      }}
                      className="mt-2"
                      onBlur={(newContent) => setCorporateHierarchyOverview(newContent)}
                    />
                  </div>

                  <div className="mb-4">
                    {/*<input
                      type="text"
                      name="tag"
                      value={tag || ""}
                      onChange={(e) => setTag(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />*/}
                    {/* <JoditEditor
                      value={tag}
                      config={{
                        readonly: false,
                        height: 400,
                      }}
                      onBlur={(newContent) => setTag(newContent)}
                    /> */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Tag</label>
                      <div className="flex items-center mt-1">
                        <input
                          type="text"
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                          onKeyDown={handleKeyDown}  // Add tag on "Enter" press
                          className="p-2 border border-gray-300 rounded-md flex-grow"
                          placeholder="Type and press Enter or click Add"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            handleAddTag()
                          }}
                          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                          Add
                        </button>
                      </div>

                      {/* Display the tags */}
                      <div className="mt-3 flex flex-wrap">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-green-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2"
                          >
                            {tag}
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                handleRemoveTag(tag)
                              }}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Search Topic
                    </label>

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
                      <p className="mt-2 text-gray-600 p-2 bg-green-200 rounded-lg flex items-center justify-between ">
                        {selectedTopic?.topic}{" "}
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedTopic("");
                          }}
                        >
                          <X />
                        </span>
                      </p>
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
                          <div className="p-2 text-gray-500">
                            No topics found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setStep((pre) => (pre -= 1));
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded "
                    >
                      Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addActivityAPI(2);
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}
              {step === 3 && (
                <form>
                  <div className="mb-4">
                    {toolsUsed.map((tool, index) => (
                      <div
                        key={index}
                        className="mb-6 p-4 border rounded-md shadow-sm"
                      >
                        <h4 className="font-medium text-lg mb-2">
                          Tool {index + 1}
                        </h4>
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          value={tool.name}
                          onChange={(e) =>
                            handleToolChange(index, "name", e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-2">
                          Description
                        </label>
                        <JoditEditor
                          value={tool.description}
                          config={{
                            readonly: false,
                            height: 400,
                          }}
                          onBlur={(newContent) => handleToolChange(
                            index,
                            "description",
                            newContent
                          )}
                        />

                        {/* <label className="block text-sm font-medium text-gray-700 mt-2">
                          Category
                        </label>
                        <input
                          type="text"
                          value={tool.category}
                          onChange={(e) =>
                            handleToolChange(index, "category", e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-2">
                          Version
                        </label>
                        <input
                          type="text"
                          value={tool.version}
                          onChange={(e) =>
                            handleToolChange(index, "version", e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-2">
                          Download Link
                        </label>
                        <input
                          type="text"
                          value={tool.download}
                          onChange={(e) =>
                            handleToolChange(index, "download", e.target.value)
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        /> */}
                        <label className="block text-sm font-medium text-gray-700 mt-2">
                          Image
                        </label>
                        <input
                          type="file"
                          onChange={(e) =>
                            handleToolChange(index, "image", e.target.files[0])
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addToolField}
                      disabled={!isLastToolFilled()} // Disable if last tool's fields are not filled
                      className={`mt-4 p-2 rounded ${isLastToolFilled()
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      Add Another Tool
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Snap Shot
                    </label>
                    {/*<input
                      type="text"
                      name="snap_shot"
                      value={snapShot || ""}
                      onChange={(e) => setSnapShot(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />*/}
                    <JoditEditor
                      value={snapShot}
                      config={{
                        readonly: false,
                        height: 400,
                      }}
                      onBlur={(newContent) => setSnapShot(newContent)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setStep((pre) => (pre -= 1));
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded "
                    >
                      Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addActivityAPI(3);
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}
              {step === 4 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">YouTube Video Links</label>
                    {youtubeVideoLink?.map((link, index) => (
                      <div key={index} className="flex items-center mt-2">
                        <input
                          type="text"
                          name={`youtube_video_link_${index}`}
                          value={link}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveInput(index)}
                          className="ml-2 text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddInput}
                      className="mt-2 text-blue-600"
                    >
                      Add Another Video Link
                    </button>
                  </div>


                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setStep((pre) => (pre -= 1));
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded "
                    >
                      Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addActivityAPI(4);
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}
              {step === 5 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Job Roles and Description
                    </label>
                    {jobRolesAndDescription.map((jobRole, index) => (
                      <div
                        key={index}
                        className="mb-6 p-4 border rounded-md shadow-sm"
                      >
                        <h4 className="font-medium text-lg mb-2">
                          Job Role {index + 1}
                        </h4>

                        <label className="block text-sm font-medium text-gray-700">
                          Job Title <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={jobRole.jobTitle}
                          onChange={(e) =>
                            handleJobRoleChange(
                              index,
                              "jobTitle",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md resize-none"
                          required
                          rows="3"
                        />

                        <label className="block text-sm font-medium text-gray-700 mt-2">
                          Job Role <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={jobRole.jobRole}
                          rows="3"
                          onChange={(e) =>
                            handleJobRoleChange(
                              index,
                              "jobRole",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md resize-none"
                          required
                        />

                        <label className="block text-sm font-medium text-gray-700 mt-2">Description</label>

                        <JoditEditor
                          value={jobRole?.description}
                          config={{
                            readonly: false,
                            height: 400,
                          }}
                          onBlur={(newContent) => handleJobRoleChange(index, 'description', newContent)}
                        />

                        <label className="block text-sm font-medium text-gray-700 mt-2">
                          Average Salary
                        </label>
                        <input
                          type="number"
                          value={jobRole.averageSalary}
                          onChange={(e) =>
                            handleJobRoleChange(
                              index,
                              "averageSalary",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />

                        <label className="block text-sm font-medium text-gray-700 mt-2">
                          Employment Type
                        </label>
                        <select
                          value={jobRole.employmentType}
                          onChange={(e) =>
                            handleJobRoleChange(
                              index,
                              "employmentType",
                              e.target.value
                            )
                          }
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select Employment Type</option>
                          <option value="Full-Time">Full-Time</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Contract">Contract</option>
                        </select>

                        <label className="block text-sm font-medium text-gray-700 mt-2">
                          Skills Required
                        </label>
                        {jobRole.skillsRequired.map((skill, skillIndex) => (
                          <div key={skillIndex} className="flex mb-2">
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) =>
                                handleSkillChange(
                                  index,
                                  skillIndex,
                                  e.target.value
                                )
                              }
                              className="mt-1 block w-full p-2 border border-gray-300 rounded-md mr-2"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removeSkillField(index, skillIndex)
                              }
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
                      className={`mt-4 p-2 ${canAddNewJobRole()
                        ? "bg-green-600"
                        : "bg-gray-300 cursor-not-allowed"
                        } text-white rounded hover:bg-green-700`}
                      disabled={!canAddNewJobRole()}
                    >
                      Add Another Job Role
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setStep((pre) => (pre -= 1));
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded "
                    >
                      Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addActivityAPI(5);
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}
              {step === 6 && (
                <form>
                  {relatedTopicNews.map((newsItem, index) => (
                    <div
                      key={index}
                      className="mb-6 p-4 border rounded-md shadow-sm"
                    >
                      <h4 className="font-medium text-lg mb-2">
                        News Item {index + 1}
                      </h4>

                      <label className="block text-sm font-medium text-gray-700">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newsItem.title}
                        onChange={(e) =>
                          handleNewsChange(index, "title", e.target.value)
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />

                      <label className="block text-sm font-medium text-gray-700 mt-2">
                        Description
                      </label>
                      <textarea
                        value={newsItem.description}
                        onChange={(e) =>
                          handleNewsChange(index, "description", e.target.value)
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        rows="3"
                      />

                      <label className="block text-sm font-medium text-gray-700 mt-2">
                        Link <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        value={newsItem.link}
                        onChange={(e) =>
                          handleNewsChange(index, "link", e.target.value)
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />

                      <label className="block text-sm font-medium text-gray-700 mt-2">
                        Image
                      </label>
                      <input
                        type="file"
                        onChange={(e) => {
                          // Convert the file to a base64 string or handle it as 
                          handleNewsChange(index, "image", e.target.files[0]); // Store the base64 image data
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

                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setStep((pre) => (pre -= 1));
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded "
                    >
                      Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addActivityAPI(6);
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}
              {step === 7 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Entry Type
                    </label>
                    <input
                      type="text"
                      name="entry_type"
                      value={entryType || ""}
                      onChange={(e) => setEntryType(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Activity Category
                    </label>
                    <input
                      type="text"
                      name="activity_category"
                      value={activityCategory || ""}
                      onChange={(e) => setActivityCategory(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Activity Type
                    </label>
                    <input
                      type="text"
                      name="activity_type"
                      value={activityType || ""}
                      onChange={(e) => setActivityType(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={amount || ""}
                      onChange={(e) => setAmount(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setStep((pre) => (pre -= 1));
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded "
                    >
                      Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addActivityAPI(7);
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}
              {step === 8 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Participant Quantity
                    </label>
                    <input
                      type="number"
                      name="participant_quantity"
                      value={participantQuantity || ""}
                      onChange={(e) => setParticipantQuantity(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Need Approval
                    </label>
                    <input
                      type="checkbox"
                      name="need_approval"
                      checked={needApproval || false}
                      onChange={(e) => setNeedApproval(e.target.value)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setStep((pre) => (pre -= 1));
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded "
                    >
                      Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addActivityAPI(8);
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}
              {step === 9 && (
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Activity Start Date
                    </label>
                    <input
                      type="date"
                      name="activity_start_date"
                      value={activityStartDate || ""}
                      onChange={(e) => setActivityStartDate(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Activity End Date
                    </label>
                    <input
                      type="date"
                      name="activity_end_date"
                      value={activityEndDate || ""}
                      onChange={(e) => setActivityEndDate(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Submission Start Date
                    </label>
                    <input
                      type="date"
                      name="submission_start_date"
                      value={submissionStartDate || ""}
                      onChange={(e) => setSubmissionStartDate(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Submission End Date
                    </label>
                    <input
                      type="date"
                      name="submission_end_date"
                      value={submissionEndDate || ""}
                      onChange={(e) => setSubmissionEndDate(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {/* {topEmployees.map((employee, index) => (
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
                  </button> */}

                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setStep((pre) => (pre -= 1));
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded "
                    >
                      Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addActivityAPI(9);
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}
              {step === 10 && (
                <div>
                  {AllComments.length > 0 ? (
                    <div>
                      {AllComments.map((item, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-300 rounded-lg shadow-md mb-4 transition-transform duration-200 hover:shadow-lg"
                        >
                          <div className="flex items-start">
                            <img
                              src={item.profilePic}
                              alt={item.name}
                              className="w-12 h-12 rounded-full border border-gray-200 mr-4"
                            />
                            <div className="w-full flex justify-between">
                              <div className="flex flex-col">
                                <div className="flex justify-start items-center gap-2">
                                  <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                                  <p className="text-sm text-gray-600">
                                    {item.designation} at {item.companyName}
                                  </p>
                                </div>
                                <p className="text-base text-gray-700 mt-1">{item.comment}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => onEdit(index)}
                                  className="px-3 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200 h-max py-1"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => onReply(item)}
                                  className="px-3 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200 h-max py-1"
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Replies Section */}
                          {item.replies && item.replies.length > 0 && (
                            <div className="mt-4 pl-10">
                              <h3 className="text-md font-semibold text-gray-700 mb-2">Replies</h3>
                              {item.replies.map((reply, replyIndex) => (
                                <div
                                  key={replyIndex}
                                  className="flex items-start mb-3"
                                >
                                  <img
                                    src={reply.profilePic}
                                    alt={reply.name}
                                    className="w-10 h-10 rounded-full border border-gray-200 mr-4"
                                  />
                                  <div className="w-full flex justify-between">
                                    <div className="flex flex-col">
                                      <div className="flex justify-start items-center gap-2">
                                        <h4 className="text-md font-semibold text-gray-800">{reply.name}</h4>
                                        <p className="text-sm text-gray-600">
                                          {reply.designation} at {reply.companyName}
                                        </p>
                                      </div>
                                      <p className="text-base text-gray-700 mt-1">{reply.comment}</p>
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => onEditReply(replyIndex, index)} // Separate function for editing replies
                                        className="px-3 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200 h-max py-1"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => onReply(reply)} // Reply to a reply
                                        className="px-3 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200 h-max py-1"
                                      >
                                        Reply
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}


                      <button
                        onClick={handleAddNewComment}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md mb-5"
                      >
                        Add New Comment
                      </button>
                    </div>
                  ) : null}
                  {AllComments.length === 0 && <div className="w-full py-2 bg-gray-100 px-2 rounded-md mb-4">
                    No Comments Here ? Add Comments
                  </div>}
                  {/* Show form if there are no comments or the "Add/Edit" button is clicked */}
                  {AllComments.length === 0 || isAddingNewComment ? (
                    <form>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={comment.name}
                        onChange={handleCommentChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={comment.email}
                        onChange={handleCommentChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                      <label className="block text-sm font-medium text-gray-700">Designation</label>
                      <input
                        type="text"
                        name="designation"
                        value={comment.designation}
                        onChange={handleCommentChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                      <label className="block text-sm font-medium text-gray-700">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={comment.companyName}
                        onChange={handleCommentChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                      <label className="block text-sm font-medium text-gray-700">Comment</label>
                      <textarea
                        name="comment"
                        value={comment.comment}
                        onChange={handleCommentChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                      <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                      <input
                        type="text"
                        name="profilePic"
                        value={comment.profilePic}
                        onChange={handleCommentChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                      <label className="block text-sm font-medium text-gray-700">Parent ID</label>
                      <input
                        type="number"
                        name="parentId"
                        value={comment.parentId}
                        onChange={handleCommentChange}
                        readOnly
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                      <label className="block text-sm font-medium text-gray-700">Page URL</label>
                      <input
                        type="text"
                        name="pageUrl"
                        value={comment.pageUrl}
                        onChange={handleCommentChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          {
                            console.log(isEditing);
                          }
                          if (isEditing) {
                            updateCommentAPI(comment?.commentId); // Update the comment using POST
                          } else {
                            addCommentAPI(); // Add a new comment
                          }
                        }}
                        type="button"
                        className="mt-4 p-2 bg-blue-600 text-white rounded"
                      >
                        {isEditing ? 'Update Comment' : 'Submit'}
                      </button>
                    </form>
                  ) : null}
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
                </div>
              )}
              {step === 11 && (
                <form>
                  {topEmployees.map((employee, index) => (
                    <div
                      key={index}
                      className="mb-6 p-4 border rounded-md shadow-sm"
                    >
                      <h4 className="font-medium text-lg mb-2">
                        Employee {index + 1}
                      </h4>

                      <label className="block text-sm font-medium text-gray-700">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={employee.name}
                        onChange={(e) =>
                          handleEmployeeChange(index, "name", e.target.value)
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />

                      <label className="block text-sm font-medium text-gray-700 mt-2">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={employee.companyName}
                        onChange={(e) =>
                          handleEmployeeChange(
                            index,
                            "companyName",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      />

                      <label className="block text-sm font-medium text-gray-700 mt-2">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={employee.linkedInProfile}
                        onChange={(e) =>
                          handleEmployeeChange(
                            index,
                            "linkedInProfile",
                            e.target.value
                          )
                        }
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
                    disabled={topEmployees.some(
                      (emp) => !emp.name || !emp.companyName
                    )}
                  >
                    Add Another Employee
                  </button>

                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setStep((pre) => (pre -= 1));
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded "
                    >
                      Back
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addActivityAPI(11);
                      }}
                      type="button"
                      className="mt-4 p-2 bg-blue-600 text-white rounded"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
              {errorMessage && (
                <div className="text-red-600 text-sm mb-4">{errorMessage}</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Add;
