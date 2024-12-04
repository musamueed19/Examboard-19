"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function MessageStrip({ isVisible, setIsVisible, content }) {
  // console.log("isVisible", isVisible);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000); // 3 seconds timeout

      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [isVisible, content]);

  return (
    <div className="absolute z-40 right-4 top-[3.5rem] bg-green-500 w-fit h-fit flex items-center justify-between space-x-10 text-white text-[1rem] px-[0.8rem] py-[0.4rem] rounded-md">
      <div className="flex space-x-2 items-center mt-[2px]">
        <Image src="/success.svg" width={14} height={14} alt="close icon" />
        <p>{content}</p>
      </div>
    </div>
  );
}

{
  /* <button className="" onClick={() => setIsVisible(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 490 490"
          className="w-[10px] h-[10px] fill-white hover:fill-red-500 hover:stroke-red-500"
          stroke="white"
          strokeWidth="50"
        >
          <polygon
            points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
              489.292,457.678 277.331,245.004 489.292,32.337"
          />
        </svg>
      </button> */
}
