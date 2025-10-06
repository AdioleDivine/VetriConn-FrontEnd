"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import DottedBox7 from "@/public/images/dotted_box_7.svg";
import DottedBox4 from "@/public/images/dotted_box_4.svg";
import DottedBox3 from "@/public/images/dotted_box_3.svg";
import { loginUser, storeAuthToken } from "@/lib/api";
import { useToaster } from "@/components/ui/Toaster";

export default function MobileSignIn() {
  const router = useRouter();
  const { showToast } = useToaster();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSignUp = () => {
    router.push("/signup/mobile");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Call the login API
      const response = await loginUser(email, password);

      if (response.success && response.data) {
        // Store the authentication token
        storeAuthToken(response.data.token);

        // Show success toast
        showToast({
          type: "success",
          title: "Login successful",
          description: "Welcome back! Redirecting to dashboard...",
        });

        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        throw new Error(response.error || "Login failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";

      showToast({
        type: "error",
        title: "Login Failed",
        description: errorMessage,
      });

      // If it's an authentication error, clear the password
      if (
        errorMessage.toLowerCase().includes("invalid") ||
        errorMessage.toLowerCase().includes("incorrect") ||
        errorMessage.toLowerCase().includes("not found")
      ) {
        setPassword("");
      }
    } finally {
      setIsSubmitting(false);
    }
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

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email</label>
            <input
              type="email"
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Password</label>
            <input
              type="password"
              className={`${styles.input} ${
                errors.password ? styles.inputError : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || !email.trim() || !password.trim()}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
      <DottedBox4 className={styles.dottedBox4} />
      <DottedBox3 className={styles.dottedBox3} />
    </div>
  );
}
