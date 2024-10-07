'use client'
import {
  Minus, ChartPie, User, ShoppingCart, LockKeyhole, FileSpreadsheet, FileCog, FileChartColumnIncreasing, FileMinus2, FilePlus2, Library, Search, ParkingMeter, ListPlus, TrendingUp, MoveRight, CheckCheck, ListTodo, LayoutList, IndianRupee, SquarePlus,
  ListCheck,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
export default function SideBar({ }) {
  const router = useRouter()
  const [role, setRole] = useState('Admin');
  const userType = useSelector((state) => state.session.userType);


  function SidebarItem({ path, icon, title }) {
    const router = useRouter();

    return (
      <button
        onClick={path ? () => router.push(path) : null}
        className="flex items-start justify-start w-full gap-2"
      >
        {icon} <span className="whitespace-nowrap text-sm"> {title} </span>
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
            {
              userType !== "Corporate" &&
              <SidebarItem icon={<ShoppingCart className="w-4 h-4" />} title="Payment Reciepts" />
            }
            {/* <SidebarItem icon={<LockKeyhole className="w-4 h-4" />} title="Logout" /> */}
          </nav>


          <p className="text-xl w-full text-left"> Curriculum </p>


          <nav className="flex flex-col w-full mt-3 mb-5">
            <SidebarItem icon={<FileSpreadsheet className="w-4 h-4" />} title="View" />
            {
              userType !== "Corporate" &&
              <>
                <SidebarItem icon={<FileCog className="w-4 h-4" />} title="Choose / Change" />
                <SidebarItem icon={<FileChartColumnIncreasing className="w-4 h-4" />} title="College Wise" />
              </>
            }
          </nav>

          {
            userType !== "Corporate" &&
            <>
              <p className="text-xl w-full text-left"> Topic</p>
              <nav className="flex flex-col w-full mt-3 mb-5">
                <SidebarItem icon={<FileMinus2 className="w-4 h-4" />} title="Add" />
                <SidebarItem
                  icon={<FilePlus2 className="w-4 h-4" />}
                  title="Remove"
                />
              </nav>
            </>
          }

          <p className="text-xl w-full text-left"> Activity</p>

          <nav className="flex flex-col w-full mt-3 mb-5">
            {userType === "Corporate" &&
              <>
                <SidebarItem icon={<SquarePlus className="w-4 h-4" />} title="Add" />
                <SidebarItem icon={<ListCheck className="w-4 h-4" />} title="View Added" />
              </>
            }
            {
              userType !== "Corporate" &&
              <>
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
              </>
            }
          </nav>
        </div>
      </div>
    </>
  );
}

