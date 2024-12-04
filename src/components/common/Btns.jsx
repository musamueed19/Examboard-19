export default function Btns({type, title, btnType, onClick}) { 
  return (
    <>
      {type === "secondary" ? (
        <button
          type={btnType}
          onClick={onClick}
          className="scale-50 w-[6rem] lg:scale-90 flex items-center justify-center rounded-lg gap-2 text-lg lg:text-xl px-2 py-1 lg:px-4 lg:py-[0.5rem] bg-[#226ffe] hover:bg-[#165fe8] text-white font-bold"
        >
          {title}
        </button>
      ) : type === "alert" ? (
        <button
          type={btnType}
          onClick={onClick} 
          className="scale-50 w-[6rem] lg:scale-90 flex items-center justify-center rounded-lg gap-2 text-lg lg:text-xl px-2 py-1 lg:px-4 lg:py-[0.5rem] bg-[#fc5555] hover:bg-[#ec4a4a] text-white font-bold"
        >
          {title}
        </button>
      ) : (
        <button
          type={btnType}
          onClick={onClick}
          className="scale-50 w-[6rem] lg:scale-90 flex items-center justify-center rounded-lg gap-2 text-lg lg:text-xl px-2 py-1 lg:px-4 lg:py-[0.5rem] bg-white font-bold text-[#226ffe] border-2 border-[#226ffe] hover:border-3"
        >
          {title}
        </button>
      )}
    </>
  );
}
