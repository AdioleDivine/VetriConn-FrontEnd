"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DesktopSignUp } from "@/components/pages/auth/DesktopSignUp";

export default function SignUp() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [checked, setChecked] = useState(false); // To avoid rendering before checking

  useEffect(() => {
    function checkMobile() {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // If mobile but not on /signup/mobile => redirect
      if (mobile && pathname !== "/signup/mobile") {
        router.replace("/signup/mobile");
      }
      // If desktop and on /signup/mobile => redirect to desktop
      else if (!mobile && pathname === "/signup/mobile") {
        router.replace("/signup");
      }
    }

    checkMobile();

    window.addEventListener("resize", checkMobile);

    // Mark that check is done so we can render UI
    setChecked(true);

    return () => window.removeEventListener("resize", checkMobile);
  }, [pathname, router]);

  // While checking or redirecting, render nothing to prevent flicker
  if (!checked || (isMobile && pathname !== "/signup/mobile") || (!isMobile && pathname === "/signup/mobile")) {
    return null;
  }

  // Render desktop signup only on desktop path
  if (pathname === "/signup") {
    return (
      <main className="max-w-[1920px] min-w-[320px] mx-auto overflow-x-hidden">
        <DesktopSignUp />
      </main>
    );
  }

  // For any other paths, just render nothing (or customize as needed)
  return null;
}
