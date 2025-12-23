"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from "clsx";
import DottedBox7 from "@/public/images/dotted_box_7.svg";
import DottedBox4 from "@/public/images/dotted_box_4.svg";
import DottedBox3 from "@/public/images/dotted_box_3.svg";
import { signupUser, storeAuthToken } from "@/lib/api";
import { useToaster } from "@/components/ui/Toaster";

export const MobileSignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToaster();
  const [role] = useState<string | null>("jobseeker");
  const [step, setStep] = useState<"role" | "form">("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [promotionalEmails, setPromotionalEmails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const promotionalParam = searchParams.get("promotional_emails");
    if (emailParam) setEmail(emailParam);
    if (promotionalParam === "true") setPromotionalEmails(true);
    if (emailParam || promotionalParam) window.history.replaceState({}, "", window.location.pathname);
  }, [searchParams]);

  const handleLogin = () => router.push("/signin/mobile");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!terms) newErrors.terms = "You must agree to the terms";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await signupUser({ firstName, lastName, email, password, role: role || "jobseeker", promotionalEmails });
      if (response.success && response.data) {
        storeAuthToken(response.data.token);
        showToast({ type: "success", title: "Account creation successful", description: "Welcome to VetriConn! Redirecting to dashboard..." });
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        throw new Error(response.message || "Account creation failed");
      }
    } catch (error) {
      showToast({ type: "error", title: "Account Creation Failed", description: error instanceof Error ? error.message : "Account creation failed" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-full box-border font-open-sans md:max-w-[400px] md:mx-auto">
      <button className="absolute top-9 right-4 left-auto bg-primary text-white border-none rounded-[20px] py-2.5 px-5 text-sm font-medium cursor-pointer z-10 transition-colors hover:bg-primary-hover" onClick={handleLogin}>Login</button>
      <DottedBox7 className="absolute top-32 left-80 w-[120px] h-auto z-0 opacity-60" />
      {step === "role" ? (
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold mt-[120px] mb-0 text-black text-left">Get Started</h1>
          <p className="text-base text-text-muted text-left m-0 mb-4">Start by choosing your role.</p>
          <div className="flex flex-col gap-4">
            <div className="border border-gray-200 rounded-xl py-14 px-9 cursor-pointer transition-all border-primary bg-red-50">
              <h2 className="text-base font-semibold m-0 mb-2 text-black">I am seeking a job</h2>
              <p className="text-sm text-text-muted m-0 leading-relaxed">sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="border border-gray-200 rounded-xl py-14 px-9 cursor-not-allowed transition-all bg-gray-100 opacity-60">
              <h2 className="text-base font-semibold m-0 mb-2 text-gray-400">I am an employer</h2>
              <p className="text-sm text-gray-400 m-0 leading-relaxed">Coming soon - We&apos;re preparing this feature for employers.</p>
            </div>
          </div>
          <div className="h-px bg-gray-200 w-full" />
          <button className="bg-primary text-white border-none rounded-lg py-4 px-8 text-base font-semibold cursor-pointer w-full transition-colors hover:bg-primary-hover disabled:bg-gray-200 disabled:cursor-not-allowed" onClick={() => setStep("form")} disabled={!role}>Continue</button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold mt-[120px] mb-0 text-black text-left">Sign Up</h1>
          <p className="text-base text-text-muted text-left m-0 mb-4">Let&apos;s get you started</p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-muted font-semibold">First name</label>
              <input type="text" className={clsx("py-3 px-4 border border-gray-200 rounded-lg text-base outline-none transition-colors focus:border-primary", errors.firstName && "border-red-500")} value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={isSubmitting} />
              {errors.firstName && <span className="text-red-500 text-xs mt-1">{errors.firstName}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-muted font-semibold">Last name</label>
              <input type="text" className={clsx("py-3 px-4 border border-gray-200 rounded-lg text-base outline-none transition-colors focus:border-primary", errors.lastName && "border-red-500")} value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isSubmitting} />
              {errors.lastName && <span className="text-red-500 text-xs mt-1">{errors.lastName}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-muted font-semibold">Email</label>
              <input type="email" className={clsx("py-3 px-4 border border-gray-200 rounded-lg text-base outline-none transition-colors focus:border-primary", errors.email && "border-red-500")} value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} />
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-text-muted font-semibold">Password</label>
              <input type="password" className={clsx("py-3 px-4 border border-gray-200 rounded-lg text-base outline-none transition-colors focus:border-primary", errors.password && "border-red-500")} value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} />
              {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
            </div>
            <div className="flex items-start gap-2 text-sm mb-6">
              <input type="checkbox" id="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} disabled={isSubmitting} className="appearance-none w-5 h-5 border-2 border-primary rounded cursor-pointer relative checked:before:content-[''] checked:before:absolute checked:before:top-0.5 checked:before:left-1 checked:before:w-1 checked:before:h-2 checked:before:border-primary checked:before:border-r-2 checked:before:border-b-2 checked:before:rotate-45" />
              <label htmlFor="terms">I agree to the <a href="#" className="text-primary no-underline">Terms of Service</a> and <a href="#" className="text-primary no-underline">Privacy Policy</a></label>
            </div>
            {errors.terms && <span className="text-red-500 text-xs -mt-4 mb-2">{errors.terms}</span>}
            <div className="flex items-start gap-2 text-sm mb-6">
              <input type="checkbox" id="promotional-emails" checked={promotionalEmails} onChange={(e) => setPromotionalEmails(e.target.checked)} disabled={isSubmitting} className="appearance-none w-5 h-5 border-2 border-primary rounded cursor-pointer relative checked:before:content-[''] checked:before:absolute checked:before:top-0.5 checked:before:left-1 checked:before:w-1 checked:before:h-2 checked:before:border-primary checked:before:border-r-2 checked:before:border-b-2 checked:before:rotate-45" />
              <label htmlFor="promotional-emails">I would like to receive promotional emails from VetriConn Inc</label>
            </div>
            <button type="submit" className="bg-primary text-white border-none rounded-lg py-4 px-8 text-base font-semibold cursor-pointer w-full -mt-4 transition-colors hover:bg-primary-hover disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400" disabled={isSubmitting || !firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !terms}>{isSubmitting ? "Creating Account..." : "Sign Up"}</button>
          </form>
        </div>
      )}
      <DottedBox4 className="absolute top-[45rem] -left-8 h-auto z-0 opacity-60" />
      <DottedBox3 className="absolute top-[45rem] left-64 h-auto z-0 opacity-60" />
    </div>
  );
};
