"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "../page.module.css";
import DesktopSignIn from "@/components/pages/auth/DesktopSignIn";

export default function SignIn() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [checked, setChecked] = useState(false); // To avoid rendering before checking

  useEffect(() => {
    function checkMobile() {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // If mobile but not on /signin/mobile => redirect
      if (mobile && pathname !== "/signin/mobile") {
        router.replace("/signin/mobile");
      }
      // If desktop and on /signin/mobile => redirect to desktop
      else if (!mobile && pathname === "/signin/mobile") {
        router.replace("/signin");
      }
    }

    checkMobile();

    window.addEventListener("resize", checkMobile);

    // Mark that check is done so we can render UI
    setChecked(true);

    return () => window.removeEventListener("resize", checkMobile);
  }, [pathname, router]);

  // While checking or redirecting, render nothing to prevent flicker
  if (!checked || (isMobile && pathname !== "/signin/mobile") || (!isMobile && pathname === "/signin/mobile")) {
    return null;
  }

  // Render desktop signup only on desktop path
  if (pathname === "/signin") {
    return (
      <main className={styles.Container}>
        <DesktopSignIn />
      </main>
    );
  }

  // For any other paths, just render nothing (or customize as needed)
  return null;
}
