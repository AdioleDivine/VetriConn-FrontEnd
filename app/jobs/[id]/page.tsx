"use client";

import React from "react";
import { useParams } from "next/navigation";
import JobDescriptor from "@/components/ui/JobDescriptor";
import jobs from "@/lib/jobs";
import styles from "./page.module.scss";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;

  // Find the job with the matching ID, or default to the first job if not found
  const job = jobs.find((job) => job.id === jobId) || jobs[0];

  return (
    <main className={styles.container}>
      <JobDescriptor {...job} />
    </main>
  );
}
