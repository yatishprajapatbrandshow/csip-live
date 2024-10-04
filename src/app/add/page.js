import SideBar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import Add from "./Add";
export default function Home() {
  return (
    <>
      <Header session={true} />
      <div className='relative'>
      <div className="absolute top-0 left-0 z-20">
                <SideBar />
            </div>
        <Add />
      </div>
    </>
  );
}
