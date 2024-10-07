import SideBar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import ActivityDetail from "./ActivityDetail";

export default function Home() {
  return (
    <>
      <Header session={true} />
      <div>
          <SideBar />
          <div className="pl-52">
            <ActivityDetail />
          </div>
      </div>
    </>
  );
}
