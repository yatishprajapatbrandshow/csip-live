'use client'
import {
  Minus,
  ChartPie,
  User,
  ShoppingCart,
  LockKeyhole,
  FileSpreadsheet,
  FileCog,
  FileChartColumnIncreasing,
  FileMinus2,
  FilePlus2,
  Library,
  Search,
  ParkingMeter,
  ListPlus,
  TrendingUp,
  MoveRight,
  CheckCheck,
  ListTodo,
  LayoutList,
  IndianRupee,
  SquarePlus,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SideBar() {
  const router = useRouter()
  const [role, setRole] = useState('Admin');
  function SidebarItem({ path, icon, title }) {
    return (
      <button
        // onClick={() => { router.push(path) }}
        className="flex items-center justify-center w-full px-3 py-2 transition-colors duration-200 hover:text-[#9779FF] group-hover:justify-start"
      >
        <div className="mr-4">{icon}</div>
        <span className="hidden group-hover:inline-block whitespace-nowrap">
          {title}
        </span>
      </button>
    );
  }

  return (
    <>
      {role === 'User' && <div className="flex h-[90vh] w-max bg-gray-100 ">
        <div className="bg-[#FBFBFB] pb-20  overflow-y-auto text-gray-700 w-20 flex flex-col items-center py-4 transition-all duration-300 ease-in-out hover:w-64 group">
          {/* Sidebar logo/pin */}
          <div className="mb-12 -rotate-45">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="#9779FF"
              stroke="#9779FF"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pin"
            >
              <path d="M12 17v5" />
              <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
            </svg>
          </div>

          {/* Main (shows only when expanded) */}
          <button

            className="flex items-center justify-center w-full px-3 py-2 transition-colors duration-200 hover:text-[#9779FF] group-hover:justify-start"
          >
            <div className="mr-4">
              <Minus className="w-6 h-6 group-hover:hidden" />
            </div>
            {/* Show 'Main' only when sidebar is expanded */}
            <span className="hidden group-hover:inline-block whitespace-nowrap font-bold text-xl">
              Main
            </span>
          </button>
          {/* Navigation links */}
          <nav className="flex flex-col w-full mt-3">
            <SidebarItem
              path={'/dashboard'}
              icon={<ChartPie className="w-6 h-6" />}
              title="Dashboard"
            />
            <SidebarItem
              path={'/edit-profile'}
              icon={<User className="w-6 h-6" />}
              title="Edit Profile"
            />
            <SidebarItem

              icon={<ShoppingCart className="w-6 h-6" />}
              title="Payment Reciepts"
            />
            <SidebarItem
              icon={<LockKeyhole className="w-6 h-6" />}
              title="Logout"
            />
          </nav>
          {/* Curriculumn (shows only when expanded) */}
          <button

            className="flex items-center justify-center w-full px-3 py-2 transition-colors duration-200 hover:text-[#9779FF] group-hover:justify-start"
          >
            <div className="mr-4">
              <Minus className="w-6 h-6 group-hover:hidden" />
            </div>
            {/* Show 'Main' only when sidebar is expanded */}
            <span className="hidden group-hover:inline-block whitespace-nowrap font-bold text-xl">
              Curriculum
            </span>
          </button>
          {/* Navigation links */}
          <nav className="flex flex-col w-full mt-3">
            <SidebarItem
              icon={<FileSpreadsheet className="w-6 h-6" />}
              title="View"
            />
            <SidebarItem
              icon={<FileCog className="w-6 h-6" />}
              title="Choose / Change"
            />
            <SidebarItem
              icon={<FileChartColumnIncreasing className="w-6 h-6" />}
              title="College Wise"
            />
          </nav>
          {/* Topic (shows only when expanded) */}
          <button

            className="flex items-center justify-center w-full px-3 py-2 transition-colors duration-200 hover:text-[#9779FF] group-hover:justify-start"
          >
            <div className="mr-4">
              <Minus className="w-6 h-6 group-hover:hidden" />
            </div>
            {/* Show 'Main' only when sidebar is expanded */}
            <span className="hidden group-hover:inline-block whitespace-nowrap font-bold text-xl">
              Topic
            </span>
          </button>
          {/* Navigation links */}
          <nav className="flex flex-col w-full mt-3">
            <SidebarItem icon={<FileMinus2 className="w-6 h-6" />} title="Add" />
            <SidebarItem
              icon={<FilePlus2 className="w-6 h-6" />}
              title="Remove"
            />
          </nav>
          {/* Activity (shows only when expanded) */}
          <button

            className="flex items-center justify-center w-full px-3 py-2 transition-colors duration-200 hover:text-[#9779FF] group-hover:justify-start"
          >
            <div className="mr-4">
              <Minus className="w-6 h-6 group-hover:hidden" />
            </div>
            {/* Show 'Main' only when sidebar is expanded */}
            <span className="hidden group-hover:inline-block whitespace-nowrap font-bold text-xl">
              Activity
            </span>
          </button>
          {/* Navigation links */}
          <nav className="flex flex-col w-full mt-3">
            <SidebarItem icon={<Library className="w-6 h-6" />} title="Applied" />
            <SidebarItem
              icon={<Search className="w-6 h-6" />}
              title="Search by Topic"
            />
            <SidebarItem
              icon={<ParkingMeter className="w-6 h-6" />}
              title="Recommended"
            />
            <SidebarItem icon={<ListPlus className="w-6 h-6" />} title="New" />
            <SidebarItem
              icon={<TrendingUp className="w-6 h-6" />}
              title="Trending"
            />
            <SidebarItem
              icon={<MoveRight className="w-6 h-6" />}
              title="Ongoing"
            />
            <SidebarItem
              icon={<CheckCheck className="w-6 h-6" />}
              title="Completed"
            />
            <SidebarItem
              icon={<ListTodo className="w-6 h-6" />}
              title="Submission Pending"
            />
            <SidebarItem
              icon={<LayoutList className="w-6 h-6" />}
              title="Pending Approval"
            />
            <SidebarItem
              icon={<IndianRupee className="w-6 h-6" />}
              title="Payment Pending"
            />
          </nav>
        </div>
      </div>}
      {role === 'Admin' && <div className="flex h-[90vh] w-max bg-gray-100 ">
        <div className="bg-[#FBFBFB] pb-20  overflow-y-auto text-gray-700 w-20 flex flex-col items-center py-4 transition-all duration-300 ease-in-out hover:w-64 group">
          {/* Sidebar logo/pin */}
          <div className="mb-12 -rotate-45">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="#9779FF"
              stroke="#9779FF"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pin"
            >
              <path d="M12 17v5" />
              <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
            </svg>
          </div>

          {/* Main (shows only when expanded) */}
          <button

            className="flex items-center justify-center w-full px-3 py-2 transition-colors duration-200 hover:text-[#9779FF] group-hover:justify-start"
          >
            <div className="mr-4">
              <Minus className="w-6 h-6 group-hover:hidden" />
            </div>
            {/* Show 'Main' only when sidebar is expanded */}
            <span className="hidden group-hover:inline-block whitespace-nowrap font-bold text-xl">
              Main
            </span>
          </button>
          {/* Navigation links */}
          <nav className="flex flex-col w-full mt-3">
            <SidebarItem
              path="/"
              icon={<ChartPie className="w-6 h-6" />}
              title="Dashboard"
            />
            <SidebarItem
              icon={<User className="w-6 h-6" />}
              title="Edit Profile"
            />
            <SidebarItem
              icon={<ShoppingCart className="w-6 h-6" />}
              title="Payment Reciepts"
            />
            <SidebarItem
              icon={<LockKeyhole className="w-6 h-6" />}
              title="Logout"
            />
          </nav>
          {/* Curriculumn (shows only when expanded) */}
          <button

            className="flex items-center justify-center w-full px-3 py-2 transition-colors duration-200 hover:text-[#9779FF] group-hover:justify-start"
          >
            <div className="mr-4">
              <Minus className="w-6 h-6 group-hover:hidden" />
            </div>
            {/* Show 'Main' only when sidebar is expanded */}
            <span className="hidden group-hover:inline-block whitespace-nowrap font-bold text-xl">
              Curriculum
            </span>
          </button>
          {/* Navigation links */}
          <nav className="flex flex-col w-full mt-3">
            <SidebarItem
              icon={<FileSpreadsheet className="w-6 h-6" />}
              title="View"
            />
            <SidebarItem
              icon={<FileCog className="w-6 h-6" />}
              title="Choose / Change"
            />
            <SidebarItem
              icon={<FileChartColumnIncreasing className="w-6 h-6" />}
              title="College Wise"
            />
          </nav>
          {/* Topic (shows only when expanded) */}
          <button

            className="flex items-center justify-center w-full px-3 py-2 transition-colors duration-200 hover:text-[#9779FF] group-hover:justify-start"
          >
            <div className="mr-4">
              <Minus className="w-6 h-6 group-hover:hidden" />
            </div>
            {/* Show 'Main' only when sidebar is expanded */}
            <span className="hidden group-hover:inline-block whitespace-nowrap font-bold text-xl">
              Topic
            </span>
          </button>
          {/* Navigation links */}
          <nav className="flex flex-col w-full mt-3">
            <SidebarItem icon={<FileMinus2 className="w-6 h-6" />} title="Add" />
            <SidebarItem
              icon={<FilePlus2 className="w-6 h-6" />}
              title="Remove"
            />
          </nav>
          {/* Activity (shows only when expanded) */}
          <button

            className="flex items-center justify-center w-full px-3 py-2 transition-colors duration-200 hover:text-[#9779FF] group-hover:justify-start"
          >
            <div className="mr-4">
              <Minus className="w-6 h-6 group-hover:hidden" />
            </div>
            {/* Show 'Main' only when sidebar is expanded */}
            <span className="hidden group-hover:inline-block whitespace-nowrap font-bold text-xl">
              Activity
            </span>
          </button>
          {/* Navigation links */}
          <nav className="flex flex-col w-full mt-3">
            <SidebarItem icon={<SquarePlus className="w-6 h-6" />} title="Add" />
            <SidebarItem icon={<SquarePlus className="w-6 h-6" />} title="View All Activities" />
            <SidebarItem icon={<Library className="w-6 h-6" />} title="Applied" />
            <SidebarItem
              icon={<Search className="w-6 h-6" />}
              title="Search by Topic"
            />
            <SidebarItem
              icon={<ParkingMeter className="w-6 h-6" />}
              title="Recommended"
            />
            <SidebarItem icon={<ListPlus className="w-6 h-6" />} title="New" />
            <SidebarItem
              icon={<TrendingUp className="w-6 h-6" />}
              title="Trending"
            />
            <SidebarItem
              icon={<MoveRight className="w-6 h-6" />}
              title="Ongoing"
            />
            <SidebarItem
              icon={<CheckCheck className="w-6 h-6" />}
              title="Completed"
            />
            <SidebarItem
              icon={<ListTodo className="w-6 h-6" />}
              title="Submission Pending"
            />
            <SidebarItem
              icon={<LayoutList className="w-6 h-6" />}
              title="Pending Approval"
            />
            <SidebarItem
              icon={<IndianRupee className="w-6 h-6" />}
              title="Payment Pending"
            />
          </nav>
        </div>
      </div>}
    </>
  );
}

