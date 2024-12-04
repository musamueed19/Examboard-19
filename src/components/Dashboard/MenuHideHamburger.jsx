'use client'

import Image from "next/image";
import { useState } from "react";

export default function MenuHideHamburger() {
  const [hide, setHide] = useState(false);

  return (
    <button onClick={() => setHide(!hide)}>
      <Image src="/hamburger.svg" width={30} height={30} alt="hamburger icon" />
    </button>
  );
}
