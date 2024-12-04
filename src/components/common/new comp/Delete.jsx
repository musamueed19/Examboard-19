"use client";

// import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Delete({ size = 20, setModal, setType, id, setId, setName, name }) {
  function handleDelete() {
    console.log(setModal, "Delete button clicked");
    setId(id);
    setModal(true);
    setType("delete");
    setName(name);
  }

  return (
    <button
      className="hover:bg-red-200/70 p-1 rounded-lg"
      onClick={handleDelete}
    >
      <RiDeleteBin6Line size={size} className="text-red-500" />
      {/* <Image src="/delete.svg" width={size} height={size} alt="delete icon" /> */}
    </button>
  );
}
