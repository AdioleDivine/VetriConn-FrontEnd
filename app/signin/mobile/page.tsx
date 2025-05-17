"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "../../page.module.css";
import MobileSignIn from "@/components/pages/auth/MobileSignIn";

export default function MobileSignInPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    function checkDesktop() {
      const isDesktop = window.innerWidth > 768;
      if (isDesktop && pathname === "/signin/mobile") {
        router.replace("/signin");
      }
    }

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    setChecked(true);

    return () => window.removeEventListener("resize", checkDesktop);
  }, [pathname, router]);

  if (!checked) return null;

  return (
    <main className={styles.Container}>
      <MobileSignIn />
    </main>
  );
}
