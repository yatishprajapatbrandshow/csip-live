import { API_URL, API_URL_LOCAL } from '@/Config/Config';
import { getLocalStorageItem, setLocalStorageItem } from '@/Config/localstorage';
import { useEffect } from 'react';

const addUpdateTime = async (participant_id, timeSpend) => {
    try {
        const response = await fetch(`${API_URL}visit/add`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                participant_id: participant_id,
                usertime: timeSpend
            })
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        return responseData.status === true;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
};

export default function TrackUserTime() {
    useEffect(() => {
        const isSession = getLocalStorageItem('userData');
        if (isSession) {
            const participant_id = isSession?.sid; // Assuming you get the participant ID from the session or another source.

            const startTime = Date.now();
            let isPageVisible = true;

            const handleVisibilityChange = () => {
                isPageVisible = document.visibilityState === 'visible';
            };

            const handleBeforeUnload = async (event) => {
                if (isPageVisible) {
                    const endTime = Date.now();
                    const timeSpentInSeconds = (endTime - startTime) / 1000; // Time in seconds

                    // Convert total time back to hours, minutes, and seconds
                    const hours = Math.floor(timeSpentInSeconds / 3600);
                    const minutes = Math.floor((timeSpentInSeconds % 3600) / 60);
                    const seconds = Math.floor(timeSpentInSeconds % 60);

                    // Format the time as 'hours:minutes:seconds'
                    const formattedTime = `${hours}:${minutes}:${seconds}`;

                    // Send the time spent in the current session to the backend
                    await addUpdateTime(participant_id, formattedTime);
                }

                // Optional confirmation dialog
                event.returnValue = '';  // For some browsers to show the confirmation dialog
            };

            // Attach the event listeners
            window.addEventListener('visibilitychange', handleVisibilityChange);
            window.addEventListener('beforeunload', handleBeforeUnload);

            // Cleanup function to remove the event listeners when the component unmounts
            return () => {
                window.removeEventListener('visibilitychange', handleVisibilityChange);
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }
    }, []); // Empty dependency array ensures it only runs once when the component mounts
}
