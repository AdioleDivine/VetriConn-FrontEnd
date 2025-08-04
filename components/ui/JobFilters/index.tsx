import React, { SetStateAction } from "react";
import styles from "./index.module.scss";
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { Job } from "@/types/job";

interface Filters {
  location: string;
  experience: string;
  remote: string;
  search: string;
}

function getUniqueTagValues(jobs: Job[], category?: string): string[] {
  const values = new Set<string>();
  jobs.forEach((job) => {
    job.tags.forEach((tag) => {
      if (!category) {
        values.add(tag.name);
      } else if (tag.name.toLowerCase().includes(category.toLowerCase())) {
        values.add(tag.name);
      }
    });
  });
  return Array.from(values);
}

const JobFilters = ({
  jobs,
  filters,
  setFilters,
}: {
  jobs: Job[];
  filters: Filters;
  setFilters: React.Dispatch<SetStateAction<Filters>>;
}) => {
  // Get all unique tag values for different categories
  const allTags = getUniqueTagValues(jobs);

  // Separate tags by likely categories
  const locationTags = allTags.filter(
    (tag) =>
      tag.toLowerCase().includes("ottawa") ||
      tag.toLowerCase().includes("toronto") ||
      tag.toLowerCase().includes("vancouver") ||
      tag.toLowerCase().includes("montreal") ||
      tag.toLowerCase().includes("remote") ||
      tag.toLowerCase().includes("onsite") ||
      tag.toLowerCase().includes("hybrid")
  );

  const experienceTags = allTags.filter(
    (tag) =>
      tag.toLowerCase().includes("full-time") ||
      tag.toLowerCase().includes("part-time") ||
      tag.toLowerCase().includes("contract") ||
      tag.toLowerCase().includes("internship")
  );

  const workTypeTags = allTags.filter(
    (tag) =>
      tag.toLowerCase().includes("remote") ||
      tag.toLowerCase().includes("onsite") ||
      tag.toLowerCase().includes("hybrid")
  );

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersBar}>
        <div className={styles.filterGroup}>
          <FaMapMarkerAlt className={styles.icon} />
          <select
            value={filters.location}
            onChange={(e) =>
              setFilters((f) => ({ ...f, location: e.target.value }))
            }
          >
            <option value="">All Locations</option>
            {locationTags.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <span className={styles.divider} />
        <div className={styles.filterGroup}>
          <FaBriefcase className={styles.icon} />
          <select
            value={filters.experience}
            onChange={(e) =>
              setFilters((f) => ({ ...f, experience: e.target.value }))
            }
          >
            <option value="">All Experience</option>
            {experienceTags.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>
        <span className={styles.divider} />
        <div className={styles.filterGroup}>
          <select
            value={filters.remote}
            onChange={(e) =>
              setFilters((f) => ({ ...f, remote: e.target.value }))
            }
          >
            <option value="">All Types</option>
            {workTypeTags.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <span className={styles.divider} />
        <div className={styles.searchGroup}>
          <input
            type="text"
            placeholder="Search jobs..."
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value }))
            }
          />
          <FaSearch className={styles.searchIcon} />
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
