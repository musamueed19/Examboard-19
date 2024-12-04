"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Searchbar({ label, setUrl, url }) {
  const [searchData, setSearchData] = useState("");

  function changeHandler(event) {
    setSearchData(event.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(searchData);
  }

  // useEffect(() => {
  //   console.log(searchData);
  //   const newUrl = new URL(`${url}/search`);
  //   newUrl.searchParams.set("limit", 10);
  //   newUrl.searchParams.set("skip", 0);
  //   newUrl.searchParams.set("q", searchData);

  //   setUrl(newUrl.toString());
  // }, [searchData]);

  return (
    <form className="w-[12rem]" onSubmit={submitHandler}>
      <label htmlFor="searchbox" className="font-bold text-sm text-[#333]">
        {label}:
      </label>
      <div className="flex bg-white w-full rounded-md p-1 py-1.5 border border-black/50 focus:border-black/70 text-sm">
        <input
          type="text"
          className="bg-transparent w-full outline-none px-1"
          placeholder="search..."
          name="searchbox"
          value={searchData}
          onChange={changeHandler}
        />
        <button
          type="submit"
          className="hover:bg-gray-300/50 bg-gray-200/60 px-[1px] rounded-sm cursor-pointer"
        >
          <Image src="/search.svg" width={20} height={20} alt="search icon" />
        </button>
      </div>
    </form>
  );
}
