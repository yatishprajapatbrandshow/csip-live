import SideBar from "@/Components/Sidebar";
import AddActivity from "./AddActivity";
import Header from "@/Components/Header";
export default function Home() {
  return (
    <>
      <Header session={true} />
      <div>
          <SideBar />
          <div className="pl-52">
            <AddActivity />
          </div>
      </div>
    </>
  );
}
