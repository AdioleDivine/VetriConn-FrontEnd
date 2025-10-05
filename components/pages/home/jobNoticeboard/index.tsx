"use client";
import JobCard from "@/components/ui/JobCard";
import styles from "./index.module.scss";
import { useJobs } from "@/hooks/useJobs";

const JobNoticeboard = () => {
  // Fetch latest 6 jobs for the home page
  const { jobs, isLoading, isError } = useJobs({ limit: 6 });

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Job Noticeboard</h2>
        <div className={styles.grid}>
          {/* Loading skeleton */}
          {[...Array(6)].map((_, index) => (
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
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Job Noticeboard</h2>
        <div className={styles.errorState}>
          <p>Unable to load jobs at the moment. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Job Noticeboard</h2>
      <div className={styles.grid}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              role={job.role}
              name={job.company_name}
              description={job.full_description}
              tags={job.tags}
            />
          ))
        ) : (
          <div className={styles.noJobs}>
            <p>No jobs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobNoticeboard;
