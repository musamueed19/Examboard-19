'use client'

import ProfileDropdown from "./ProfileDropdown";
import { IoNotificationsCircle, IoNotificationsOutline } from "react-icons/io5";
import MobileNav from "./MobileNav";


const Header = () => {
  return (
    <header className="sticky top-0 h-[8vh] shadow-md border-b border-b-black/5 bg-white w-full">
      {/* Header Inner Container */}
      <div className="h-full w-[97%] md:w-[95%] mx-auto py-2 flex items-center justify-between md:justify-end">
        {/* Mobile Responsive - Bars Section */}
        <div className="md:hidden">
         <MobileNav />
        </div>

        {/* User Help - Section */}
        <div className="flex gap-2 md:gap-4 lg:gap-6 xl:gap-8">
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
