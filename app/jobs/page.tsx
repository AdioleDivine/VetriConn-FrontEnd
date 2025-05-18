"use client";

import React from "react";
import Link from "next/link";
import JobCard from "@/components/ui/JobCard";
import jobs from "@/lib/jobs";
import styles from "./page.module.scss";

export default function JobsPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Available Positions</h1>
      <div className={styles.jobsGrid}>
        {jobs.map((job) => (
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
        ))}
      </div>
    </main>
  );
}
