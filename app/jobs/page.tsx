"use client";
import React from "react";
import Link from "next/link";
import JobCard from "@/components/ui/JobCard";
import { useJobs } from "@/hooks/useJobs";

export default function JobsPage() {
  const { jobs, isLoading, isError } = useJobs({ limit: 20 });

  if (isLoading) {
    return (
      <main className="max-w-[1200px] mx-auto p-8 tablet:p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Positions</h1>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-shimmer mb-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-shimmer mb-4" />
              <div className="h-4 w-full bg-gray-200 rounded animate-shimmer mb-4" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-shimmer" />
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="max-w-[1200px] mx-auto p-8 tablet:p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Positions</h1>
        <div className="text-center py-12 text-red-500">
          <p>Unable to load jobs at the moment. Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto p-8 tablet:p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Positions</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Link href={`/jobs/${job.id}`} key={job.id} className="no-underline">
              <JobCard role={job.role} description={job.full_description.substring(0, 120) + "..."} tags={job.tags} name={job.company_name} logo={job.company_logo} />
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No jobs available at the moment.</p>
          </div>
        )}
      </div>
    </main>
  );
}
