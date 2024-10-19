import { API_URL } from "@/Config/Config";

const handleApply = async (activity, userData) => {
    console.log(activity)
    if (activity?.activity_category === "DIRECT" || activity?.activity_category === "General") {
        
        if (!userData?.sid) return false;

        const payload = {
            participantId: userData?.sid,
            activityId: activity?.sid
        }
        console.log(`${API_URL}activity/apply`);
        try {
            const response = await fetch(`${API_URL}activity/apply`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(payload),
            });
            const responseData = await response.json();
            console.log(responseData);
                if (responseData.status === true) {
                    return responseData
                } else {
                    return false
                }
        } catch (error) {
            return false
        }
    }

}

export default handleApply;
