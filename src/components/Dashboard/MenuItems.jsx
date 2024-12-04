"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const activeLink = `bg-blue-700`;
const activeImage = `invert`;
const activeSpan = `text-white`;

export default function MenuItems({ item, isTitleHide }) {
  // console.log('MenuItems', isTitleHide);

  const [activeImg, setActiveImg] = useState(null);
  const pathname = usePathname();
  const isActive =
    item.path === "" ? pathname === "/" : pathname === `/${item.path}`;

  useEffect(() => {
    if (isActive) {
      // console.log(pathname);
      setActiveImg(item.path);
    }
  }, [activeImg, pathname]);

  // if (item.title === "Home") console.log(item);

  // activeImg === item.path;

  return (
    <Link
      key={item.path}
      onClick={() => setActiveImg(item.path)}
      className={`flex gap-3 items-center justify-center lg:justify-start rounded-md mx-1 sm:mx-[0.65rem] md:mx-[0.2rem] lg:mx-0 sm:py-2 md:py-4 md:px-2 lg:px-4 lg:py-[0.6rem] p-1 ${
        isActive ? activeLink : ""
      }`}
      href={`/${item.path}`}
    >
      <Image
        src={item.img}
        width={30}
        height={30}
        className={`transition-all filter contrast-200 brightness-0 ${
          isActive ? activeImage : ""
        }`}
        alt={item.title}
      />
      <span
        className={`hidden ${
          isTitleHide ? "hidden" : "lg:block"
        } font-medium lg:text-[1rem] xl:text-base ${
          isActive ? activeSpan : ""
        }`}
      >
        {item.title}
      </span>
    </Link>
  );
}
