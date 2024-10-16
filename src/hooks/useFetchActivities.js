import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '@/Config/Config';

export const useFetchActivities = () => {
    const userData = useSelector((state) => state.session.userData);
    const [activities, setActivities] = useState([]);
    const [Actloading, setLoading] = useState(false);
    const [ActError, setError] = useState(null);

    const fetchActivities = async () => {
        if (!userData?.sid) return;

        setLoading(true);
        setError(null);
        console.log(userData.sid)

        try {
            const response = await fetch(`${API_URL}activity/applied?participantId=${userData.sid}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });
            console.log(response)

            const responseData = await response.json();
            console.log("responseData", responseData)
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

    return { activities, Actloading, ActError };
};

