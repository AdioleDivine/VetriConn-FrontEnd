"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import DottedBox7 from "@/public/images/dotted_box_7.svg";
import DottedBox4 from "@/public/images/dotted_box_4.svg";
import DottedBox3 from "@/public/images/dotted_box_3.svg";
import { signupUser, storeAuthToken } from "@/lib/api";
import { useToaster } from "@/components/ui/Toaster";

export default function MobileSignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToaster();

  const [role, setRole] = useState<string | null>("jobseeker");
  const [step, setStep] = useState<"role" | "form">("form"); // Skip role selection, go directly to form

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [promotionalEmails, setPromotionalEmails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle query params on component mount
  useEffect(() => {
    const emailParam = searchParams.get("email");
    const promotionalParam = searchParams.get("promotional_emails");

    if (emailParam || promotionalParam) {
      if (emailParam) {
        setEmail(emailParam);
      }

      if (promotionalParam === "true") {
        setPromotionalEmails(true);
      }

      // Remove query parameters from URL after processing
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams]);

  const handleContinue = () => {
    if (role) setStep("form");
  };

  const handleLogin = () => {
    router.push("/signin/mobile");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!terms) newErrors.terms = "You must agree to the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Attempting mobile signup for:", email, "with role:", role);

      // Call the signup API
      const response = await signupUser({
        firstName,
        lastName,
        email,
        password,
        role: role || "jobseeker",
        promotionalEmails,
      });

      if (response.success && response.data) {
        // Store the authentication token
        storeAuthToken(response.data.token);

        // Show success toast
        showToast({
          type: "success",
          title: "Account creation successful",
          description: "Welcome to VetriConn! Redirecting to dashboard...",
        });

        // Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        throw new Error(response.message || "Account creation failed");
      }
    } catch (error) {
      console.error("Mobile signup error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Account creation failed";

      let description = errorMessage;
      if (errorMessage.includes("fetch")) {
        description =
          "Unable to connect to server. Please check if the backend is running.";
      } else if (
        errorMessage.includes("already exists") ||
        errorMessage.includes("duplicate")
      ) {
        description =
          "An account with this email already exists. Please try signing in instead.";
      }

      showToast({
        type: "error",
        title: "Account Creation Failed",
        description: description,
      });
    } finally {
      setIsSubmitting(false);
    }
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
              className={`${styles.roleCard} ${styles.disabled}`}
              title="Coming soon"
            >
              <h2 className={styles.roleTitle}>I am an employer</h2>
              <p className={styles.roleDescription}>
                Coming soon - We&apos;re preparing this feature for employers.
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
          <p className={styles.subtitle}>Let&apos;s get you started</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>First name</label>
              <input
                type="text"
                className={`${styles.input} ${
                  errors.firstName ? styles.inputError : ""
                }`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <span className={styles.error}>{errors.firstName}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Last name</label>
              <input
                type="text"
                className={`${styles.input} ${
                  errors.lastName ? styles.inputError : ""
                }`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <span className={styles.error}>{errors.lastName}</span>
              )}
            </div>

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

            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="terms"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                disabled={isSubmitting}
              />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
              {errors.terms && (
                <span className={styles.error}>{errors.terms}</span>
              )}
            </div>

            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="promotional-emails"
                checked={promotionalEmails}
                onChange={(e) => setPromotionalEmails(e.target.checked)}
                disabled={isSubmitting}
              />
              <label htmlFor="promotional-emails">
                I would like to receive promotional emails from VetriConn Inc
              </label>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={
                isSubmitting ||
                !firstName.trim() ||
                !lastName.trim() ||
                !email.trim() ||
                !password.trim() ||
                !terms
              }
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
        </div>
      )}
      <DottedBox4 className={styles.dottedBox4} />
      <DottedBox3 className={styles.dottedBox3} />
    </div>
  );
}
