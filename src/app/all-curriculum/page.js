import SideBar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import AllCurriculum from "./AllCurriculum";
export default function Home() {
  return (
    <>
      <Header session={true} />
      <div className='flex'>
          <SideBar />
          <div className="pl-52 w-full">
            <AllCurriculum />
          </div>
      </div>

    </>
  );
}
