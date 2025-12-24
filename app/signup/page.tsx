import { SignUp } from "@/components/pages/auth/SignUp";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <main className="max-w-[1920px] min-w-[320px] mx-auto overflow-x-hidden">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <SignUp />
      </Suspense>
    </main>
  );
}
