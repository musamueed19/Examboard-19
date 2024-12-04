"use client";

import { FaBars } from "react-icons/fa6";

import { menuItems } from "@/Constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "../ui/tooltip";

export default function Sidebar({ setExpanded, expanded }) {
  const pathname = usePathname();

  return (
    // ${ expanded ? "w-[16vw] lg:w-[14vw]" : "w-fit" }
    <div
      className={`hidden md:block bg-slate-100 h-full sticky top-0 text-black overflow-y-auto pb-10 scrollbar-thin scrollbar-thumb-blue-300/50 scrollbar-track-blue-50 scrollbar-corner-blue-700`}
    >
      {/* Sidebar 2nd Inner Container */}
      <div className="p-2 md:p-5 transition-all duration-200">
        {/* Logo & Sidebar Icon section */}
        <div
          className={`flex items-center ${
            expanded ? "justify-between gap-8" : "justify-center"
          }`}
        >
          {/* Logo Name */}
          <Link
            className={`flex gap-1 ${
              expanded ? "inline" : "hidden"
            } cursor-pointer`}
            href="/"
          >
            <Image src="logo.svg" alt="logo" width={30} height={30} />

            <h1 className={`text-[1.25rem] lg:text-xl font-semibold`}>
              <span className="text-blue-900 text-3xl font-extrabold">E</span>
              xamboard
            </h1>
          </Link>

          {/* Sidebar icon */}
          <FaBars
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer h-6 w-6"
          />
        </div>

        {/* Sidebar Links */}

        <div
          className={`mt-10 flex flex-col ${
            expanded ? "items-start" : "items-center"
          } space-y-2`}
        >
          <TooltipProvider>
            {menuItems.map((item, index) => (
              <Tooltip key={index}>
                <TooltipTrigger className="w-full">
                  <Link
                    key={index}
                    href={item.href}
                    className={`relative group flex gap-4 items-end w-full p-1 md:p-2 rounded-md transition-all duration-200 ${
                      pathname.includes(item.href) || pathname === item.href
                        ? "bg-blue-500"
                        : "bg-slate-100 hover:bg-blue-100/90"
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={26}
                      height={26}
                      className={`${
                        pathname.includes(item.href) || pathname === item.href
                          ? "filter invert brightness-0"
                          : ""
                      }`}
                    />
                    <span
                      className={`${expanded ? "inline" : "hidden"} ${
                        pathname.includes(item.href) || pathname === item.href
                          ? "text-white"
                          : "text-black"
                      } text-base font-medium`}
                    >
                      {item.title}
                    </span>
                    <TooltipContent
                      className={`${
                        expanded ? "hidden" : ""
                      } bg-blue-400 text-white text-xs absolute w-fit left-6 top-2`}
                    >
                      {item.title}
                    </TooltipContent>
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
