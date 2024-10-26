import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ActivityProcess from '@/Components/ActivityProcess'
import ActivityHeader from '@/Components/ActivityHeader'
import { getLocalStorageItem } from "@/Config/localstorage";
import { API_URL } from '@/Config/Config';
import { decrypt } from '@/utils/cryptoUtils';

const AboutSlug = () => {
    const router = useRouter();
    const { slug, item } = router.query;
    const [ActivityList, setActivityList] = useState("inProcess");
    const [ActivityDetails, setActivityDetails] = useState("inProcess");

    useEffect(() => {
        if (router.query.item) {
            FetchActivityDetails(slug, router.query.item);
            FetchActivityMenu(router.query.item);
        }
    }, [router.query]);



  const FetchActivityMenu = async (ActId) =>{
    const datatoSend = {
        activityid: ActId,
        type :"menu"
    }
    const APIURL =`${API_URL}activity-progress`

    try{
        const response = await fetch(APIURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datatoSend)
        })
        const data = await response.json();
        
        if(data.status === true){
            setActivityList(data.data)
        }else{
            setActivityList(false)
        }
    }catch (error) {
        console.log("Error fetching activity details:", error);
    }
}

  const FetchActivityDetails = async (slug, ActId) =>{
        if(slug){
            const datatoSend = {
                activityid: ActId,
                step : slug,
                type :"data"
            }
            const APIURL =`${API_URL}activity-progress`
        
            try{
                const response = await fetch(APIURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datatoSend)
                })
                const data = await response.json();
                if(data.status === true){
                    setActivityDetails(data.data)
                }else{
                    setActivityDetails(false)
                }
            }catch (error) {
                console.log("Error fetching activity details:", error);
            }
        }
}

// useEffect(() => {
//     FetchActivityMenu();
//     FetchActivityDetails(slug);
// }, [slug]);



    return (
        <div className='bg-slate-100 min-h-screen bg-BG1 bg-cover'>
            <div className="relative max-w-[1500px] mx-auto w-full">
                <ActivityHeader data={ActivityList} />
                <div class="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8 lg:ml-72 xl:ml-80">
                    <ActivityProcess data={ActivityDetails} itemID={item} />
                </div>
            </div>
        </div>
    );
};

export default AboutSlug;
