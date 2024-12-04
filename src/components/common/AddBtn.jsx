import Image from 'next/image'
import React from 'react'

export default function AddBtn({title, onClick}) {
  return (
    <button onClick={() => onClick({table:"users", type:"create", isOpen:true})} className='scale-50 lg:scale-90 flex items-center justify-center rounded-lg gap-2 text-lg lg:text-xl p-2 lg:px-3 lg:py-[0.7rem] bg-[#226ffe] hover:bg-[#165fe8] text-white font-bold'>
      <Image src="/create.svg" width={28} height={28} alt='plus icon' />
      {title}
    </button>
  )
}
