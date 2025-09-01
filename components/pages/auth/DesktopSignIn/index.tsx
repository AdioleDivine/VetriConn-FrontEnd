"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import DottedBox7 from "@/public/images/dotted_box_7.svg";
import DottedBox9 from "@/public/images/dotted_box_9.svg";
import DottedBox4 from "@/public/images/dotted_box_4.svg";
import DottedBox3 from "@/public/images/dotted_box_3.svg";
import { signInSchema, type SignInFormData } from "@/lib/validation";
import { useToaster } from "@/components/ui/Toaster";

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

      // Show success toast
      showToast({
        type: "success",
        title: "Login successful",
        description: "You will be redirected shortly",
      });

      // Simulate API call delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      if (error instanceof Error && "issues" in error) {
        const zodError = error as any;
        const errorMessages: Record<string, string> = {};
        zodError.issues?.forEach((err: any) => {
          if (err.path && err.path.length > 0) {
            errorMessages[err.path[0]] = err.message;
          }
        });
        setErrors(errorMessages);

        // Show error toast for validation failures
        showToast({
          type: "error",
          title: "Validation Error",
          description: "Please fix the errors below and try again",
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
