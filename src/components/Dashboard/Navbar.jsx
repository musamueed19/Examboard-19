import Image from "next/image";
import ProfileDropdown, { profilePopupHandler } from "./ProfileDropdown";
// import MenuHideHamburger from "./MenuHideHamburger";

export default function Navbar({ hideMenu, setIsLogged }) {
  return (
    <div className="flex md:flex-row bg-gray-100/90 md:justify-end justify-end items-center py-1 px-2 md:px-4 lg:px-6 lg:py-3 xl:px-8 ">
      {/* LEFT */}
      <button onClick={hideMenu} className="flex md:hidden">
        <Image
          src="/hamburger.svg"
          width={30}
          height={30}
          alt="hamburger icon"
        />
      </button>

      {/* RIGHT */}
      <div className="flex gap-2 md:gap-4 lg:gap-6 xl:gap-8 self-end">
        <button>
          <Image
            src="/bell.svg"
            width={30}
            height={30}
            alt="bell icon"
            className="filter contrast-0 brightness-0 hover:contrast-100 hover:brightness-100"
          />
        </button>
        <ProfileDropdown />
      </div>
    </div>
  );
}
