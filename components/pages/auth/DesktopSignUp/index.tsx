"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./index.module.scss";
import DottedBox7 from "@/public/images/dotted_box_7.svg";
import DottedBox9 from "@/public/images/dotted_box_9.svg";
import DottedBox4 from "@/public/images/dotted_box_4.svg";
import DottedBox3 from "@/public/images/dotted_box_3.svg";
import { signUpSchema, type SignUpFormData } from "@/lib/validation";
import { useToaster } from "@/components/ui/Toaster";
import { ZodError, ZodIssue } from "zod";
import { signupUser, storeAuthToken } from "@/lib/api";

export default function SignUp() {
  const [role, setRole] = useState<"jobseeker" | "employer" | "">("jobseeker"); // Default to jobseeker
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [promotionalEmails, setPromotionalEmails] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToaster();

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

  // Check if required fields are empty (all fields are required for signup)
  const isButtonDisabled =
    isSubmitting ||
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !password.trim() ||
    !role ||
    !terms;

  // Password requirement checks
  const passwordRequirements = {
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasMinLength: password.length >= 8,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData: SignUpFormData = {
      firstName,
      lastName,
      email,
      password,
      role,
      terms,
    };

    try {
      // Validate form data
      signUpSchema.parse(formData);

      console.log("Attempting signup for:", email, "with role:", role);

      // Call the signup API
      const response = await signupUser({
        firstName,
        lastName,
        email,
        password,
        role,
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
      console.error("Signup error details:", error);

      if (error instanceof Error && "issues" in error) {
        // Handle validation errors
        const zodError = error as ZodError;
        const errorMessages: Record<string, string> = {};
        zodError.issues?.forEach((err: ZodIssue) => {
          if (err.path && err.path.length > 0) {
            const fieldName = String(err.path[0]);
            errorMessages[fieldName] = err.message;
          }
        });
        setErrors(errorMessages);

        // Show error toast for validation failures
        showToast({
          type: "error",
          title: "Validation Error",
          description: "Please fix the errors below and try again",
        });
      } else {
        // Handle API errors
        const errorMessage =
          error instanceof Error ? error.message : "Account creation failed";

        let description = errorMessage;

        // Provide more helpful error messages for common issues
        if (errorMessage.includes("fetch")) {
          description =
            "Unable to connect to server. Please check if the backend is running on localhost:5000";
        } else if (
          errorMessage.includes("NetworkError") ||
          errorMessage.includes("Failed to fetch")
        ) {
          description =
            "Network error. Please check your connection and ensure the backend server is running.";
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
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h2>Sign up</h2>
          <p>
            <b>
              Already have an account? <a href="/signin">Sign in</a>
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
              className={`${styles.roleButton} ${styles.disabled}`}
              title="Coming soon"
            >
              <input
                type="radio"
                name="role"
                value="employer"
                checked={false}
                disabled={true}
                onChange={() => {}}
              />
              <span>Employer (Coming Soon)</span>
            </label>
          </div>
          {errors.role && <span className={styles.error}>{errors.role}</span>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`${styles.input} ${
                errors.firstName
                  ? styles.inputError
                  : firstName.trim()
                  ? styles.inputFilled
                  : ""
              }`}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}

            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`${styles.input} ${
                errors.lastName
                  ? styles.inputError
                  : lastName.trim()
                  ? styles.inputFilled
                  : ""
              }`}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName}</span>
            )}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} ${
                errors.email
                  ? styles.inputError
                  : email.trim()
                  ? styles.inputFilled
                  : ""
              }`}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.input} ${
                errors.password
                  ? styles.inputError
                  : password.trim()
                  ? styles.inputFilled
                  : ""
              }`}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}

            <div className={styles.passwordRequirements}>
              <div
                className={`${styles.requirement} ${
                  passwordRequirements.hasMinLength ? styles.satisfied : ""
                }`}
              >
                <span className={styles.checkmark}>✓</span>
                <span>At least 8 characters</span>
              </div>
              <div
                className={`${styles.requirement} ${
                  passwordRequirements.hasSpecialChar ? styles.satisfied : ""
                }`}
              >
                <span className={styles.checkmark}>✓</span>
                <span>At least one special character</span>
              </div>
              <div
                className={`${styles.requirement} ${
                  passwordRequirements.hasUppercase ? styles.satisfied : ""
                }`}
              >
                <span className={styles.checkmark}>✓</span>
                <span>At least one uppercase letter</span>
              </div>
              <div
                className={`${styles.requirement} ${
                  passwordRequirements.hasLowercase ? styles.satisfied : ""
                }`}
              >
                <span className={styles.checkmark}>✓</span>
                <span>At least one lowercase letter</span>
              </div>
              <div
                className={`${styles.requirement} ${
                  passwordRequirements.hasNumber ? styles.satisfied : ""
                }`}
              >
                <span className={styles.checkmark}>✓</span>
                <span>At least one number</span>
              </div>
            </div>

            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="terms"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>
            {errors.terms && (
              <span className={styles.error}>{errors.terms}</span>
            )}

            <div className={styles.checkbox}>
              <input
                type="checkbox"
                id="promotional-emails"
                checked={promotionalEmails}
                onChange={(e) => setPromotionalEmails(e.target.checked)}
              />
              <label htmlFor="promotional-emails">
                I would like to receive promotional emails from VetriConn Inc
              </label>
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={isButtonDisabled}
            >
              {isSubmitting ? "Creating Account..." : "Create account"}
            </button>
          </form>
        </div>
        <DottedBox3 className={styles.dottedBox3} />
      </div>
    </div>
  );
}
