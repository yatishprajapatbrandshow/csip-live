"use client";
import { useState, useEffect } from "react";
import { AlignJustify, ChevronRight, LogOut } from "lucide-react";
import { useRouter } from 'next/router'
import { getLocalStorageItem } from "@/Config/localstorage";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setUserType } from '../../redux/actions/sessionSlice';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, Popover, PopoverButton, PopoverPanel, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { MenuItemLinks, MenuItemLinksForCorporate } from '@/Config/Navigation'
import TopicModal from "./TopicModal";

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '/edit-profile' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Header = ({ session = false }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isSession, setIsSession] = useState(false);
    const [ShowQuickLink, setShowQuickLink] = useState(false);
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [UserDataShow, setUserDataShow] = useState("");

    const userData = useSelector((state) => state.session.userData);
    const userType = useSelector((state) => state.session.userType);
    const startSessionTrigger = useSelector((state) => state.session.startSessionTrigger);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(userType)
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const LogOut = () => {
        localStorage.removeItem("userData");
        router.replace('/login')
    }

    useEffect(() => {

        const userData = getLocalStorageItem("userData")
        if (userData) {
            console.log(userData)
            setUserDataShow(userData)
            dispatch(setUserData(userData));
            dispatch(setUserType(userData?.type));
            setIsSession(true);
        } else {
            router.push('/')
            setIsSession(false);
        }
    }, []);


    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         const now = new Date();
    //         // Format time as HH : MM : SS
    //         const formattedTime = now
    //             .toLocaleTimeString("en-US", {
    //                 hour: "2-digit",
    //                 minute: "2-digit",
    //                 second: "2-digit",
    //                 hour12: false, // 24-hour format
    //             })
    //             .replace(/:/g, " : ");
    //         // Format date as Mon, 30 September 2024
    //         const options = { weekday: "short", year: "numeric", month: "long", day: "numeric" };
    //         const formattedDate = now.toLocaleDateString("en-US", options);

    //         setTime(formattedTime);
    //         setDate(formattedDate);
    //     }, 1000); // Update every second

    //     // Clean up the interval on component unmount
    //     return () => clearInterval(timer);
    // }, []);
    const handleRegisterClick = () => {
        router.push('/signup')
        const formElement = document.getElementById('signupForm'); // Get the signup form by its ID
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the form
        }
    };
    return (
        <>

            <Disclosure as="nav" className=" sticky top-0 z-10 bg-white/10 backdrop-blur-lg border-b border-b-white shadow-2xl shadow-black/10">
                <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            {isSession ?
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                                        <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                                    </DisclosureButton>
                                </div>
                                : null}
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    alt="CSIP"
                                    src="/images/logo.jpg"
                                    className="h-12 w-auto"
                                />
                            </div>
                            {isSession ?
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-6 relative">
                                    {userType === "Participant" ? <>
                                        {MenuItemLinks.map((item) => (
                                            <div>
                                                {item.subMenu ?
                                                    <Popover className="relative">
                                                        <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-700 outline-none">
                                                            <span>{item.name}</span>
                                                            <ChevronDownIcon aria-hidden="true" className="h-4 w-4" />
                                                        </PopoverButton>

                                                        <PopoverPanel
                                                            transition
                                                            className="absolute left-1/2  z-10 mt-5 flex w-screen max-w-max -translate-x-1/4 px-4 transition-transform transform data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in data-[leave]:skew-x-6 data-[enter]:skew-x-0"
                                                        >
                                                            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                                                                <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                                                                    {item.subMenu.map((item) => (
                                                                        <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-50" onClick={() => { item.name === 'Add' && openModal() }}>
                                                                            <div className={`mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white`}>
                                                                                <item.icon aria-hidden="true" className={`h-6 w-6 ${item.color ? `text-${item.color}` : "text-gray-600"}  group-hover:text-indigo-600`} />
                                                                            </div>
                                                                            <div>
                                                                                <button onClick={() => router.push(item.href)} className="font-medium text-[13px] text-gray-900">
                                                                                    {item.name}
                                                                                    <span className="absolute inset-0" />
                                                                                </button>
                                                                                <p className="mt-1 text-gray-600 line-clamp-2 text-xs">{item.description}</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="bg-gray-50 px-8 py-6">
                                                                    <div className="flex items-center gap-x-3">
                                                                        <h3 className="text-sm font-semibold leading-6 text-gray-900">Curriculum Management</h3>
                                                                        {/* <p className="rounded-full bg-indigo-600/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">New</p> */}
                                                                    </div>
                                                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                                                        Efficiently customize and manage your courses with real-time insights and third-party integrations to streamline curriculum development.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </PopoverPanel>
                                                    </Popover>
                                                    :
                                                    <button
                                                        key={item.name}
                                                        onClick={() => router.push(item.href)}
                                                        aria-current={item.current ? 'page' : undefined}
                                                        className={`inline-flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-700`}
                                                    >
                                                        {item.name}
                                                    </button>
                                                }
                                            </div>
                                        ))}
                                    </> : <>
                                        {MenuItemLinksForCorporate.map((item) => (
                                            <div>
                                                {item.subMenu ?
                                                    <Popover className="relative">
                                                        <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-700 outline-none">
                                                            <span>{item.name}</span>
                                                            <ChevronDownIcon aria-hidden="true" className="h-4 w-4" />
                                                        </PopoverButton>

                                                        <PopoverPanel
                                                            transition
                                                            className="absolute left-1/2  z-10 mt-5 flex w-screen max-w-max -translate-x-1/4 px-4 transition-transform transform data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in data-[leave]:skew-x-6 data-[enter]:skew-x-0"
                                                        >
                                                            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                                                                <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                                                                    {item.subMenu.map((item) => (
                                                                        <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-50" onClick={() => { item.name === 'Add' && openModal() }}>
                                                                            <div className={`mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white`}>
                                                                                <item.icon aria-hidden="true" className={`h-6 w-6 ${item.color ? `text-${item.color}` : "text-gray-600"}  group-hover:text-indigo-600`} />
                                                                            </div>
                                                                            <div>
                                                                                <button onClick={() => router.push(item.href)} className="font-medium text-[13px] text-gray-900">
                                                                                    {item.name}
                                                                                    <span className="absolute inset-0" />
                                                                                </button>
                                                                                <p className="mt-1 text-gray-600 line-clamp-2 text-xs">{item.description}</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="bg-gray-50 px-8 py-6">
                                                                    <div className="flex items-center gap-x-3">
                                                                        <h3 className="text-sm font-semibold leading-6 text-gray-900">Curriculum Management</h3>
                                                                        {/* <p className="rounded-full bg-indigo-600/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">New</p> */}
                                                                    </div>
                                                                    <p className="mt-2 text-sm leading-6 text-gray-600">
                                                                        Efficiently customize and manage your courses with real-time insights and third-party integrations to streamline curriculum development.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </PopoverPanel>
                                                    </Popover>
                                                    :
                                                    <button
                                                        key={item.name}
                                                        onClick={() => router.push(item.href)}
                                                        aria-current={item.current ? 'page' : undefined}
                                                        className={`inline-flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-700`}
                                                    >
                                                        {item.name}
                                                    </button>
                                                }
                                            </div>
                                        ))}
                                    </>}
                                </div>
                                : null}
                        </div>
                        <div className="flex items-center">
                            {isSession ?
                                <>
                                    {
                                        userData?.type === "Participant" && <div className="flex-shrink-0">
                                            <button onClick={openModal} type="button" className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" >
                                                <PlusIcon aria-hidden="true" className="-ml-0.5 h-5 w-5" />
                                                Add Topic
                                            </button>
                                            <TopicModal isOpen={isModalOpen} onClose={closeModal} />
                                        </div>
                                    }
                                    <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                                        {/* <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon aria-hidden="true" className="h-6 w-6" />
                                        </button> */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img alt="logo" src={`https://csip.fieindia.org/images/profile/${userData.participantpic}`} className="h-8 w-8 rounded-full" />
                                                </MenuButton>
                                            </div>
                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                            >
                                                <MenuItem>
                                                    <button onClick={() => router.push("/EditProfile")} className="block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                        Setting
                                                        {/* onClick={() => LogOut()} */}
                                                    </button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button onClick={() => LogOut()} className="block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                        Sign Out
                                                    </button>
                                                </MenuItem>
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="flex gap-2">
                                        <button type="button"
                                            onClick={() => router.push('/login')}
                                            className="relative bg-blue-700 p-1 text-white rounded-md px-4">
                                            <span>Log In</span>
                                        </button>
                                        <button
                                            onClick={handleRegisterClick}
                                            type="button" className="relative bg-blue-700 p-1 text-white rounded-md px-4" >
                                            <span>Register</span>
                                        </button>
                                    </div>
                                </>
                            }

                        </div>
                    </div>
                </div>

                <DisclosurePanel className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        {MenuItemLinks.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium',
                                )}
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                    <div className="border-t border-gray-700 pb-3 pt-4">
                        <div className="flex items-center px-5 sm:px-6">
                            <div className="flex-shrink-0">
                                <img alt="img" src={user.imageUrl} className="h-10 w-10 rounded-full" />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-white">{user.name}</div>
                                <div className="text-sm font-medium text-gray-400">{user.email}</div>
                            </div>
                            <button
                                type="button"
                                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-3 space-y-1 px-2 sm:px-3">
                            {userNavigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </div>
                </DisclosurePanel>
            </Disclosure>


            {/* {isSession ? (
                <header className="bg-white shadow-md py-4 px-1 sticky top-0 z-[60]">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center md:mb-0 gap-2">
                            <img
                                src="/images/logo.jpg"
                                alt="CSIP Logo"
                                className="h-14 " // Adjust logo height for responsiveness
                            />
                            <div className="max-lg:flex hidden">
                                <AlignJustify width={27} height={27} />
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-5">
                            <div className="timer max-lg:hidden">
                                <h3 className="font-bold text-xl text-end">
                                    {time}
                                </h3>
                                <span className="text-sm text-gray-600">{date}</span>
                            </div>
                            <Popover className="relative">
                                <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                    <span>Solutions</span>
                                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
                                </PopoverButton>

                                <PopoverPanel
                                    transition
                                    className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
                                        {solutions.map((item) => (
                                        <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                            <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                                            </div>
                                            <div>
                                            <a href={item.href} className="font-semibold text-gray-900">
                                                {item.name}
                                                <span className="absolute inset-0" />
                                            </a>
                                            <p className="mt-1 text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-50 px-8 py-6">
                                        <div className="flex items-center gap-x-3">
                                        <h3 className="text-sm font-semibold leading-6 text-gray-900">Enterprise</h3>
                                        <p className="rounded-full bg-indigo-600/10 px-2.5 py-1.5 text-xs font-semibold text-indigo-600">New</p>
                                        </div>
                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                        Empower your entire team with even more advanced tools.
                                        </p>
                                    </div>
                                    </div>
                                </PopoverPanel>
                            </Popover>
                            <div className="QuickLink max-sm:hidden">
                                <button
                                    className="px-4 py-2 rounded-full bg-[#9779FF] text-white font-semibold"
                                    onClick={() => {
                                        setShowQuickLink(!ShowQuickLink);
                                    }}
                                >
                                    Quick Links
                                </button>
                            </div>
                            {userData ?
                                <div className="flex gap-5 pr-10 max-sm:pr-1">
                                    <div className="max-sm:hidden">
                                        <h3 className="font-bold text-lg text-end">{userData.name}</h3>
                                        <span className="text-sm text-gray-500">
                                            {userData.email}
                                        </span>
                                    </div>
                                    
                                    <div className="profile">
                                        <img
                                            src={`https://csip.fieindia.org/images/profile/${userData.participantpic}`}
                                            alt="profile image"
                                            className="h-16 rounded-full"
                                        />
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                    
                    <div
                        className={`h-40 w-1/4 bg-white border-[#FF628A] border-[1px] rounded-3xl absolute top-[105%] p-6 transition-transform duration-700 ease-in-out transform ${ShowQuickLink ? "-translate-x-5" : "translate-x-[200%]"
                            } right-0`}
                        style={{ willChange: "transform" }}
                    >
                        <div
                            onClick={() => {
                                setShowQuickLink(false);
                            }}
                            className="absolute top-6 bg-[#FF628A] -left-12 p-3 rounded-s-lg text-white cursor-pointer"
                        >
                            <ChevronRight />
                        </div>
                        <div className="w-full h-full flex justify-center flex-col gap-1">
                            <button
                                onClick={() => userData.type === "Corporate" ?  router.push("/corporate/activity-list"): router.push("/dashboard")}
                                className="flex gap-2 text-xl text-[#8280FD] font-medium hover:text-[#acabfc]"
                            >
                                <ChevronRight /> Dashboard
                            </button>
                            <button
                                className="flex gap-2 text-xl text-[#8280FD] font-medium hover:text-[#acabfc]"
                                onClick={() => router.push("/edit-profile")}
                            >
                                <ChevronRight /> Edit Profile
                            </button>
                            <button
                                className="flex gap-2 text-xl text-[#8280FD] font-medium hover:text-[#acabfc]"
                                onClick={() => LogOut()}
                            >
                                <ChevronRight /> Logout
                            </button>
                        </div>
                    </div>
                </header>
            ) : (
                <header className="bg-white px-4 sm:px-8 md:px-20 lg:px-40 ">
                    <div className="container mx-auto flex max-sm:flex-col  justify-between items-center">
                        
                        <div className="flex items-center mb-4 md:mb-0">
                            <img
                                src="/images/logo.jpg"
                                alt="CSIP Logo"
                                className="h-18 sm:h-22 md:h-24" // Adjust logo height for responsiveness
                            />
                        </div>

                        
                        <div className="flex space-x-4">
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="text-[#3455CE] text-sm sm:text-base md:text-lg font-medium hover:underline"
                            >
                                Login
                            </button>
                            <button
                                className="text-[#3455CE] text-sm sm:text-base md:text-lg font-medium hover:underline"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </header>
            )} */}
        </>
    );
};

export default Header;
