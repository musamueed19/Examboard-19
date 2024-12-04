import Image from "next/image";

export default function SuccessToast({ content }) {
  return (
    <div className="fixed z-40 right-4 top-[4.7rem] bg-green-500 w-fit h-fit flex items-center justify-between space-x-10 text-white text-[1rem] px-[0.8rem] py-[0.4rem] rounded-md">
      <div className="flex space-x-2 items-center mt-[2px]">
        <Image src="/success.svg" width={14} height={14} alt="close icon" />
        <p>{content}</p>
      </div>
    </div>
  );
}
