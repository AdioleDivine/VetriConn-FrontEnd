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
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
} from "react-icons/fa";
import Image from "next/image";
import { logoutUser } from "@/lib/api";
import { useToaster } from "@/components/ui/Toaster";

interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <FaHome className={styles.navIcon} />,
  },
  // { name: "Community", href: "/dashboard/community", icon: <FaUsers /> },
  // { name: "Inbox", href: "/dashboard/inbox", icon: <FaInbox /> },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: <FaUser className={styles.navIcon} />,
  },
];

const DashboardNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToaster();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
        </div>

        {/* Desktop Navigation Links */}
        <div className={`${styles.navLinks} ${styles.desktopOnly}`}>
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

        {/* Right Side - Profile, Settings, Notifications, Mobile Menu */}
        <div className={styles.rightSection}>
          <button className={`${styles.iconButton} ${styles.desktopOnly}`}>
            <FaBell />
          </button>
          <Link
            href="/dashboard/settings"
            className={`${styles.iconButton} ${styles.desktopOnly}`}
          >
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
                <button
                  className={`${styles.dropdownItem} ${styles.mobileOnly}`}
                  onClick={() => {
                    // Handle notifications click - you can add notification logic here
                    console.log("Notifications clicked");
                    setIsDropdownOpen(false);
                  }}
                >
                  <FaBell className={styles.dropdownIcon} />
                  Notifications
                </button>
                <Link
                  href="/dashboard/settings"
                  className={`${styles.dropdownItem} ${styles.mobileOnly}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaCog className={styles.dropdownIcon} />
                  Settings
                </Link>
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

          {/* Mobile Menu Button - positioned to the right of avatar */}
          <div
            className={`${styles.mobileMenuContainer} ${styles.mobileOnly}`}
            ref={mobileMenuRef}
          >
            <button
              className={styles.mobileMenuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className={styles.mobileMenu}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.mobileNavLink} ${
                      pathname === link.href ? styles.active : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
