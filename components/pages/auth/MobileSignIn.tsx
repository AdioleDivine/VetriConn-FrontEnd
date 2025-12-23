"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import DottedBox7 from "@/public/images/dotted_box_7.svg";
import DottedBox4 from "@/public/images/dotted_box_4.svg";
import DottedBox3 from "@/public/images/dotted_box_3.svg";
import { loginUser, storeAuthToken } from "@/lib/api";
import { useToaster } from "@/components/ui/Toaster";

export const MobileSignIn = () => {
  const router = useRouter();
  const { showToast } = useToaster();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSignUp = () => router.push("/signup/mobile");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email";
    if (!password.trim()) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await loginUser(email, password);
      if (response.success && response.data) {
        storeAuthToken(response.data.token);
        showToast({ type: "success", title: "Login successful", description: "Welcome back! Redirecting to dashboard..." });
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        throw new Error(response.error || "Login failed");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      showToast({ type: "error", title: "Login Failed", description: errorMessage });
      if (errorMessage.toLowerCase().includes("invalid") || errorMessage.toLowerCase().includes("incorrect")) setPassword("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-full box-border font-open-sans md:max-w-[400px] md:mx-auto">
      <button className="absolute top-9 right-4 left-auto bg-primary text-white border-none rounded-[20px] py-2.5 px-5 text-sm font-medium cursor-pointer z-10 transition-colors hover:bg-primary-hover" onClick={handleSignUp}>Sign Up</button>
      <DottedBox7 className="absolute top-32 left-80 w-[120px] h-auto z-0 opacity-60" />
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold mt-[120px] mb-0 text-black text-left">Let&apos;s Sign You In</h1>
        <p className="text-base text-text-muted text-left m-0 mb-4">Welcome back</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          <button type="submit" className="bg-primary text-white border-none rounded-lg py-4 px-8 text-base font-semibold cursor-pointer w-full mt-12 transition-colors hover:enabled:bg-primary-hover disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400" disabled={isSubmitting || !email.trim() || !password.trim()}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
      <DottedBox4 className="absolute top-[45rem] -left-8 h-auto z-0 opacity-60" />
      <DottedBox3 className="absolute top-[45rem] left-64 h-auto z-0 opacity-60" />
    </div>
  );
};
