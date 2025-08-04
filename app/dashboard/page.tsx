"use client";
import JobCard from "@/components/ui/JobCard";
import JobFilters from "@/components/ui/JobFilters";
import PageHeader from "@/components/ui/PageHeader";
import React from "react";
import jobs from "@/lib/jobs";
import styles from "./page.module.scss";
import { useState, useMemo } from "react";
import JobDescriptor from "@/components/ui/JobDescriptor";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    location: "",
    experience: "",
    remote: "",
    search: "",
  });
  const [sortBy, setSortBy] = useState("updated");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedJobId, setSelectedJobId] = useState(jobs[0].id);
  // Filtering and sorting logic
  const filteredAndSortedJobs = useMemo(() => {
    const filtered = jobs.filter((job) => {
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

    // Sort the filtered jobs
    return filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "title":
          comparison = a.role.localeCompare(b.role);
          break;
        case "company":
          comparison = a.company_name.localeCompare(b.company_name);
          break;
        case "updated":
        case "created":
        default:
          // For demo purposes, using job id as a proxy for date
          comparison = a.id.localeCompare(b.id);
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filters, sortBy, sortOrder]);

  // Update selected job if it's filtered out
  const selectedJob = useMemo(() => {
    const currentSelected = filteredAndSortedJobs.find(
      (job) => job.id === selectedJobId
    );
    if (currentSelected) {
      return currentSelected;
    }
    // If current selection is filtered out, select the first available job
    if (filteredAndSortedJobs.length > 0) {
      setSelectedJobId(filteredAndSortedJobs[0].id);
      return filteredAndSortedJobs[0];
    }
    // Fallback to first job if no filtered jobs
    return jobs[0];
  }, [filteredAndSortedJobs, selectedJobId]);

  const handleSortChange = (
    newSortBy: string,
    newSortOrder: "asc" | "desc"
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <div className={styles.dashboardContainer}>
      <JobFilters jobs={jobs} filters={filters} setFilters={setFilters} />

      <PageHeader
        title="Recommended Jobs"
        jobCount={filteredAndSortedJobs.length}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      <main className={styles.container}>
        <aside className={styles.sidebar}>
          {filteredAndSortedJobs.length === 0 && (
            <div className={styles.noJobs}>No jobs found.</div>
          )}
          {filteredAndSortedJobs.map((job) => (
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
    </div>
  );
};

export default Dashboard;
