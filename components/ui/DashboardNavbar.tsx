"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { FaBell, FaCog, FaUserCircle, FaBookmark, FaSignOutAlt, FaBars, FaTimes, FaHome, FaUser } from "react-icons/fa";
import Image from "next/image";
import { logoutUser } from "@/lib/api";
import { useToaster } from "@/components/ui/Toaster";

interface NavLink { name: string; href: string; icon: React.ReactNode; }

const navLinks: NavLink[] = [
  { name: "Home", href: "/dashboard", icon: <FaHome className="text-sm" /> },
  { name: "Profile", href: "/dashboard/profile", icon: <FaUser className="text-sm" /> },
];

const DashboardNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToaster();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsDropdownOpen(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) setIsMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      showToast({ type: "success", title: "Logged out successfully", description: "Redirecting to homepage..." });
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      console.error("Logout error:", error);
      showToast({ type: "error", title: "Logout failed", description: "Please try again" });
    }
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 p-0 sticky top-0 z-[100]">
      <div className="max-w-container mx-auto flex items-center justify-between py-4 px-8 tablet:px-4 xs:px-3">
        <div className="flex items-center"><Link href="/dashboard" className="flex items-center"><Image src="/images/logo_1.svg" alt="VetriConn" width={180} height={60} /></Link></div>
        <div className="hidden tablet:hidden md:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => <Link key={link.href} href={link.href} className={clsx("font-open-sans font-medium text-gray-500 no-underline py-3 px-4 rounded-lg transition-all duration-200 relative hover:text-gray-700 hover:bg-gray-50", pathname === link.href && "text-primary font-bold after:content-[''] after:absolute after:-bottom-4 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[3px] after:bg-primary")}>{link.name}</Link>)}
        </div>
        <div className="flex items-center gap-4 tablet:gap-2 xs:gap-1.5">
          <button className="hidden tablet:hidden md:flex bg-transparent border-none text-gray-500 text-xl p-3 rounded-full cursor-pointer transition-all duration-200 items-center justify-center hover:bg-gray-100 hover:text-gray-700"><FaBell /></button>
          <Link href="/dashboard/settings" className="hidden tablet:hidden md:flex bg-transparent border-none text-gray-500 text-xl p-3 rounded-full cursor-pointer transition-all duration-200 items-center justify-center hover:bg-gray-100 hover:text-gray-700"><FaCog /></Link>
          <div className="relative" ref={dropdownRef}>
            <button className="bg-gray-100 border-none text-gray-500 text-lg rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center no-underline p-3 hover:bg-gray-200 hover:text-gray-700 tablet:p-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}><FaUserCircle className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-400" /></button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-2 min-w-[180px] overflow-hidden tablet:min-w-[200px] xs:min-w-[180px] xs:-right-2.5">
                <button className="flex tablet:flex md:hidden items-center gap-3 py-3 px-4 w-full bg-transparent border-none text-gray-700 text-sm cursor-pointer transition-all duration-200 no-underline text-left hover:bg-gray-100 hover:text-gray-900" onClick={() => { console.log("Notifications clicked"); setIsDropdownOpen(false); }}><FaBell className="text-sm text-gray-500" /> Notifications</button>
                <Link href="/dashboard/settings" className="flex tablet:flex md:hidden items-center gap-3 py-3 px-4 w-full bg-transparent border-none text-gray-700 text-sm cursor-pointer transition-all duration-200 no-underline text-left hover:bg-gray-100 hover:text-gray-900" onClick={() => setIsDropdownOpen(false)}><FaCog className="text-sm text-gray-500" /> Settings</Link>
                <Link href="/dashboard/saved-jobs" className="flex items-center gap-3 py-3 px-4 w-full bg-transparent border-none text-gray-700 text-sm cursor-pointer transition-all duration-200 no-underline text-left hover:bg-gray-100 hover:text-gray-900" onClick={() => setIsDropdownOpen(false)}><FaBookmark className="text-sm text-gray-500" /> Saved Jobs</Link>
                <button className="flex items-center gap-3 py-3 px-4 w-full bg-transparent border-none text-gray-700 text-sm cursor-pointer transition-all duration-200 no-underline text-left hover:bg-gray-100 hover:text-gray-900" onClick={handleLogout}><FaSignOutAlt className="text-sm text-gray-500" /> Logout</button>
              </div>
            )}
          </div>
          <div className="relative hidden tablet:block" ref={mobileMenuRef}>
            <button className="bg-transparent border-none text-gray-500 text-xl p-3 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-gray-100 hover:text-gray-700 tablet:text-base tablet:p-2 xs:p-1.5 xs:text-[15px]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? <FaTimes /> : <FaBars />}</button>
            {isMobileMenuOpen && (
              <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-[60] mt-2 min-w-[160px] overflow-hidden xs:min-w-[140px] xs:-right-2.5">
                {navLinks.map((link) => <Link key={link.href} href={link.href} className={clsx("flex items-center gap-3 py-3.5 px-4 text-gray-700 no-underline text-[15px] font-medium transition-all duration-200 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 hover:text-gray-900 xs:py-3 xs:px-3.5 xs:text-sm xs:gap-2.5", pathname === link.href && "bg-red-50 text-primary font-semibold")} onClick={() => setIsMobileMenuOpen(false)}>{link.icon}{link.name}</Link>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
