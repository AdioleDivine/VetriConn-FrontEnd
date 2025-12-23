"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import DottedBox7 from "@/public/images/dotted_box_7.svg";
import DottedBox9 from "@/public/images/dotted_box_9.svg";
import DottedBox4 from "@/public/images/dotted_box_4.svg";
import DottedBox3 from "@/public/images/dotted_box_3.svg";
import { signInSchema } from "@/lib/validation";
import { useToaster } from "@/components/ui/Toaster";
import { ZodError, ZodIssue } from "zod";
import { loginUser, storeAuthToken } from "@/lib/api";

export const DesktopSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { showToast } = useToaster();
  const isButtonDisabled = isSubmitting || !email.trim() || !password.trim() || !terms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    try {
      signInSchema.parse({ email, password, terms });
      const response = await loginUser(email, password);
      if (response.success && response.data) {
        storeAuthToken(response.data.token);
        showToast({ type: "success", title: "Login successful", description: "Welcome back! Redirecting to dashboard..." });
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        throw new Error(response.error || "Login failed");
      }
    } catch (error) {
      if (error instanceof Error && "issues" in error) {
        const zodError = error as ZodError;
        const errorMessages: Record<string, string> = {};
        zodError.issues?.forEach((err: ZodIssue) => {
          if (err.path?.length > 0) errorMessages[String(err.path[0])] = err.message;
        });
        setErrors(errorMessages);
        showToast({ type: "error", title: "Validation Error", description: "Please fix the errors and try again" });
      } else {
        const errorMessage = error instanceof Error ? error.message : "Login failed";
        showToast({ type: "error", title: "Login Failed", description: errorMessage });
        if (errorMessage.toLowerCase().includes("invalid") || errorMessage.toLowerCase().includes("incorrect")) setPassword("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen font-open-sans">
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-8 text-left bg-[linear-gradient(70deg,rgba(0,0,0,0.6),rgba(0,0,0,0.3)),url('/images/Hero/1.svg')] bg-right bg-cover">
        <DottedBox9 className="absolute top-[15rem] left-[13rem] w-[120px] h-auto z-0 opacity-60" />
        <h1 className="font-lato text-heading-2 mb-4 text-white text-[2.5rem] font-semibold leading-tight">Join the <br /> <span className="text-primary">VetriConn</span> community</h1>
        <DottedBox7 className="absolute top-[15rem] left-[24rem] w-[120px] h-auto z-0 opacity-60" />
      </div>
      <div className="flex-1 flex items-center justify-center p-16 bg-white">
        <DottedBox4 className="absolute top-8 left-[72rem] h-auto z-0 opacity-60" />
        <div className="w-full max-w-[500px]">
          <h2 className="text-3xl mb-4">Sign In</h2>
          <p className="text-sm mb-4"><b>Don&apos;t have an account? <a href="/signup" className="text-primary no-underline font-bold">Sign up</a></b></p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-sm text-text-muted mb-1 font-medium">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={clsx("block w-full py-3 px-3 mb-4 border border-gray-300 rounded-[10px] text-base outline-none focus:border-primary", errors.email && "border-primary", email.trim() && !errors.email && "border-primary")} />
            {errors.email && <span className="text-primary text-sm -mt-3 mb-4 block">{errors.email}</span>}
            <label htmlFor="password" className="block text-sm text-text-muted mb-1 font-medium">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={clsx("block w-full py-3 px-3 mb-4 border border-gray-300 rounded-[10px] text-base outline-none focus:border-primary", errors.password && "border-primary", password.trim() && !errors.password && "border-primary")} />
            {errors.password && <span className="text-primary text-sm -mt-3 mb-4 block">{errors.password}</span>}
            <div className="flex items-start gap-2 text-sm mb-6">
              <input type="checkbox" id="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="appearance-none w-5 h-5 border-2 border-primary rounded cursor-pointer relative checked:before:content-[''] checked:before:absolute checked:before:top-0.5 checked:before:left-1 checked:before:w-1 checked:before:h-2 checked:before:border-primary checked:before:border-r-2 checked:before:border-b-2 checked:before:rotate-45" />
              <label htmlFor="terms">I agree to the <a href="#" className="text-primary no-underline">Terms of Service</a> and <a href="#" className="text-primary no-underline">Privacy Policy</a></label>
            </div>
            {errors.terms && <span className="text-primary text-sm -mt-3 mb-4 block">{errors.terms}</span>}
            <button type="submit" className="bg-primary text-white py-3 px-7 border-none rounded-[10px] font-bold text-sm cursor-pointer transition-colors ml-auto mt-2 inline-block hover:bg-red-700 disabled:bg-gray-300 disabled:text-text-muted disabled:cursor-not-allowed" disabled={isButtonDisabled}>{isSubmitting ? "Signing In..." : "Sign In"}</button>
          </form>
        </div>
        <DottedBox3 className="absolute top-[40rem] left-[74rem] h-auto z-0 opacity-60" />
      </div>
    </div>
  );
};
