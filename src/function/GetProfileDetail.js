import { API_URL } from "@/Config/Config";

export const GetProfileDetail = async (link) => {
    try {
        console.log(link);  
        const URL = `${API_URL}metaData/get?url=${link}`;
        console.log(URL);  
      const response = await fetch(URL);
      

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    console.log(response)
      const fetchedData = await response.json();
      if(fetchedData.status === true){
          return fetchedData.data;
      }else{
        return false;
      }

    } catch (error) {
      console.log("Error fetching profile data:", error);
      return false; // Return null in case of error
    }
  };
  