"use client";

import { RiLockPasswordLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCircleUser, FaUserLarge } from "react-icons/fa6";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [userName, setUserName] = useState("User's name - null");
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  function profilePopupHandler(isOpen) {
    setIsOpen(isOpen);
  }

  function logoutHandler() {
    Cookies.remove("userData");
    // Optionally, clear any other related data (e.g., sessionStorage)
    //  sessionStorage.clear();
    router.push("/auth/login");
  }

  useEffect(() => {
    const userData = Cookies.get("userData");
    console.log(userData);
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log(parsedData);



      // If user has its Name - Section
      if (parsedData.user.name !== "" || parsedData.user.name !== null) setUserName(parsedData.user.name)

        if (parsedData.user.name === "") {
        setUserName(parsedData.user.role.includes("Admin")
        ? "Admin"
        : "No name")
      }
      
      // Assuming parsedData has a 'name' property

      // Getting user Roles from the Parsed Data.
      console.log(parsedData.user?.email);

      // Storing User Data in the UseState
      setUserData(parsedData.user);
    }
  }, []);

  return (
    <DropdownMenu
      onOpenChange={() => profilePopupHandler(!isOpen)}
      open={isOpen}
    >
      <DropdownMenuTrigger className="border-none outline-none">
        <div
          className={`${
            isOpen ? "bg-blue-600/90" : "hover:bg-blue-600/90 bg-white"
          } active: group rounded-full p-2 border`}
        >
          <FaUserLarge
            className={`w-6 h-6 transition-all duration-200 ${
              isOpen ? "text-white" : "text-black group-hover:text-white"
            }`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-[14rem]">
        <DropdownMenuLabel>
          {/* User Name & Roles - Section */}
          <div className="flex justify-between items-center relative overflow-visible">
            <p className="text-lg font-bold">{userName}</p>
            <span
              className="font-semibold text-xs text-[#055BFA] bg-[#EAF1FF] py-1 px-1.5 rounded-lg cursor-pointer border-blue-200 hover:border-blue-400 border"
              onMouseOver={() => setShowRole(true)}
              onMouseLeave={() => setShowRole(false)}
            >
              Roles
            </span>
          </div>

          {/* Roles details Dropbox - Section */}
          {showRole && (
            <div className="absolute z-10 p-2 top-10 left-0 border border-blue-200 bg-white rounded-lg shadow-xl flex justify-start items-start gap-4 max-w-[40rem] mr-4">
              <p className="text-sm font-bold">Roles</p>
              <p className="font-medium text-xs text-gray-600">
                {userData?.roles.join(", ")}
              </p>
            </div>
          )}

          {/* User Email - Section */}
          <div className="flex items-center justify-start gap-x-3">
            <MdEmail size={14} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-600">{userData?.email}</span>
          </div>
          {/* User Phone - Section */}
          <div className="flex items-center justify-start gap-x-3">
            {/* <span className="text-sm font-medium text-gray-600">phone #:</span> */}
            <FaPhoneAlt size={12} className="text-gray-600" />
            <span className="text-xs font-medium text-gray-600">
              {userData?.phone}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href="/user/changepassword"
            className="flex items-center justify-normal gap-2"
          >
            <RiLockPasswordLine size={20} />
            <span className="font-medium">Change Password</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            type="button"
            onClick={logoutHandler}
            className="flex items-center justify-normal gap-2"
          >
            <MdLogout size={20} className="text-red-600" />
            <span className="font-medium text-red-500">Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// <div className="flex items-center justify-center gap-2 md:gap-4 transition-all">
//   {isOpen && <p className="font-medium text-base bg-red-500 p-1 text-white rounded-lg">{userName}</p>}

//   {/* bg-[#d2d2d2]/90 rounded-full w-fit py-2 px-[0.7rem] hover:bg-blue-400 */}
//   <button
//     onClick={() => {
//       profilePopupHandler(!isOpen);
//     }}
//   >
//     <div className={`${isOpen ? "bg-blue-500" : "hover:bg-blue-500 bg-transparent"} group rounded-full p-2 border`}>
//       <FaUserLarge className={`w-6 h-6 transition-all duration-200 ${isOpen ? "text-white" : "text-black group-hover:text-white"}`} />
//     </div>
//   </button>
//   {isOpen && (
//     <div className="w-fit h-fit flex flex-col absolute top-16 right-3 border border-black/40 rounded-md bg-white z-10">
//       <Link
//         href="/user/changepassword"
//         className="p-2 border-b border-gray-800 hover:bg-blue-100"
//       >
//         Change Password
//       </Link>
// <button
//   type="button"
//   className="p-2 hover:bg-red-100 text-red-600 font-medium"
//   onClick={logoutHandler}
// >
//         Logout
//       </button>
//     </div>
//   )}
// </div>
