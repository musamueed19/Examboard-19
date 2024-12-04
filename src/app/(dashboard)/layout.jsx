"use client";

import Header from "@/components/Dashboard/Header";
import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  // const [isHide, setIsHide] = useState(false);
  const [expanded, setExpanded] = useState(true);
  // const router = useRouter();

  // function hideTitleHandler() {
  //   setIsHide(!isHide);
  //   console.log("function", isHide);
  // }

  // useEffect(() => {
  //   let userData = sessionStorage.getItem("userData");
  //   if (userData === null || userData.email === '' || userData.email === null) {
  //     router.push('/auth/login')
  //   }
  //   else {}
  // }, []);

  return (
    <div className="flex h-full">
      {/* Dashboard Layout -  for all Modules */}

      {/* Sidebar Section */}
      <div className="text-gray-200 z-8">
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
      </div>

      {/* Main Bod Area - Section */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300 scrollbar-corner-blue-700">

        <Header />
        
        {/* Main Area */}
        {children}

      </div>

      

    </div>
  );
}
