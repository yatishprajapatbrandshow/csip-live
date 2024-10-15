import { API_URL } from "@/Config/Config";

const handleApply = async (activity, userData) => {
    if (activity?.activity_category === "DIRECT") {

        if (!userData?.sid) return false;

        const payload = {
            participantId: userData?.sid,
            activityId: activity?.sid
        }
        
        try {
            const response = await fetch(`${API_URL}activity/apply`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(payload),
            });
            const responseData = await response.json();
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
