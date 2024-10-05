import SideBar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import FormComponent from "./FormComponent";
export default function Home() {
  return (
    <>
      <Header session={true} />
      <div>
          <SideBar />
          <div className="pl-52">
          <FormComponent />
          </div>
      </div>
    </>
  );
}
