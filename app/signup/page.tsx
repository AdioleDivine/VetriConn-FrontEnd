import type { Metadata } from "next";
import { SignUp } from "@/components/pages/auth/SignUp";
import { Suspense } from "react";
import { generateMetadata as generateSeoMetadata, METADATA_TEMPLATES } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: METADATA_TEMPLATES.signup.title,
  description: METADATA_TEMPLATES.signup.description,
  path: "/signup",
  keywords: ["register for senior jobs", "veteran job seeker signup", "retiree job registration"],
});

export default function SignUpPage() {
  return (
    <main className="max-w-[1920px] min-w-[320px] mx-auto overflow-x-hidden">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <SignUp />
      </Suspense>
    </main>
  );
}
