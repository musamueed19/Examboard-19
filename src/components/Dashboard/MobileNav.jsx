"use client";

import { menuItems } from "@/Constants/constants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";

export default function MobileNav() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  // useEffect(() => {
  //   setIsOpen(false);
  // }, [pathname])

  function closeNav() {
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <FaBars className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-fit">
        <SheetHeader>
          <SheetTitle>
            <Link className="flex gap-1 cursor-pointer my-4" href="/">
              <Image src="logo.svg" alt="logo" width={30} height={30} />
              <h1 className="text-[1.25rem] lg:text-xl font-semibold">
                <span className="text-blue-900 text-3xl font-extrabold">E</span>
                xamboard
              </h1>
            </Link>
          </SheetTitle>
          <div className="mt-10 flex flex-col items-start space-y-2">
            {menuItems.map((item, index) => {
              const isActive =
                pathname.includes(item.href) || pathname === item.href;
              return (
                <Link
                  onClick={closeNav}
                  key={index}
                  href={item.href}
                  className={`relative group flex gap-4 items-end w-full p-2 md:p-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "bg-blue-500"
                      : "bg-transparent hover:bg-blue-100/90"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={26}
                    height={26}
                    className={isActive ? "filter invert brightness-0" : ""}
                  />
                  <span
                    className={`text-base font-medium ${
                      isActive ? "text-white" : "text-black"
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
