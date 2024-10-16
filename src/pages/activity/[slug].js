import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ActivityProcess from '@/Components/ActivityProcess'
import ActivityHeader from '@/Components/ActivityHeader'
import { getLocalStorageItem } from "@/Config/localstorage";

const AboutSlug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [ActivityList, setActivityList] = useState("inProcess");

    useEffect(() => {
        const getAA = getLocalStorageItem("AttemptActivity")
        if(getAA){
            setActivityList(getAA);
        }
    }, []);

  return (
    <div>
        <div className="relative max-w-[1500px] mx-auto w-full">
                <ActivityHeader data={ActivityList} />
                <div class="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8 lg:ml-72 xl:ml-80">
                    <ActivityProcess slug={slug} data={ActivityList} />
                    <footer class="mx-auto w-full mt-5">
                        <div class="flex justify-between">
                            <button className='bg-slate-300 flex py-2 px-5 rounded-full flex-row-reverse'>
                                Prev
                                <span className='rotate-180 mt-[2px]'>
                                    <svg  viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 -mr-1"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path></svg>
                                </span>
                            </button>
                            <button className='bg-slate-300 flex py-2 px-5 rounded-full'>
                                Next<svg  viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 -mr-1"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path></svg>
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
    </div>
  );
};

export default AboutSlug;
