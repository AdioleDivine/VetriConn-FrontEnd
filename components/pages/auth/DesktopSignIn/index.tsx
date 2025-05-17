"use client";

import { useState } from "react";
import styles from "./index.module.scss";
import DottedBox7 from "@/public/images/dotted_box_7.svg";
import DottedBox9 from "@/public/images/dotted_box_9.svg";
import DottedBox4 from "@/public/images/dotted_box_4.svg";
import DottedBox3 from "@/public/images/dotted_box_3.svg";

export default function SignIn() {
  const [role, setRole] = useState("jobseeker");

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <DottedBox9 className={styles.dottedBox9} />
        <h1>
          Join the <br /> <span>VetriConn</span> community
        </h1>
        <DottedBox7 className={styles.dottedBox7} />
      </div>

      <div className={styles.right}>
        <DottedBox4 className={styles.dottedBox4} />
        <div className={styles.formBox}>
          <h2>Sign In</h2>
          <p>
            <b>
              Don't have an account? <a href="/signup">Sign up</a>
            </b>
          </p>
          <p className={styles.roleText}>Who are you?</p>

          <div className={styles.roleButtons}>
            <label
              className={`${styles.roleButton} ${
                role === "jobseeker" ? styles.active : ""
              }`}
            >
              <input
                type="radio"
                name="role"
                value="jobseeker"
                checked={role === "jobseeker"}
                onChange={() => setRole("jobseeker")}
              />
              <span>Seeking a Job</span>
            </label>

            <label
              className={`${styles.roleButton} ${
                role === "employer" ? styles.active : ""
              }`}
            >
              <input
                type="radio"
                name="role"
                value="employer"
                checked={role === "employer"}
                onChange={() => setRole("employer")}
              />
              <span>Employer</span>
            </label>
          </div>

          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              // placeholder="Email"
              className={styles.input}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              // placeholder="Password"
              className={styles.input}
              id="password"
            />

            <div className={styles.checkbox}>
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className={styles.button}>
              Sign In
            </button>
          </form>
        </div>
        <DottedBox3 className={styles.dottedBox3} />
      </div>
    </div>
  );
}
