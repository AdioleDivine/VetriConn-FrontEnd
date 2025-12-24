"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import JobDescriptor from "@/components/ui/JobDescriptor";
import { useJob } from "@/hooks/useJob";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;
  const { job, isLoading, isError } = useJob(jobId);

  if (isLoading) {
    return (
      <main className="max-w-[1000px] mx-auto p-8 tablet:p-4">
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <div className="mb-6">
            <div className="h-8 w-2/3 bg-gray-200 rounded animate-shimmer mb-3" />
            <div className="h-5 w-1/3 bg-gray-200 rounded animate-shimmer" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded animate-shimmer" />
            <div className="h-4 w-full bg-gray-200 rounded animate-shimmer" />
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-shimmer" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !job) {
    return (
      <main className="max-w-[1000px] mx-auto p-8 tablet:p-4">
        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h1>
          <p className="text-gray-500 mb-6">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/jobs" className="text-primary font-medium hover:underline">← Back to Jobs</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1000px] mx-auto p-8 tablet:p-4">
      <JobDescriptor {...job} />
    </main>
  );
}
