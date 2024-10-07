import SideBar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import Add from "./Add";
export default function Home() {
  return (
    <section className="bg-bgForm bg-cover bg-center min-h-screen relative">
      <div className="absolute bg-white/50 backdrop-blur-sm w-full h-full left-0 top-0" style={{
    clipPath: 'polygon(100% 35%, 0% 100%, 100% 100%)'
  }}/>
    <Header session={true} />
      <div className="relative z-10">
          <SideBar />
          <div className="pl-52">
            <Add />
          </div>
      </div>
    </section>
  );
}
