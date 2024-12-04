"use client";

// import Image from "next/image";
import { useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function BulkDelete({ size = 20, setModal, setType, ids }) {

  useEffect(() => {
    console.log(ids);
  }, [ids]);

  function handleDelete() {
    console.log(setModal, "Bulk delete button clicked");
    setModal(true);
    setType("bulkdelete");
  }

  return (
    <button
      className="hover:bg-red-200/70 bg-red-100/70 p-1 rounded-lg"
      onClick={handleDelete}
      disabled={ ids.length < 1 ? true : false}
    >
      <RiDeleteBin6Line size={size} className="text-red-500" />
      {/* <Image src="/delete.svg" width={size} height={size} alt="delete icon" /> */}
    </button>
  );
}
