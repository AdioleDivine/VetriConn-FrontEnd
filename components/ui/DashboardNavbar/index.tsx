"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./index.module.scss";
import { FaBell, FaCog, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/dashboard" },
  { name: "Community", href: "/dashboard/community" },
  { name: "Inbox", href: "/dashboard/inbox" },
  { name: "Profile", href: "/dashboard/profile" },
];

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [avatarError, setAvatarError] = useState(false);

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
          <button className={styles.iconButton}>
            <FaCog />
          </button>
          <Link
            href="/dashboard/profile"
            className={`${styles.profileButton} ${styles.withPadding}`}
          >
            <FaUserCircle className={styles.avatarFallbackIcon} size={32} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
