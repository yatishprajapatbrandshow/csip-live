import { API_URL, API_URL_LOCAL } from '@/Config/Config';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { applyTrigger } from '../../redux/actions/triggerSlice';
import { useDispatch, useSelector } from "react-redux";

// Fetch all topics from the API
const fetchAllTopics = async (participantId) => {
    if (!participantId) return [];

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
            return responseData.data;
        } else {
            console.error('Failed to fetch topics:', responseData.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching topics:', error);
        return [];
    }
};
// Function to remove a topic from Your Topics
const removeTopicFromYourTopics = async (participantId, topicId) => {

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
            
            return true; // Indicates success
        } else {
            
            return false; // Indicates failure
        }
    } catch (error) {
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
    console.log(dataToSend);

    try {
        const response = await fetch(API_URL_ADD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        const responseData = await response.json();
        console.log(responseData);
        if (responseData.status === true) {

            // console.log(`Added ${topic.text} to Your Topics successfully.`);
        } else {
            console.error('Failed to add topic:', responseData.message);
        }
    } catch (error) {
        console.error('Error adding topic:', error);
    }
};
const DragAndDropTopic = () => {
    const [allTopics, setAllTopics] = useState([]);
    const [yourTopics, setYourTopics] = useState([]);
    const [dragFrom, setDragFrom] = useState("");
    const [loading, setLoading] = useState(true);
    
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.session.userData);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTopicText, setNewTopicText] = useState('');
    
    
    // Fetch all topics on component mount
    useEffect(() => {
        const fetchTopics = async () => {
            setLoading(true);
            const topics = await fetchAllTopics(userData?.sid);
            setYourTopics(topics);
            await onSearch(''); // Fetch default 10 topics
            setLoading(false);
        };
        fetchTopics();
    }, [userData]);

    // Search for topics based on the input term
    const onSearch = async (term) => {

        if (term.length < 1) {
            // Fetch default topics when there is no search term
            // console.log(JSON.stringify({ TopicSearch: '', participant_id: userData?.sid }))
            try {
                const response = await fetch(`${API_URL}topic`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ TopicSearch: '', participant_id: userData?.sid }), // Empty search term for defaults
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.data.length > 0) {
                        setAllTopics(data.data);
                    } else {
                        setAllTopics([]);
                    }
                } else {
                    setAllTopics([]);
                }
            } catch (error) {
                setAllTopics([]);
            }
            return;
        }
        // Fetch topics based on the search term
        try {
            const response = await fetch(`${API_URL}topic`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ TopicSearch: term }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.data.length > 0) {
                    setAllTopics(data.data);
                } else {
                    setAllTopics([]);
                }
            } else {
                setAllTopics([]);
            }
        } catch (error) {
            setAllTopics([]);
        }
    };

    // Handle drag start
    const handleDragStart = (event, item, drag) => {
        event.dataTransfer.setData('item', JSON.stringify(item));
        setDragFrom(drag);
    };

    // Handle drop
    const handleDrop = async (event, targetColumn, setTargetColumn, sourceColumn, setSourceColumn, targetValue) => {
        event.preventDefault();
        const item = JSON.parse(event.dataTransfer.getData('item'));
        if (dragFrom === targetValue) {
            return;
        }
        // Update UI instantly
        if (targetValue === "All Topics") {
            // Remove from Your Topics and add to All Topics
            setYourTopics((prevYourTopics) => prevYourTopics.filter((topic) => topic.sid !== item.sid));
            // Now, call the API to remove it from "Your Topics"
            try {
                const success = await removeTopicFromYourTopics(userData.sid, item.sid);
                if (!success) {
                }
                dispatch(applyTrigger())
            } catch (error) {
                console.error('Error during remove operation:', error);
            }
        } else if (targetValue === "Your Topics") {
            // Remove from All Topics and add to Your Topics
            setYourTopics((prevYourTopics) => [...prevYourTopics, item]);

            // Call the API to add it to "Your Topics"
            try {
                const success = await addTopicToYourTopics(userData.sid, item.sid);
                if (!success) {
                    console.error('Failed to add to your topics in the backend.');
                }
                dispatch(applyTrigger())
            } catch (error) {
                console.error('Error during add operation:', error);
            }
        }
    };

    // Allow dropping by preventing the default action
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const handleRemove = async (item) => {
        // Remove from Your Topics and add to All Topics
        setYourTopics((prevYourTopics) => prevYourTopics.filter((topic) => topic.sid !== item.sid));
        // Now, call the API to remove it from "Your Topics"
        try {
            const success = await removeTopicFromYourTopics(userData.sid, item.sid);
            if (!success) {
                console.error('Failed to remove from your topics in the backend.');
            }
            dispatch(applyTrigger())
        } catch (error) {
            console.error('Error during remove operation:', error);
        }

    }
    const handleAdd = async (item) => {
        // Remove from All Topics and add to Your Topics
        setYourTopics((prevYourTopics) => [...prevYourTopics, item]);

        // Call the API to add it to "Your Topics"
        try {
            const success = await addTopicToYourTopics(userData.sid, item.sid);
            if (!success) {
                console.error('Failed to add to your topics in the backend.');
            }
            dispatch(applyTrigger())
        } catch (error) {
            console.error('Error during add operation:', error);
        }
    }

    return (
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-2 w-full">
            {loading ? (
                <div className='min-h-72 grid grid-cols-2 gap-5 mb-2'>
                    <div className='col-span-2 h-20 bg-white rounded-lg' />
                    <div className='col-span-1 h-72 bg-white rounded-lg' />
                    <div className='col-span-1 h-72 bg-white rounded-lg' />
                </div>
            ) : (
                <div className="grid grid-cols-2 bg-white w-full rounded-lg border border-gray-200">
                    <div className='col-span-2 p-4'>
                        <div className='min-h-10 border-b border-b-gray-200'>
                            <p className='text-gray-800 font-medium'>Managing Topics You Are Studying: Select or Remove by Dragging or Clicking</p>
                        </div>
                        <div className='flex gap-2 justify-start items-start pt-4'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                            </span>
                            <p className='text-sm text-gray-700'>Drag a topic from the left box to the right box to select it, or click on a topic to select. To remove a topic, drag it from the right box back to the left box.</p>
                        </div>
                    </div>
                    <div className='col-span-2 bg-gray-50 p-4 grid grid-cols-2 gap-4'>

                        <div className='col-span-2'>
                            <div className="flex justify-start items-center px-2 bg-white border border-gray-300 text-xs rounded-lg w-max">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                <input
                                    type="text"
                                    placeholder="Search for topics..."
                                    onChange={(e) => onSearch(e.target.value)}
                                    className="p-4 py-2"
                                />
                            </div>
                        </div>
                        <div className='col-span-1'>

                            <div
                                className="w-full h-96 p-4 bg-white shadow-sm rounded-xl overflow-y-auto select-none"
                                onDrop={(event) => handleDrop(event, yourTopics, setYourTopics, allTopics, setAllTopics, "All Topics")}
                                onDragOver={handleDragOver}
                            >
                                <h3 className="text-xl font-bold mb-4 text-gray-800">All Topics</h3>
                                <div className='flex flex-wrap gap-2'>

                                    {allTopics.map((item) => (
                                        yourTopics.some((ele) => item?.sid === ele.sid) ? (<div
                                            key={item.id}
                                            className="draggable-item hidden text-sm border mb-1 border-pink-400 rounded-lg text-pink-500 p-2"
                                        >
                                            {item.topic}
                                        </div>) :
                                        <div
                                            onClick={() => { handleAdd(item) }}
                                            key={item.id}
                                            className="draggable-item text-sm mb-1 text-gray-700 bg-white/30 border border-rose-300 bg-pink-50 hardShadow flex p-2"
                                            draggable
                                            onDragStart={(event) => handleDragStart(event, item, 'All Topics')}
                                        >
                                            {item.topic}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-span-1 h-96 p-4 bg-white rounded-xl overflow-y-auto"
                            onDrop={(event) => handleDrop(event, allTopics, setAllTopics, yourTopics, setYourTopics, "Your Topics")}
                            onDragOver={handleDragOver}
                        >
                            <h3 className="text-xl font-bold mb-4 text-gray-800">Your Topics</h3>
                            <div className='flex flex-wrap gap-2'>
                                {yourTopics.map((item) => (
                                    <div
                                        onClick={() => { handleRemove(item) }}
                                        key={item.id}
                                        className="draggable-item text-sm mb-1 text-gray-700 bg-green-100 border border-green-300  hardShadowGreen flex p-2"
                                        draggable
                                        onDragStart={(event) => handleDragStart(event, item, 'Your Topics')}
                                    >
                                        {item.topic}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            )
            }

        </div >
    );
};

export default DragAndDropTopic;
