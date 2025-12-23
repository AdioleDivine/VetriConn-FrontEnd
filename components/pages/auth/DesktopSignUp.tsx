"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import DottedBox7 from "@/public/images/dotted_box_7.svg";
import DottedBox9 from "@/public/images/dotted_box_9.svg";
import DottedBox4 from "@/public/images/dotted_box_4.svg";
import DottedBox3 from "@/public/images/dotted_box_3.svg";
import { signUpSchema, type SignUpFormData } from "@/lib/validation";
import { useToaster } from "@/components/ui/Toaster";
import { ZodError, ZodIssue } from "zod";
import { signupUser, storeAuthToken } from "@/lib/api";

export const DesktopSignUp = () => {
  const [role, setRole] = useState<"jobseeker" | "employer" | "">("jobseeker");
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

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const promotionalParam = searchParams.get("promotional_emails");
    if (emailParam) setEmail(emailParam);
    if (promotionalParam === "true") setPromotionalEmails(true);
    if (emailParam || promotionalParam) window.history.replaceState({}, "", window.location.pathname);
  }, [searchParams]);

  const isButtonDisabled = isSubmitting || !firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !role || !terms;
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
    const formData: SignUpFormData = { firstName, lastName, email, password, role, terms };
    try {
      signUpSchema.parse(formData);
      const response = await signupUser({ firstName, lastName, email, password, role, promotionalEmails });
      if (response.success && response.data) {
        storeAuthToken(response.data.token);
        showToast({ type: "success", title: "Account creation successful", description: "Welcome to VetriConn! Redirecting to dashboard..." });
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        throw new Error(response.message || "Account creation failed");
      }
    } catch (error) {
      if (error instanceof Error && "issues" in error) {
        const zodError = error as ZodError;
        const errorMessages: Record<string, string> = {};
        zodError.issues?.forEach((err: ZodIssue) => {
          if (err.path?.length > 0) errorMessages[String(err.path[0])] = err.message;
        });
        setErrors(errorMessages);
        showToast({ type: "error", title: "Validation Error", description: "Please fix the errors below and try again" });
      } else {
        showToast({ type: "error", title: "Account Creation Failed", description: error instanceof Error ? error.message : "Account creation failed" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen font-open-sans">
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-8 text-left bg-[linear-gradient(70deg,rgba(0,0,0,0.6),rgba(0,0,0,0.3)),url('/images/Hero/1.svg')] bg-left bg-cover">
        <DottedBox9 className="absolute top-[40rem] left-[13rem] w-[120px] h-auto z-0 opacity-60" />
        <h1 className="font-lato text-heading-2 mb-4 text-white text-[2.5rem] font-semibold leading-tight">Join the <br /> <span className="text-primary">VetriConn</span> community</h1>
        <DottedBox7 className="absolute top-[15rem] left-[24rem] w-[120px] h-auto z-0 opacity-60" />
      </div>
      <div className="flex-1 flex items-center justify-center p-16 bg-white">
        <DottedBox4 className="absolute top-8 left-[72rem] h-auto z-0 opacity-60" />
        <div className="w-full max-w-[500px]">
          <h2 className="text-3xl mb-4">Sign up</h2>
          <p className="text-sm mb-4"><b>Already have an account? <a href="/signin" className="text-primary no-underline font-bold">Sign in</a></b></p>
          <p className="font-semibold mt-4 mb-2">Who are you?</p>
          <div className="flex gap-4 mb-6">
            <label className={clsx("flex items-center gap-2 border-2 border-gray-300 bg-white py-4 px-4 rounded-[10px] cursor-pointer font-semibold text-sm text-gray-700 transition-all w-full hover:border-primary", role === "jobseeker" && "border-primary bg-red-50 text-primary")}>
              <input type="radio" name="role" value="jobseeker" checked={role === "jobseeker"} onChange={() => setRole("jobseeker")} className="accent-primary w-3.5 h-3.5 cursor-pointer" />
              <span className="text-sm">Seeking a Job</span>
            </label>
            <label className="flex items-center gap-2 border-2 border-gray-300 bg-gray-100 py-4 px-4 rounded-[10px] cursor-not-allowed font-semibold text-sm text-gray-400 transition-all w-full opacity-60" title="Coming soon">
              <input type="radio" name="role" value="employer" checked={false} disabled onChange={() => {}} className="accent-primary w-3.5 h-3.5 cursor-not-allowed" />
              <span className="text-sm">Employer (Coming Soon)</span>
            </label>
          </div>
          {errors.role && <span className="text-primary text-sm -mt-3 mb-4 block">{errors.role}</span>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="first-name" className="block text-sm text-text-muted mb-1 font-medium">First Name</label>
            <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={clsx("block w-full py-3 px-3 mb-4 border border-gray-300 rounded-[10px] text-base outline-none focus:border-primary", errors.firstName && "border-primary", firstName.trim() && !errors.firstName && "border-primary")} />
            {errors.firstName && <span className="text-primary text-sm -mt-3 mb-4 block">{errors.firstName}</span>}
            <label htmlFor="last-name" className="block text-sm text-text-muted mb-1 font-medium">Last Name</label>
            <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} className={clsx("block w-full py-3 px-3 mb-4 border border-gray-300 rounded-[10px] text-base outline-none focus:border-primary", errors.lastName && "border-primary", lastName.trim() && !errors.lastName && "border-primary")} />
            {errors.lastName && <span className="text-primary text-sm -mt-3 mb-4 block">{errors.lastName}</span>}
            <label htmlFor="email" className="block text-sm text-text-muted mb-1 font-medium">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={clsx("block w-full py-3 px-3 mb-4 border border-gray-300 rounded-[10px] text-base outline-none focus:border-primary", errors.email && "border-primary", email.trim() && !errors.email && "border-primary")} />
            {errors.email && <span className="text-primary text-sm -mt-3 mb-4 block">{errors.email}</span>}
            <label htmlFor="password" className="block text-sm text-text-muted mb-1 font-medium">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={clsx("block w-full py-3 px-3 mb-4 border border-gray-300 rounded-[10px] text-base outline-none focus:border-primary", errors.password && "border-primary", password.trim() && !errors.password && "border-primary")} />
            {errors.password && <span className="text-primary text-sm -mt-3 mb-4 block">{errors.password}</span>}
            <div className="-mt-2 mb-4 text-[0.65rem]">
              {[{ key: "hasMinLength", label: "At least 8 characters" }, { key: "hasSpecialChar", label: "At least one special character" }, { key: "hasUppercase", label: "At least one uppercase letter" }, { key: "hasLowercase", label: "At least one lowercase letter" }, { key: "hasNumber", label: "At least one number" }].map(({ key, label }) => (
                <div key={key} className={clsx("flex items-center gap-1 mb-0.5 text-gray-400 transition-colors", passwordRequirements[key as keyof typeof passwordRequirements] && "text-black")}>
                  <span className={clsx("flex items-center justify-center w-3 h-3 rounded-full bg-gray-300 text-gray-300 text-[8px] font-bold transition-all", passwordRequirements[key as keyof typeof passwordRequirements] && "bg-green-500/60 text-white")}>✓</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2 text-sm mb-6">
              <input type="checkbox" id="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="appearance-none w-5 h-5 border-2 border-primary rounded cursor-pointer relative checked:before:content-[''] checked:before:absolute checked:before:top-0.5 checked:before:left-1 checked:before:w-1 checked:before:h-2 checked:before:border-primary checked:before:border-r-2 checked:before:border-b-2 checked:before:rotate-45" />
              <label htmlFor="terms">I agree to the <a href="#" className="text-primary no-underline">Terms of Service</a> and <a href="#" className="text-primary no-underline">Privacy Policy</a></label>
            </div>
            {errors.terms && <span className="text-primary text-sm -mt-3 mb-4 block">{errors.terms}</span>}
            <div className="flex items-start gap-2 text-sm mb-6">
              <input type="checkbox" id="promotional-emails" checked={promotionalEmails} onChange={(e) => setPromotionalEmails(e.target.checked)} className="appearance-none w-5 h-5 border-2 border-primary rounded cursor-pointer relative checked:before:content-[''] checked:before:absolute checked:before:top-0.5 checked:before:left-1 checked:before:w-1 checked:before:h-2 checked:before:border-primary checked:before:border-r-2 checked:before:border-b-2 checked:before:rotate-45" />
              <label htmlFor="promotional-emails">I would like to receive promotional emails from VetriConn Inc</label>
            </div>
            <button type="submit" className="bg-primary text-white py-3 px-7 border-none rounded-[10px] font-bold text-sm cursor-pointer transition-colors ml-auto mt-2 inline-block hover:bg-red-700 disabled:bg-gray-300 disabled:text-text-muted disabled:cursor-not-allowed" disabled={isButtonDisabled}>{isSubmitting ? "Creating Account..." : "Create account"}</button>
          </form>
        </div>
        <DottedBox3 className="absolute top-[40rem] left-[74rem] h-auto z-0 opacity-60" />
      </div>
    </div>
  );
};
