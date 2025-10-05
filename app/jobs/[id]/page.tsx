"use client";

import React from "react";
import { useParams } from "next/navigation";
import JobDescriptor from "@/components/ui/JobDescriptor";
import { useJob } from "@/hooks/useJob";
import styles from "./page.module.scss";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;

  const { job, isLoading, isError } = useJob(jobId);

  if (isLoading) {
    return (
      <main className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.skeleton}>
            <div className={styles.skeletonHeader}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonCompany}></div>
            </div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonLine}></div>
              <div className={styles.skeletonLine}></div>
              <div className={styles.skeletonLine}></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !job) {
    return (
      <main className={styles.container}>
        <div className={styles.errorState}>
          <h1>Job Not Found</h1>
          <p>The job you're looking for doesn't exist or has been removed.</p>
          <a href="/jobs" className={styles.backLink}>
            ← Back to Jobs
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <JobDescriptor {...job} />
    </main>
  );
}
