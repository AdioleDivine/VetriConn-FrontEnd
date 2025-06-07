"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./index.module.scss";
import DottedBox7 from "@/public/images/dotted_box_7.svg";
import DottedBox4 from "@/public/images/dotted_box_4.svg";
import DottedBox3 from "@/public/images/dotted_box_3.svg";

export default function MobileSignUp() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [step, setStep] = useState<"role" | "form">("role");

  const handleContinue = () => {
    if (role) setStep("form");
  };

  const handleLogin = () => {
    router.push("/signin/mobile");
    console.log("Login clicked");
  };

  return (
    <div className={styles.container}>
      <button className={styles.loginButton} onClick={handleLogin}>
        Login
      </button>
      <DottedBox7 className={styles.dottedBox7} />

      {step === "role" ? (
        <div className={styles.roleSelection}>
          <h1 className={styles.title}>Get Started</h1>
          <p className={styles.subtitle}>Start by choosing your role.</p>

          <div className={styles.roleCards}>
            <div
              className={`${styles.roleCard} ${
                role === "jobseeker" ? styles.active : ""
              }`}
              onClick={() => setRole("jobseeker")}
            >
              <h2 className={styles.roleTitle}>I am seeking a job</h2>
              <p className={styles.roleDescription}>
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </p>
            </div>

            <div
              className={`${styles.roleCard} ${
                role === "employer" ? styles.active : ""
              }`}
              onClick={() => setRole("employer")}
            >
              <h2 className={styles.roleTitle}>I am an employer</h2>
              <p className={styles.roleDescription}>
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </p>
            </div>
          </div>

          <div className={styles.divider} />

          <button
            className={styles.continueButton}
            onClick={handleContinue}
            disabled={!role}
          >
            Continue
          </button>

          <div className={styles.divider} />
        </div>
      ) : (
        <div className={styles.signupForm}>
          <h1 className={styles.title}>Sign Up</h1>
          <p className={styles.subtitle}>Let's get you started</p>

          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>First name</label>
              <input type="text" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Last name</label>
              <input type="text" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input type="email" className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Password</label>
              <input type="password" className={styles.input} />
            </div>

            <div className={styles.checkbox}>
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>
          </form>
        </div>
      )}
      <DottedBox4 className={styles.dottedBox4} />
      <DottedBox3 className={styles.dottedBox3} />
    </div>
  );
}
