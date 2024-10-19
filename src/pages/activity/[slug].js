import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ActivityProcess from '@/Components/ActivityProcess'
import ActivityHeader from '@/Components/ActivityHeader'
import { getLocalStorageItem } from "@/Config/localstorage";
import { API_URL } from '@/Config/Config';

const AboutSlug = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [ActivityList, setActivityList] = useState("inProcess");
    const [ActivityDetails, setActivityDetails] = useState("inProcess");

//     useEffect(() => {
//         if (router.query.item) {
//             const decryptedItem = decrypt(router.query.item);
//             if (decryptedItem) {
//                 FetchActivityDetails(slug, decryptedItem);
//                 FetchActivityMenu(decryptedItem);
//             }
//         }
//     }, [router.query]);



//   const FetchActivityMenu = async (decryptedItem) =>{
        
//     const datatoSend = {
//         activityid: decryptedItem,
//         type :"menu"
//     }
//     const APIURL =`${API_URL}activity-progress`

//     try{
//         const response = await fetch(APIURL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(datatoSend)
//         })
//         const data = await response.json();
//         if(data.status === true){
//             setActivityList(data.data)
//         }else{
//             setActivityList(false)
//         }
//     }catch (error) {
//         console.log("Error fetching activity details:", error);
//     }
// }

//   const FetchActivityDetails = async (slug, decryptedItem) =>{
//         if(slug){
//             const datatoSend = {
//                 activityid: decryptedItem,
//                 step : slug,
//                 type :"data"
//             }
//                 console.log(datatoSend)
//             const APIURL =`${API_URL}activity-progress`
        
//             try{
//                 const response = await fetch(APIURL, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(datatoSend)
//                 })
//                 const data = await response.json();
//                 console.log(data);
//                 if(data.status === true){
//                     setActivityDetails(data.data)
//                 }else{
//                     setActivityDetails(false)
//                 }
//             }catch (error) {
//                 console.log("Error fetching activity details:", error);
//             }
//         }
// }

// useEffect(() => {
//     FetchActivityMenu();
//     FetchActivityDetails(slug);
// }, [slug]);



    return (
        <div>
            <div className="relative max-w-[1500px] mx-auto w-full">
                <ActivityHeader data={ActivityList} />
                <div class="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8 lg:ml-72 xl:ml-80">
                    <ActivityProcess data={ActivityDetails} />
                </div>
            </div>
        </div>
    );
};

export default AboutSlug;
