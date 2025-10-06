"use client";
import React from "react";
import styles from "./page.module.scss";
import { FaBookmark } from "react-icons/fa";

const SavedJobsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <FaBookmark className={styles.headerIcon} />
          <div>
            <h1 className={styles.title}>Saved Jobs</h1>
            <p className={styles.subtitle}>Jobs you&apos;ve bookmarked for later</p>
          </div>
        </div>

        <div className={styles.emptyState}>
          <FaBookmark className={styles.emptyIcon} />
          <h2 className={styles.emptyTitle}>No saved jobs yet</h2>
          <p className={styles.emptyDescription}>
            Start exploring jobs and save the ones that interest you by clicking
            the bookmark icon.
          </p>
          <a href="/dashboard" className={styles.browseButton}>
            Browse Jobs
          </a>
        </div>

        {/* This will be populated when saved jobs functionality is implemented */}
        {/* <div className={styles.jobsList}>
          Job cards will go here
        </div> */}
      </div>
    </div>
  );
};

export default SavedJobsPage;
