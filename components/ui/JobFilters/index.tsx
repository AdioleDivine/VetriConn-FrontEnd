import React, { SetStateAction, useState, useRef, useEffect } from "react";
import styles from "./index.module.scss";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaChevronDown,
} from "react-icons/fa";
import { Job } from "@/types/job";

interface Filters {
  location: string;
  experience: string;
  remote: string;
  search: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  icon?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const displayValue = value || placeholder;

  return (
    <div className={styles.filterGroup}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <div className={styles.customSelect} ref={selectRef}>
        <button
          className={`${styles.selectButton} ${value ? styles.active : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <span>{displayValue}</span>
          <FaChevronDown
            className={`${styles.selectArrow} ${isOpen ? styles.open : ""}`}
          />
        </button>

        {isOpen && (
          <div className={styles.selectDropdown}>
            <button
              className={`${styles.selectOption} ${
                !value ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick("")}
              type="button"
            >
              {placeholder}
            </button>
            {options.map((option) => (
              <button
                key={option}
                className={`${styles.selectOption} ${
                  value === option ? styles.selected : ""
                }`}
                onClick={() => handleOptionClick(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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

  // Define actual locations based on our current job data
  const locationTags = allTags.filter(
    (tag) =>
      tag.toLowerCase().includes("edmonton") ||
      tag.toLowerCase().includes("mississauga") ||
      tag.toLowerCase().includes("alberta") ||
      tag.toLowerCase().includes("ontario") ||
      tag.toLowerCase().includes("ab") ||
      tag.toLowerCase().includes("on")
  );

  // Define actual experience/employment types from our job data
  const experienceTags = allTags.filter(
    (tag) =>
      tag.toLowerCase().includes("full-time") ||
      tag.toLowerCase().includes("part-time") ||
      tag.toLowerCase().includes("will train") ||
      tag.toLowerCase().includes("entry level")
  );

  // Define actual work arrangement types from our job data
  const workTypeTags = allTags.filter(
    (tag) =>
      tag.toLowerCase().includes("on-site") ||
      tag.toLowerCase().includes("remote") ||
      tag.toLowerCase().includes("hybrid")
  );

  // Define job categories based on our actual job types
  const jobCategoryTags = allTags.filter(
    (tag) =>
      tag.toLowerCase().includes("management") ||
      tag.toLowerCase().includes("administration") ||
      tag.toLowerCase().includes("technical sales") ||
      tag.toLowerCase().includes("communications") ||
      tag.toLowerCase().includes("trucking") ||
      tag.toLowerCase().includes("food service")
  );

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersBar}>
        <CustomSelect
          value={filters.location}
          onChange={(value) => setFilters((f) => ({ ...f, location: value }))}
          options={locationTags}
          placeholder="All Locations"
          icon={<FaMapMarkerAlt />}
        />

        <span className={styles.divider} />

        <CustomSelect
          value={filters.experience}
          onChange={(value) => setFilters((f) => ({ ...f, experience: value }))}
          options={[...experienceTags, ...jobCategoryTags]}
          placeholder="All Categories"
          icon={<FaBriefcase />}
        />

        <span className={styles.divider} />

        <CustomSelect
          value={filters.remote}
          onChange={(value) => setFilters((f) => ({ ...f, remote: value }))}
          options={workTypeTags}
          placeholder="All Types"
        />

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
