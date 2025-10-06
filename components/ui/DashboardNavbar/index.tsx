"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./index.module.scss";
import {
  FaBell,
  FaCog,
  FaUserCircle,
  FaBookmark,
  FaSignOutAlt,
} from "react-icons/fa";
import Image from "next/image";
import { logoutUser } from "@/lib/api";
import { useToaster } from "@/components/ui/Toaster";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/dashboard" },
  // { name: "Community", href: "/dashboard/community" },
  // { name: "Inbox", href: "/dashboard/inbox" },
  { name: "Profile", href: "/dashboard/profile" },
];

const DashboardNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToaster();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();

      showToast({
        type: "success",
        title: "Logged out successfully",
        description: "Redirecting to homepage...",
      });

      // Redirect to homepage after a brief delay
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Logout error:", error);

      showToast({
        type: "error",
        title: "Logout failed",
        description: "Please try again",
      });
    }

    setIsDropdownOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/dashboard">
            <Image
              src="/images/logo_1.svg"
              alt="VetriConn"
              width={180}
              height={60}
            />
          </Link>
        </div>{" "}
        {/* Navigation Links */}
        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.active : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* Right Side - Profile, Settings, Notifications */}
        <div className={styles.rightSection}>
          <button className={styles.iconButton}>
            <FaBell />
          </button>
          <Link href="/dashboard/settings" className={styles.iconButton}>
            <FaCog />
          </Link>
          <div className={styles.profileDropdown} ref={dropdownRef}>
            <button
              className={`${styles.profileButton} ${styles.withPadding}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle className={styles.avatarFallbackIcon} size={32} />
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link
                  href="/dashboard/saved-jobs"
                  className={styles.dropdownItem}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaBookmark className={styles.dropdownIcon} />
                  Saved Jobs
                </Link>
                <button className={styles.dropdownItem} onClick={handleLogout}>
                  <FaSignOutAlt className={styles.dropdownIcon} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
