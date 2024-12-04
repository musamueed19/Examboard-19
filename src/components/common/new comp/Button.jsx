export default function Button({ children, variant = "primary", onClick, type, disabled = false }) {
  let btnClass = "";
  
  if (variant === "primary")
    btnClass =
      "w-full md:w-[6rem] rounded-md border-2 border-[#226ffe] text-white font-semibold py-1.5 bg-[#226ffe] hover:bg-[#0852f1] focus:ring-4 focus:ring-blue-200";
  else if (variant === "revert")
    btnClass =
      "w-full md:w-[6rem] rounded-md border-2 border-[#226ffe] text-[#226ffe] font-semibold py-1.5 hover:border-blue-400/80 hover:bg-blue-100/40";
  else if (variant === "delete")
    btnClass =
      "w-full md:w-[6rem] rounded-md border-2 border-red-500/80 text-white bg-red-500/90 font-semibold py-1.5 hover:border-red-500 hover:bg-red-500";

  return (
    <button type={type} onClick={onClick} className={btnClass} disabled={disabled}>
{children}
    </button>
  )
}
