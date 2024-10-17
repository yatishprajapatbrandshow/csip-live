import { API_URL, API_URL_LOCAL } from '@/Config/Config';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { applyTrigger } from '../../redux/actions/triggerSlice';

// Fetch all topics from the API
const fetchAllTopics = async (participantId) => {
    if (!participantId) return [];

    try {
        const response = await fetch(`${API_URL_LOCAL}topic/get`, {
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
    console.log(participantId, topicId);

    const dataToSend = {
        participant_id: participantId,
        TopicsList: [`${topicId}`],
    };
    const API_URL_REMOVE = `${API_URL_LOCAL}topic/remove`;

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
            console.log(`Removed topic with ID ${topicId} successfully.`);
            return true; // Indicates success
        } else {
            console.error('Failed to remove topic:', responseData.message);
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
            console.log(responseData);

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
    const userData = { sid: 2147483647 }; // Replace with your actual participant ID logic
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTopicText, setNewTopicText] = useState('');
    const dispatch = useDispatch();
    // Fetch all topics on component mount
    useEffect(() => {
        const fetchTopics = async () => {
            setLoading(true);
            const topics = await fetchAllTopics(userData.sid);
            setYourTopics(topics);
            await onSearch(''); // Fetch default 10 topics
            setLoading(false);
        };
        fetchTopics();
    }, [userData.sid]);

    // Search for topics based on the input term
    const onSearch = async (term) => {
        if (term.length < 1) {
            // Fetch default topics when there is no search term
            try {
                const response = await fetch(`${API_URL_LOCAL}topic`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ TopicSearch: '' }), // Empty search term for defaults
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.data.length > 0) {
                        setAllTopics(data.data);
                    } else {
                        setAllTopics([]);
                    }
                } else {
                    console.error('Error fetching default topics');
                    setAllTopics([]);
                }
            } catch (error) {
                console.error('Error:', error);
                setAllTopics([]);
            }
            return;
        }

        // Fetch topics based on the search term
        try {
            const response = await fetch(`${API_URL_LOCAL}topic`, {
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
                console.error('Error fetching topic');
                setAllTopics([]);
            }
        } catch (error) {
            console.error('Error:', error);
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
                    console.error('Failed to remove from your topics in the backend.');
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
        <div className="bg-gray-50 w-full">
            {loading ? (
                <div className="text-lg font-semibold">Loading...</div>
            ) : (
                <div className="grid grid-cols-2 gap-10  w-full">
                    {/* All Topics Column */}
                    <div className='col-span-1'>
                        <div className="flex mb-4 ">
                            <input
                                type="text"
                                placeholder="Search for topics..."
                                onChange={(e) => onSearch(e.target.value)}
                                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 shadow-md"
                            />
                        </div>

                        <div
                            className="w-full h-96 p-4 bg-white rounded-xl shadow-lg overflow-y-auto select-none"
                            onDrop={(event) => handleDrop(event, yourTopics, setYourTopics, allTopics, setAllTopics, "All Topics")}
                            onDragOver={handleDragOver}
                        >
                            <h3 className="text-xl font-bold mb-4 text-gray-800">All Topics</h3>
                            {allTopics.map((item) => (
                                yourTopics.some((ele) => item?.sid === ele.sid) ? (<div
                                    key={item.id}
                                    className="draggable-item p-2 mb-2 bg-green-200 rounded-lg hover:bg-green-300 transition duration-200 cursor-pointer flex justify-between "
                                >
                                    {item.topic}
                                    <Check className='text-gray-600' />
                                </div>) :
                                    <div
                                        onClick={() => { handleAdd(item) }}
                                        key={item.id}
                                        className="draggable-item p-2 mb-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition duration-200 cursor-pointer"
                                        draggable
                                        onDragStart={(event) => handleDragStart(event, item, 'All Topics')}
                                    >
                                        {item.topic}
                                    </div>
                            ))}
                        </div>
                    </div>
                    {/* Your Topics Column */}
                    <div
                        className="col-span-1 mt-16 h-96 p-4 bg-white rounded-xl shadow-lg overflow-y-auto"
                        onDrop={(event) => handleDrop(event, allTopics, setAllTopics, yourTopics, setYourTopics, "Your Topics")}
                        onDragOver={handleDragOver}
                    >
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Your Topics</h3>
                        {yourTopics.map((item) => (
                            <div
                                onClick={() => { handleRemove(item) }}
                                key={item.id}
                                className="draggable-item p-2 mb-2 bg-green-100 rounded-lg hover:bg-green-200 transition duration-200 cursor-pointer flex justify-between"
                                draggable
                                onDragStart={(event) => handleDragStart(event, item, 'Your Topics')}
                            >
                                {item.topic}
                                <Check className='text-gray-600' />
                            </div>
                        ))}
                    </div>
                </div>
            )
            }

        </div >
    );
};

export default DragAndDropTopic;
