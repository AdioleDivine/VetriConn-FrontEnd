"use client";

import React, { useState } from "react";
import JobDescriptor from "@/components/ui/JobDescriptor";
import JobCard from "@/components/ui/JobCard";
import jobs from "@/lib/jobs";
import styles from "./page.module.scss";

export default function TestPage() {
  const [selectedJobId, setSelectedJobId] = useState(jobs[0].id);
  const selectedJob = jobs.find((job) => job.id === selectedJobId) || jobs[0];

  return (
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            role={job.role}
            name={job.company_name}
            description={job.full_description}
            tags={job.tags}
            logo={job.company_logo}
            variant="sidebar"
            selected={selectedJobId === job.id}
            onSelect={() => setSelectedJobId(job.id)}
          />
        ))}
      </aside>
      <section className={styles.main}>
        <JobDescriptor {...selectedJob} />
      </section>
    </main>
  );
}
