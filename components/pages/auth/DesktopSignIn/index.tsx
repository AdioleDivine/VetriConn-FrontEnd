"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import DottedBox7 from "@/public/images/dotted_box_7.svg";
import DottedBox9 from "@/public/images/dotted_box_9.svg";
import DottedBox4 from "@/public/images/dotted_box_4.svg";
import DottedBox3 from "@/public/images/dotted_box_3.svg";
import { signInSchema } from "@/lib/validation";
import { useToaster } from "@/components/ui/Toaster";
import { ZodError, ZodIssue } from "zod";
import { loginUser, storeAuthToken } from "@/lib/api";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { showToast } = useToaster();

  // Check if required fields are empty
  const isButtonDisabled =
    isSubmitting || !email.trim() || !password.trim() || !terms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = {
      email,
      password,
      terms,
    };

    try {
      // Validate form data
      signInSchema.parse(formData);

      console.log('Attempting login for:', email);
      
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
      console.error('Login error details:', error);
      
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
          description: "Please fix the errors and try again",
        });
      } else {
        // Handle API errors
        const errorMessage = error instanceof Error ? error.message : "Login failed";
        
        let description = errorMessage;
        
        // Provide more helpful error messages for common issues
        if (errorMessage.includes('fetch')) {
          description = "Unable to connect to server. Please check if the backend is running on localhost:5000";
        } else if (errorMessage.includes('NetworkError') || errorMessage.includes('Failed to fetch')) {
          description = "Network error. Please check your connection and ensure the backend server is running.";
        }
        
        showToast({
          type: "error",
          title: "Login Failed",
          description: description,
        });

        // If it's an authentication error, clear the form
        if (errorMessage.toLowerCase().includes('invalid') || 
            errorMessage.toLowerCase().includes('incorrect') ||
            errorMessage.toLowerCase().includes('not found')) {
          setPassword("");
        }
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
          <h2>Sign In</h2>
          <p>
            <b>
              Don&apos;t have an account? <a href="/signup">Sign up</a>
            </b>
          </p>

          <form onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className={styles.button}
              disabled={isButtonDisabled}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
        <DottedBox3 className={styles.dottedBox3} />
      </div>
    </div>
  );
}
