"use client";
import JobCard from "@/components/ui/JobCard";
import JobFilters from "@/components/ui/JobFilters";
import PageHeader from "@/components/ui/PageHeader";
import React from "react";
import { useJobs } from "@/hooks/useJobs";
import styles from "./page.module.scss";
import { useState, useMemo } from "react";
import JobDescriptor from "@/components/ui/JobDescriptor";

const Dashboard = () => {
  // Fetch jobs from database
  const { jobs, isLoading, isError } = useJobs({ limit: 50 });

  const [filters, setFilters] = useState({
    location: "",
    experience: "",
    remote: "",
    search: "",
  });
  const [sortBy, setSortBy] = useState("updated");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  // Initialize selectedJobId when jobs are loaded
  React.useEffect(() => {
    if (jobs.length > 0 && !selectedJobId) {
      setSelectedJobId(jobs[0].id);
    }
  }, [jobs, selectedJobId]);

  // Filtering and sorting logic
  const filteredAndSortedJobs = useMemo(() => {
    if (!jobs.length) return [];

    const filtered = jobs.filter((job) => {
      const matchesLocation =
        !filters.location || job.location === filters.location;
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
  }, [jobs, filters, sortBy, sortOrder]);

  // Update selected job if it's filtered out
  const selectedJob = useMemo(() => {
    if (!filteredAndSortedJobs.length) return null;

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
    // No jobs available
    return null;
  }, [filteredAndSortedJobs, selectedJobId]);

  const handleSortChange = (
    newSortBy: string,
    newSortOrder: "asc" | "desc"
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  if (isLoading) {
    return (
      <div className={styles.dashboardContainer}>
        {/* Skeleton for filters */}
        <div className={styles.filtersSkeleton}>
          <div className={styles.skeletonFilterBar}>
            <div className={styles.skeletonFilter}></div>
            <div className={styles.skeletonFilter}></div>
            <div className={styles.skeletonFilter}></div>
            <div className={styles.skeletonSearch}></div>
          </div>
        </div>

        {/* Skeleton for page header */}
        <div className={styles.headerSkeleton}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonControls}></div>
        </div>

        <main className={styles.container}>
          <aside className={styles.sidebar}>
            {/* Loading skeleton for job cards */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className={styles.skeleton}>
                <div className={styles.skeletonCard}>
                  <div className={styles.skeletonHeader}>
                    <div className={styles.skeletonAvatar}></div>
                    <div className={styles.skeletonInfo}>
                      <div className={styles.skeletonTitle}></div>
                      <div className={styles.skeletonCompany}></div>
                    </div>
                    <div className={styles.skeletonBookmark}></div>
                  </div>
                  <div className={styles.skeletonDescription}></div>
                  <div className={styles.skeletonTags}>
                    <div className={styles.skeletonTag}></div>
                    <div className={styles.skeletonTag}></div>
                  </div>
                </div>
              </div>
            ))}
          </aside>
          <section className={styles.main}>
            <div className={styles.skeletonJobDescriptor}>
              <div className={styles.skeletonDescriptorHeader}>
                <div className={styles.skeletonDescriptorAvatar}></div>
                <div className={styles.skeletonDescriptorTitle}></div>
                <div className={styles.skeletonDescriptorCompany}></div>
              </div>
              <div className={styles.skeletonDescriptorContent}>
                <div className={styles.skeletonDescriptorLine}></div>
                <div className={styles.skeletonDescriptorLine}></div>
                <div className={styles.skeletonDescriptorLine}></div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.errorState}>
          <p>Unable to load jobs at the moment. Please try again later.</p>
        </div>
      </div>
    );
  }

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
        {filteredAndSortedJobs.length === 0 ? (
          <div className={styles.noJobsContainer}>
            <div className={styles.noJobsCenter}>
              <h2>No jobs found</h2>
              <p>
                Please try adjusting your search criteria or check back later
                for new opportunities.
              </p>
            </div>
          </div>
        ) : (
          <>
            <aside className={styles.sidebar}>
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
              {selectedJob ? (
                <JobDescriptor {...selectedJob} />
              ) : (
                <div className={styles.noJobSelected}>
                  <p>Select a job to view details</p>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
