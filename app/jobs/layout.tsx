import type { Metadata } from "next";
import { generateMetadata as generateSeoMetadata, METADATA_TEMPLATES } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: METADATA_TEMPLATES.jobs.title,
  description: METADATA_TEMPLATES.jobs.description,
  path: "/jobs",
  keywords: ["job board for retirees", "veteran jobs Canada", "senior employment"],
});

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
