"use client";
import React, { useState, useMemo } from "react";
import JobCard from "@/components/ui/JobCard";
import jobs from "@/lib/jobs";
import styles from "./page.module.scss";
import JobFilters from "@/components/ui/JobFilters";

export default function TestPage2() {
  const [filters, setFilters] = useState({
    location: "",
    experience: "",
    remote: "",
    search: "",
  });

  // Filtering logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesLocation =
        !filters.location ||
        job.tags.some((tag) => tag.name === filters.location);
      const matchesExperience =
        !filters.experience ||
        job.tags.some((tag) => tag.name === filters.experience);
      const matchesRemote =
        !filters.remote || job.tags.some((tag) => tag.name === filters.remote);
      const matchesSearch =
        !filters.search ||
        job.role.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company_name.toLowerCase().includes(filters.search.toLowerCase());
      return (
        matchesLocation && matchesExperience && matchesRemote && matchesSearch
      );
    });
  }, [filters]);

  return (
    <main className={styles.container}>
      <JobFilters jobs={jobs} filters={filters} setFilters={setFilters} />
      <div className={styles.sidebar}>
        {filteredJobs.length === 0 && <div>No jobs found.</div>}
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            role={job.role}
            name={job.company_name}
            description={job.full_description}
            tags={job.tags}
            logo={job.company_logo}
            variant="sidebar"
          />
        ))}
      </div>
    </main>
  );
}
