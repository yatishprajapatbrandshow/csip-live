import SideBar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import ActivityList from "./ActivityList";
export default function Home() {
  return (
    <>
      <Header session={true} />
      <div className='flex'>
          <SideBar />
          <div className="pl-52">
            <ActivityList />
          </div>
      </div>

    </>
  );
}
