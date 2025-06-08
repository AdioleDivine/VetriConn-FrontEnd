"use client";

import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import DottedBox7 from "@/public/images/dotted_box_7.svg";
import DottedBox4 from "@/public/images/dotted_box_4.svg";
import DottedBox3 from "@/public/images/dotted_box_3.svg";

export default function MobileSignIn() {
  const router = useRouter();
  const handleSignUp = () => {
    router.push("/signup/mobile");
    console.log("Signup clicked");
  };

  return (
    <div className={styles.container}>
      <button className={styles.signupButton} onClick={handleSignUp}>
        Sign Up
      </button>
      <DottedBox7 className={styles.dottedBox7} />

        <div className={styles.signinForm}>
          <h1 className={styles.title}>Let&apos;s Sign You In</h1>
          <p className={styles.subtitle}>Welcome back</p>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input type="email" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Password</label>
              <input type="password" className={styles.input} />
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign In
            </button>
          </form>
        </div>
      <DottedBox4 className={styles.dottedBox4} />
      <DottedBox3 className={styles.dottedBox3} />
    </div>
  );
}
