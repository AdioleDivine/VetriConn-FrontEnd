"use client";

import React from "react";
import Link from "next/link";
import JobCard from "@/components/ui/JobCard";
import { useJobs } from "@/hooks/useJobs";
import styles from "./page.module.scss";

export default function JobsPage() {
  // Fetch all jobs with pagination
  const { jobs, isLoading, isError } = useJobs({ limit: 20 });

  if (isLoading) {
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>Available Positions</h1>
        <div className={styles.jobsGrid}>
          {/* Loading skeleton */}
          {[...Array(8)].map((_, index) => (
            <div key={index} className={styles.skeleton}>
              <div className={styles.skeletonCard}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonCompany}></div>
                <div className={styles.skeletonDescription}></div>
                <div className={styles.skeletonTags}>
                  <div className={styles.skeletonTag}></div>
                  <div className={styles.skeletonTag}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>Available Positions</h1>
        <div className={styles.errorState}>
          <p>Unable to load jobs at the moment. Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Available Positions</h1>
      <div className={styles.jobsGrid}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Link
              href={`/jobs/${job.id}`}
              key={job.id}
              className={styles.jobLink}
            >
              <JobCard
                role={job.role}
                description={job.full_description.substring(0, 120) + "..."}
                tags={job.tags}
                name={job.company_name}
                logo={job.company_logo}
              />
            </Link>
          ))
        ) : (
          <div className={styles.noJobs}>
            <p>No jobs available at the moment.</p>
          </div>
        )}
      </div>
    </main>
  );
}
