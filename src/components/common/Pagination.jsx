"use client";
import React from "react";

export default function Pagination({ rows, setRows, page, setPage, totalPages }) {
  return (
    <div className="scale-75 lg:scale-100 flex items-center justify-between mt-2 md:mt-4 lg:mt-6 w-[94%] mx-auto">
      <div className="font-medium">
        Showing
        <select
          value={rows}
          onChange={(event) => setRows(Number(event.target.value))}
          name="rows"
          id="rows"
          className="border-2 border-[#ddd] rounded-md p-2 mx-2"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
        rows per page
      </div>
      <div className="font-medium">
        Page
        <select
          value={page}
          onChange={(event) => setPage(Number(event.target.value))}
          name="page"
          id="page"
          className="border-2 border-[#ddd] rounded-md p-2 mx-2"
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        of {totalPages}
      </div>
    </div>
  );
}

