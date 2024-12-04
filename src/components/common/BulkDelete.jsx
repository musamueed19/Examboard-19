"use client";
import Image from "next/image";
import React, { useState } from "react";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import DeleteDialog from "./DeleteDialog";
import { IoClose } from "react-icons/io5";

export default function BulkDelete({ setRefresh, ids, label, path }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleBulkDelete = async (event) => {
    event.preventDefault();
    console.log(ids);
    

    if (!ids || ids.length === 0) {
      alert("No ID provided for deletion");
      return;
    }

    const queryString = ids.map((id) => `id=${id}`).join("&");
    try {
      console.log(`${process.env.NEXT_PUBLIC_BASE_API_URL}/${path}?${queryString}`);
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/${path}?${queryString}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // (prev) => prev + 1
        setRefresh("All selected records are deleted successfully.");
        router.refresh(path);
        setIsOpen(false);
      } else {
        console.error("Failed to delete items", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting items", error);
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <button
            onClick={() => setIsOpen(false)}
            className={`fixed text-black text-2xl top-[29%] right-[31%]`}
            aria-label="Close"
          >
            <IoClose />
          </button>

          <form onSubmit={handleBulkDelete} className="bg-white p-6 rounded-lg">
            <DeleteDialog
              title={`selected ${label}`}
              onCancel={() => setIsOpen(false)}
            />
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="scale-[0.65] md:scale-[0.7] lg:scale-100 hover:bg-[#ffc5c5] p-2 rounded-md"
        >
          <Image src="/delete.svg" width={30} height={30} alt="delete icon" />
        </button>
      )}
    </>
  );
}
