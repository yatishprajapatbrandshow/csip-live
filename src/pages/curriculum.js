"use client";
import { ArrowLeft, Check, MousePointerClick, Search, Undo2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { API_URL, API_URL_LOCAL } from '@/Config/Config';
import { useDispatch, useSelector } from 'react-redux';
import Header from '@/Components/Header';
import { useRouter } from 'next/router';
import { applyTrigger } from '../../redux/actions/triggerSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLocalStorageItem } from '@/Config/localstorage';
const removeTopicFromYourTopics = async (participantId, topicId) => {
  console.log(participantId, topicId);

  const dataToSend = {
    participant_id: participantId,
    TopicsList: [`${topicId}`],
  };
  const API_URL_REMOVE = `${API_URL}topic/remove`;

  try {
    const response = await fetch(API_URL_REMOVE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    const responseData = await response.json();

    if (responseData.status === true) {
      toast.success(`Removed Topic Successfully.`)
      return true; // Indicates success
    } else {
      toast.error(`Failed to remove topic: ${responseData.message} `)
      return false; // Indicates failure
    }
  } catch (error) {
    console.error('Error removing topic:', error);
    return false; // Indicates failure
  }
};
// Function to add a topic to Your Topics
const addTopicToYourTopics = async (participantId, topicId) => {
  const API_URL_ADD = `${API_URL}topic/add`;
  const dataToSend = {
    participant_id: participantId,
    TopicsList: [topicId],
  };

  try {
    const response = await fetch(API_URL_ADD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    const responseData = await response.json();

    if (responseData.status === true) {
      toast.success(`Topic Added Successfully`)
      // console.log(`Added ${topic.text} to Your Topics successfully.`);
    } else {
      toast.error(`Failed to add topic:${responseData.message}`)
    }
  } catch (error) {
    console.error('Error adding topic:', error);
  }
};
function Curriculum() {
  const [CurriculumData, setCurriculumData] = useState();
  const [groupsData, setGroupData] = useState([]);
  const [curriId, setcurriId] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userData = useSelector((state) => state.session.userData);
  const [userTopics, setUserTopics] = useState([]);
  const isTriggeredApply = useSelector((state) => state.trigger.applyTrigger);
  const dispatch = useDispatch();

  const [isSession, setIsSession] = useState(false);
    useEffect(() => {
        const userData = getLocalStorageItem("userData");
        if (userData) {
            setIsSession(true);
            if(userData.type !== "Participant"){
                router.push('/')    
            }
        } else {
            router.push('/')
            setIsSession(false);
        }
    }, []);


  const fetchAllTopics = async (participantId) => {
    if (!participantId) return;

    try {
      const response = await fetch(`${API_URL}topic/get`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          participant_id: participantId,
        }),
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        console.log(responseData.data);

        setUserTopics(responseData.data)
      } else {
        console.error('Failed to fetch topics:', responseData.message);
        setUserTopics([]);
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
      setUserTopics([]);
    }
  };

  const fetchCurriculumID = async () => {
    // Only append corporate_id if it's defined
    const APIURL = userData?.sid
      ? `${API_URL}curriculum/maped-curriculum?participant_id=${userData?.sid}`
      : `${API_URL}curriculum/maped-curriculum?participant_id=${0}`;

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
      console.log(responseData);

      if (responseData.status === true) {
        setcurriId(responseData.data[0].curriculum_id);
      }
    } catch (error) {
      setError("Failed to fetch activities.");
    } finally {
      setLoading(false); // Set loading to false after fetch is done
    }
  };

  const fetchCurriculumDetails = async () => {
    // Only append corporate_id if it's defined
    const APIURL = `${API_URL}curriculum/details?curriculum_sid=${curriId}`;

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
        console.log(responseData);

        setCurriculumData(responseData?.data?.curriculum);
        setGroupData(responseData?.data?.groups);
        setLoading(false)
      }
    } catch (error) {
      setError("Failed to fetch activities.");
    } finally {
      setLoading(false); // Set loading to false after fetch is done
    }
  }

  useEffect(() => {
    if (curriId) {
      fetchCurriculumDetails();
    }
  }, [curriId])
  useEffect(() => {
    if (userData) {
      fetchCurriculumID();
      fetchAllTopics(userData?.sid)
    }
  }, [userData, isTriggeredApply]);

  if (loading) return <div className="text-center w-full ">Loading...</div>; // Loading state

  const handleAddClick = async (item) => {
    console.log(item);
    await addTopicToYourTopics(userData?.sid, item?.sid);
    dispatch(applyTrigger())
  }
  const handleRemoveClick = async (item) => {
    console.log(item);
    await removeTopicFromYourTopics(userData?.sid, item?.sid);
    dispatch(applyTrigger())
  }

  return (
    <>
      <Header />
      <div className="pl-10 p-6 bg-[#F0F0F0] w-full">
        <div className='flex items-center gap-2 mb-4 cursor-pointer ' onClick={() => router.back()}><Undo2 className='w-5 h-5' />Go Back</div>
        <div className='bg-white  w-full p-6'>
          <h1 className="text-3xl font-gilBold mb-6">Curriculum</h1>
          <h5 className="text-sm text-gray-700 mb-3">{CurriculumData?.name}</h5>
          {
            groupsData.map((item, index) =>
              <ul className=' border-b-[1px] border-[#F9DAEA] mb-5' key={index}>
                <h4 className='mb-3 text-gray-900 font-medium'>{item?.groupName}</h4>
                {
                  item?.topics.map((ele, idx) =>
                    <li className="list-none grid grid-cols-4 gap-10 border-t border-[#F9DAEA] py-[.25rem]">
                      {/* Column for Check and Topic Name */}
                      <div className="flex items-center gap-5 col-span-2">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-gray-500" />
                        </div>
                        <p className="text-gray-700 font-medium text-sm">{ele?.topic}</p>
                      </div>

                      {/* Column for Search Activity */}
                      <div className="flex items-center col-span-1 text-gray-600  font-medium text-sm  ">
                        <div className='cursor-pointer flex' onClick={() => { }}>
                          <Search className="text-[#9779FF] w-4 h-4 mr-2" />
                          <span >Search Activity</span>
                        </div>
                      </div>

                      {/* Column for Click to Select */}
                      <div className="flex items-center justify-center col-span-1">
                        {
                          userTopics.some((ele1) => ele1.sid === ele.sid) ? (
                            <button
                              onClick={() => handleRemoveClick(ele)}
                              className="flex items-center justify-center bg-green-600 text-white py-2 px-4 text-sm hover:bg-green-700 transition-colors duration-200 "
                            >
                              <span>Studying</span>
                              <X className="w-4 h-4 ml-2" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddClick(ele)}
                              className="flex items-center bg-[#9779FF] text-white py-2 px-4 text-sm hover:bg-[#8A6CE0] transition-colors duration-200 "
                            >
                              <MousePointerClick className="w-4 h-4 mr-2" />
                              <span>Click to Select</span>
                            </button>
                          )
                        }
                      </div>
                    </li>
                  )
                }
              </ul>
            )
          }
        </div>
        <ToastContainer position="top-right" autoClose={1000} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </>
  );
}

export default Curriculum;
