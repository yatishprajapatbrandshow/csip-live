import SideBar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import AppliedActivity from "./AppliedActivity";
export default function Home() {
  return (
    <>
      <Header session={true} />
      <div>
        <SideBar />
        <div className="pl-52">
          <AppliedActivity />
        </div>
      </div>
    </>
  );
}
