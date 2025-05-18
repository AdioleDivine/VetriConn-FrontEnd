import React from "react";
import styles from "./index.module.scss";
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

function getUniqueTagValues(jobs, key) {
  // For demo, infer by tag name (in real app, use explicit fields)
  const values = new Set();
  jobs.forEach((job) => {
    job.tags.forEach((tag) => {
      if (tag.name.toLowerCase().includes(key)) {
        values.add(tag.name);
      }
    });
  });
  return Array.from(values);
}

const remoteOptions = ["Remote", "Onsite", "Hybrid"];

const JobFilters = ({ jobs, filters, setFilters }) => {
  const locationOptions = getUniqueTagValues(jobs, "ottawa"); // Example: location
  const experienceOptions = getUniqueTagValues(jobs, "full-time"); // Example: experience

  return (
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
          {locationOptions.map((loc) => (
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
          {experienceOptions.map((exp) => (
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
          {remoteOptions.map((type) => (
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
  );
};

export default JobFilters;
