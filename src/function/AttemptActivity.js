import { API_URL } from "@/Config/Config";

const handleAttemptActivity = async (activity, userData) => {

    const payload = {
        participant_id: userData?.sid,
        activity_id: activity?.sid,
    };

    try {
        const response = await fetch(`${API_URL}study/create`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(payload),
        });

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.success === true || responseData.message === "Already Studying this Activity") {
            return responseData;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default handleAttemptActivity;
