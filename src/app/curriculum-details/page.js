import SideBar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import Curriculum from "./Curriculum";
export default function Home() {
  return (
    <>
      <Header session={true} />
      <div className='flex'>
          <SideBar />
          <div className="pl-52 w-full">
            <Curriculum />
          </div>
      </div>

    </>
  );
}
