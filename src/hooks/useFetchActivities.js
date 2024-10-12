import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '@/Config/Config';

export const useFetchActivities = () => {
    const userData = useSelector((state) => state.session.userData);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchActivities = async () => {
        if (!userData?.sid) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}activity/applied?participantId=${userData.sid}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            if (responseData.status === true) {
                setActivities(responseData.data);
            }
        } catch (error) {
            console.error('Error fetching activities:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userData?.sid) {
            fetchActivities();
        }
    }, [userData]);

    return { activities, loading, error };
};
