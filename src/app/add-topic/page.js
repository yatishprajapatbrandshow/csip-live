import SideBar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import FormComponent from "./FormComponent";
export default function Home() {
  return (
    <>
      <Header session={true} />
      <div className='flex'>
        <SideBar />
        <FormComponent />

      </div>

    </>
  );
}
