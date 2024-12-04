'use client'

import { useRef } from "react";
import { useEffect } from "react";
import Image from "next/image";
export default function Searchbar({ label, searchValue, setSearchValue }) {
  const inputRef = useRef(null);


  const handleInputChange = (event) => {
    setSearchValue(event.target.value); 
  };

  return (
    <div>
      <label className="font-bold text-black/80">{label} :</label>
      <div className="border border-[#909090] bg-white/60 flex items-center justify-between pl-1.5 pr-0.5 py-0.5 rounded-lg text-sm">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none bg-transparent"
          value={searchValue}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <button
          type="button"
          className="hover:bg-blue-600/20 bg-gray-400/30 py-[0.1rem] px-[0.2rem] rounded-md"
        >
          <Image src="/search.svg" width={20} height={20} alt="search icon" />
        </button>
      </div>
    </div>
  );
}
