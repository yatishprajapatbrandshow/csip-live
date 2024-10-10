"use client";

import { Check } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const TopicModal = ({ isOpen, onClose, fetchTopicData, fetchDashboardData, showToast  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [topics, setTopics] = useState([]);
    const [visibleTopics, setVisibleTopics] = useState(3);
    const [showNoResults, setShowNoResults] = useState(false);
    const [newTopic, setNewTopic] = useState('');
    const [showAddNewTopicForm, setShowAddNewTopicForm] = useState(false);
    const [isAddingNewTopic, setIsAddingNewTopic] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState([]);

    const userData = useSelector((state) => state.session.userData);

    if (!isOpen) return null;

    const onSearch = async (term) => {
        try {
            const response = await fetch('https://csip-backend.onrender.com/topic/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ TopicSearch: term }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Data:', data);

                if (data.data.length > 0) {
                    setTopics(data.data);
                    setVisibleTopics(3);
                    setShowNoResults(false);
                } else {
                    setTopics([]);
                    setShowNoResults(true);
                }
            } else {
                console.error('Error fetching topic');
                setTopics([]);
                setShowNoResults(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setTopics([]);
            setShowNoResults(true);
            showToast('Error fetching topics. Please try again.', 'error');
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length >= 3) {
            onSearch(value);
        } else {
            setTopics([]);
            setShowNoResults(false);
        }
    };

    const handleShowMore = () => {
        setVisibleTopics(prevCount => prevCount + 3);
    };

    const handleClose = () => {
        setSearchTerm('');
        setTopics([]);
        setVisibleTopics(3);
        setShowNoResults(false);
        setNewTopic('');
        setShowAddNewTopicForm(false);
        setIsAddingNewTopic(false);
        onClose();
        setSelectedTopics([]);
    };

    const handleTopicSelect = (topic) => {
        console.log('Selected Topic:', topic);

        setSelectedTopics((prevSelected) => {
            // Toggle selection
            if (prevSelected.includes(topic)) {
                return prevSelected.filter((t) => t !== topic);
            } else {
                return [...prevSelected, topic];
            }
        });
    };

    const submitTopics = async (newTopicValue = '') => {
        const payload = {
            participant_id: userData?.sid,
            TopicsList: selectedTopics,
            TopicNew: newTopicValue,
        };
        console.log('Payload:', payload);


        try {
            const response = await fetch('https://csip-backend.onrender.com/topic/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                showToast('Topic Added successfully!', 'success');
                setSelectedTopics([]);
                handleClose();
            } else {
                console.error('Error submitting topics');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmitSelectedTopics = async () => {
        try {
            await submitTopics();

            if (fetchTopicData && fetchDashboardData) {
                fetchTopicData();
                fetchDashboardData();
            }
        } catch (error) {
            console.error("Error submitting the topic:", error);
        }
    };

    const handleSubmitNewTopic = async () => {
        try {
            await submitTopics(newTopic);
            setNewTopic(''); // Clear the input field
            setShowAddNewTopicForm(false);
            setIsAddingNewTopic(false);
            handleClose(); // Close the modal

            // Call fetchTopicData to refresh the data in Dashboard
            if (fetchTopicData) {
                fetchTopicData();
            }

        } catch (error) {
            console.error("Error submitting the topic:", error);
        }
    };

    return (
        isOpen && (
            <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full transform transition-transform duration-300 scale-0 animate-scaleIn">
                    <h2 className="text-3xl  mb-4 text-center">Choose Topic</h2>

                    <div className="mt-4">
                        {!showAddNewTopicForm ? ( // Conditional rendering
                            topics.length > 0 ? (
                                <>
                                    <div className='border p-4'>
                                        <h2 className=' text-lg mb-3'>Choose Topic</h2>
                                        <ul className="max-h-32 overflow-y-auto space-y-2">
                                            {topics.slice(0, visibleTopics).map((topic, index) => (
                                                <li onClick={() => handleTopicSelect(topic.sid)} key={index} className="flex items-center space-x-2 cursor-pointer w-fit">
                                                    <span className={`h-4 w-4 rounded-full flex items-center justify-center border border-gray-500 ${selectedTopics.includes(topic.sid) ? 'bg-green-500' : ''}`}>{selectedTopics.includes(topic.sid) ? <Check className='h-5 w-5 text-white' /> : null}</span>
                                                    <span className={`text-sm text-gray-700 ${selectedTopics.includes(topic.sid) ? 'font-semibold text-green-500' : 'font-normal'}`}>{topic.topic}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {topics.length > visibleTopics && (
                                        <button onClick={handleShowMore} className="mt-2 text-[15px] text-blue-500">
                                            Show More
                                        </button>
                                    )}
                                </>
                            ) : (
                                showNoResults && (
                                    <div className="mt-4 flex flex-col border border-gray-200 bg-purple-100 p-3">
                                        <p>No topics found.</p>
                                        <button
                                            onClick={() => {
                                                setShowAddNewTopicForm(true);
                                                setIsAddingNewTopic(true);
                                            }}
                                            className='mt-3 w-fit mx-auto float-right bg-green-600 text-white  px-4 py-2 rounded'>
                                            Topic Not Found? Add New Topic
                                        </button>
                                    </div>
                                )
                            )
                        ) : ( // Render new topic form
                            <div className="mt-4 border border-gray-200 p-4">
                                <label htmlFor="newTopic" className="block mb-1 text-gray-700 ">New Topic</label>
                                <input
                                    type="text"
                                    id="newTopic"
                                    value={newTopic}
                                    onChange={(e) => setNewTopic(e.target.value)}
                                    placeholder="Add New Topic"
                                    className="w-full px-4 py-2 mb-2 border rounded bg-gray-100 font-gilMedium"
                                />
                                <button
                                    onClick={handleSubmitNewTopic}
                                    className="w-full bg-purple-500 text-white py-2  rounded-full hover:bg-purple-600"
                                >
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>

                    {!showAddNewTopicForm && selectedTopics.length > 0 && (
                        <div className="mt-3">
                            <button
                                onClick={handleSubmitSelectedTopics}
                                className="w-full bg-purple-500 text-white py-2  rounded"
                            >
                                Submit Selected Topics
                            </button>
                        </div>
                    )}

                    {!showAddNewTopicForm && (
                        <div className="mt-5 border border-gray-200 p-4">
                            <label htmlFor="search" className="block mb-1 text-gray-700 ">Search Topics</label>
                            <input
                                id='search'
                                type="text"
                                value={searchTerm}
                                onChange={handleInputChange}
                                placeholder="Type here to choose your topic"
                                className="w-full px-4 py-2 border rounded bg-purple-100"
                            />
                        </div>
                    )}

                    <div className='mt-4 flex flex-col items-center gap-2'>
                        {topics.length > 0 ? (
                            <button
                                onClick={() => {
                                    if (isAddingNewTopic) {
                                        setShowAddNewTopicForm(false);
                                        setIsAddingNewTopic(false);
                                    } else {
                                        setShowAddNewTopicForm(true);
                                        setIsAddingNewTopic(true);
                                    }
                                }}
                                className='mt-3 mx-auto bg-blue-600 text-white text-lg  px-7 py-2 rounded'>
                                {isAddingNewTopic ? 'Choose Topic' : 'Topic Not Found? Add New Topic'}
                            </button>
                        ) : null}
                        <div className="flex justify-between gap-2">
                            <button className="bg-green-600 text-white  px-4 py-2 rounded" onClick={handleClose}>
                                Continue with Existing Topic
                            </button>
                            <button className="bg-red-600 text-white  px-4 py-2 rounded" onClick={handleClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default TopicModal;
