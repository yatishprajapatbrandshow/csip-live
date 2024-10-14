import { API_URL } from "@/Config/Config";

const handleCreateOrder = async (activity, userData) => {

    const payload = {
        participantid: userData?.sid,
        activityid: activity?.sid,
        price: activity?.amount,
    };

    try {
        const response = await fetch(`${API_URL}order/create`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(payload),
        });

        const responseData = await response.json();

        if (responseData.status === true) {
            return responseData;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default handleCreateOrder;
