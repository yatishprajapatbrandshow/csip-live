'use client'
import { Minus, ChartPie, User, ShoppingCart, LockKeyhole, FileSpreadsheet, FileCog, FileChartColumnIncreasing, FileMinus2, FilePlus2, Library, Search, ParkingMeter, ListPlus, TrendingUp, MoveRight, CheckCheck, ListTodo, LayoutList, IndianRupee, SquarePlus,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const router = useRouter()
  const [role, setRole] = useState('Admin');
  
  function SidebarItem({ path, icon, title }) {
    return (
      <button
        onClick={() => { router.push(path) }}
        className="flex items-start justify-start w-full gap-2"
      >
        {icon} <span className=" whitespace-nowrap text-sm"> {title} </span>
      </button>
    );
  }

  return (
    <>
    <div className="pl-5 bg-white fixed top-20 left-0 z-50 w-52">
      <div className="pb-20 overflow-y-auto text-gray-700 flex flex-col items-center py-4 transition-all duration-300 ease-in-out group">

        <p className="text-xl w-full text-left"> Main </p>

        <nav className="flex flex-col w-full mt-3 mb-5">
          <SidebarItem path="/dashboard" icon={<ChartPie className="w-4 h-4" />} title="Dashboard" />
          <SidebarItem path="/edit-profile" icon={<User className="w-4 h-4" />} title="Edit Profile" />
          <SidebarItem icon={<ShoppingCart className="w-4 h-4" />} title="Payment Reciepts" />
          {/* <SidebarItem icon={<LockKeyhole className="w-4 h-4" />} title="Logout" /> */}
        </nav>


        <p className="text-xl w-full text-left"> Curriculum </p>


        <nav className="flex flex-col w-full mt-3 mb-5">
          <SidebarItem icon={<FileSpreadsheet className="w-4 h-4" />} title="View" />
          <SidebarItem icon={<FileCog className="w-4 h-4" />} title="Choose / Change" />
          <SidebarItem icon={<FileChartColumnIncreasing className="w-4 h-4" />} title="College Wise" />
        </nav>

        <p className="text-xl w-full text-left"> Topic</p>
        <nav className="flex flex-col w-full mt-3 mb-5">
          <SidebarItem icon={<FileMinus2 className="w-4 h-4" />} title="Add" />
          <SidebarItem
            icon={<FilePlus2 className="w-4 h-4" />}
            title="Remove"
          />
        </nav>
        <p className="text-xl w-full text-left"> Activity</p>

        <nav className="flex flex-col w-full mt-3 mb-5">
          <SidebarItem icon={<SquarePlus className="w-4 h-4" />} title="Add" />
          <SidebarItem icon={<SquarePlus className="w-4 h-4" />} title="View All Activities" />
          <SidebarItem icon={<Library className="w-4 h-4" />} title="Applied" />
          <SidebarItem icon={<Search className="w-4 h-4" />} title="Search by Topic" />
          <SidebarItem icon={<ParkingMeter className="w-4 h-4" />} title="Recommended" />
          <SidebarItem icon={<ListPlus className="w-4 h-4" />} title="New" />
          <SidebarItem icon={<TrendingUp className="w-4 h-4" />} title="Trending" />
          <SidebarItem icon={<MoveRight className="w-4 h-4" />} title="Ongoing" />
          <SidebarItem icon={<CheckCheck className="w-4 h-4" />} title="Completed" />
          <SidebarItem icon={<ListTodo className="w-4 h-4" />} title="Submission Pending" />
          <SidebarItem icon={<LayoutList className="w-4 h-4" />} title="Pending Approval" />
          <SidebarItem icon={<IndianRupee className="w-4 h-4" />} title="Payment Pending" />
        </nav>
        </div>
    </div>
    </>
  );
}

