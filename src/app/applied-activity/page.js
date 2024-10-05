import SideBar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import AppliedActivity from "./AppliedActivity";
export default function Home() {
  return (
    <section className="bg-[#e9e9e9] min-h-screen">
      <Header session={true} />
      <div className='flex '>
      <div className="">
                <SideBar />
            </div>
        <AppliedActivity />
      </div>
    </section>
  );
}
