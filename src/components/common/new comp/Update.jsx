"use client";
// import Image from "next/image";
import { CiEdit } from "react-icons/ci";

export default function Update({ size = 20, setModal, setType, id, setId, setName, name }) {
  function handleUpdate() {
    console.log(setModal, "Update button clicked");
    setId(id);
    setModal(true);
    setType("update");
    setName(name);
  }

  return (
    <button
      className="hover:bg-yellow-200/70 md:p-0.8 rounded-lg"
      onClick={handleUpdate}
    >
      <CiEdit size={size + 8} />
      {/* <Image src="/update.svg" width={size} height={size} alt="update icon" /> */}
    </button>
  );
}
