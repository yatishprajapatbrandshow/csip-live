import { API_URL } from "@/Config/Config"

export const useSignUpDetails = async (userdata) => {
    const payload = {
        name: userdata.name,
        mobile: userdata.mobile,
        email: userdata.email,
        password: userdata.password,
        r_password: userdata.retypePassword
    }

    const APIURL = `${API_URL}register`
    try {
        const response = await fetch(APIURL, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Error Details:", errorDetails);
            throw new Error(`Network response was not ok: ${errorDetails.message || "Unknown error"}`);
        }
        const responseData = await response.json();
        return responseData;

    } catch (err) {
        console.error(err);
    }
}