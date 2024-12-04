import Image from "next/image";

export default function Add({ size, setModal, setType }) {
  function handleAdd() {
    console.log(setModal, "Add button clicked");
    setModal(true);
    setType("add");
  }

  return (
    <button
      className="text-white bg-[#226ffe] flex items-center focus:ring-4 focus:ring-blue-200 w-[6rem] justify-center text-lg p-1 rounded-lg gap-2 hover:bg-[#0852f1] font-medium"
      onClick={handleAdd}
    >
      <Image src="/plus.svg" width={size} height={size} alt="plus icon" />
      <span>Add</span>
    </button>
  );
}
