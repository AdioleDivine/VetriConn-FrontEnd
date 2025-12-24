"use client";
import React, { SetStateAction, useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaChevronDown } from "react-icons/fa";
import { Job } from "@/types/job";

interface Filters { location: string; experience: string; remote: string; search: string; }

interface CustomSelectProps { value: string; onChange: (value: string) => void; options: string[]; placeholder: string; icon?: React.ReactNode; }

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, placeholder, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { if (selectRef.current && !selectRef.current.contains(event.target as Node)) setIsOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2 relative flex-1 min-w-0 tablet:max-w-none sm:flex-1 xs:w-full xs:max-w-none xs:flex-none">
      {icon && <span className="text-gray-500 text-base">{icon}</span>}
      <div className="relative min-w-[140px] tablet:w-full tablet:min-w-[80px] sm:min-w-[70px] xs:w-full xs:min-w-0" ref={selectRef}>
        <button className={clsx("flex items-center justify-between bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm text-gray-700 cursor-pointer transition-all duration-200 min-w-[120px] whitespace-nowrap hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] tablet:min-w-[100px] tablet:text-[13px] tablet:py-1.5 tablet:px-2.5 sm:min-w-[70px] sm:text-[11px] sm:py-1 sm:px-1.5 xs:w-full xs:min-w-0 xs:py-2 xs:px-3 xs:text-sm", value && "border-primary bg-red-50 text-primary")} onClick={() => setIsOpen(!isOpen)} type="button">
          <span>{value || placeholder}</span>
          <FaChevronDown className={clsx("ml-2 text-xs text-gray-400 transition-transform duration-200 sm:text-[10px] sm:ml-1", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-[200px] overflow-y-auto">
            <button className={clsx("py-2 px-3 text-sm text-gray-700 cursor-pointer transition-all duration-200 border-none bg-transparent w-full text-left hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-primary focus:text-white", !value && "bg-red-50 text-primary font-medium")} onClick={() => { onChange(""); setIsOpen(false); }} type="button">{placeholder}</button>
            {options.map((option) => <button key={option} className={clsx("py-2 px-3 text-sm text-gray-700 cursor-pointer transition-all duration-200 border-none bg-transparent w-full text-left hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-primary focus:text-white", value === option && "bg-red-50 text-primary font-medium")} onClick={() => { onChange(option); setIsOpen(false); }} type="button">{option}</button>)}
          </div>
        )}
      </div>
    </div>
  );
};

function getUniqueLocations(jobs: Job[]): string[] { return Array.from(new Set(jobs.map((job) => job.location))); }
function getUniqueTagValues(jobs: Job[]): string[] { const values = new Set<string>(); jobs.forEach((job) => job.tags.forEach((tag) => values.add(tag.name))); return Array.from(values); }

const JobFilters = ({ jobs, filters, setFilters }: { jobs: Job[]; filters: Filters; setFilters: React.Dispatch<SetStateAction<Filters>> }) => {
  const allTags = getUniqueTagValues(jobs);
  const locationTags = getUniqueLocations(jobs);
  const experienceTags = allTags.filter((tag) => ["full-time", "part-time", "will train", "entry level"].some((t) => tag.toLowerCase().includes(t)));
  const workTypeTags = allTags.filter((tag) => ["on-site", "remote", "hybrid"].some((t) => tag.toLowerCase().includes(t)));
  const jobCategoryTags = allTags.filter((tag) => ["management", "administration", "technical sales", "communications", "trucking", "food service", "healthcare", "beauty"].some((t) => tag.toLowerCase().includes(t)));

  return (
    <div className="py-6 px-8 pb-2 bg-white max-w-container mx-auto tablet:p-4 tablet:pb-2 xs:p-3">
      <div className="flex items-center bg-gray-100 rounded-full py-2 px-6 gap-5 shadow-sm w-full mx-auto max-w-container tablet:gap-2 tablet:px-4 tablet:flex-wrap sm:gap-1.5 sm:px-3 xs:flex-col xs:gap-2 xs:p-2 xs:items-stretch">
        <CustomSelect value={filters.location} onChange={(value) => setFilters((f) => ({ ...f, location: value }))} options={locationTags} placeholder="All Locations" icon={<FaMapMarkerAlt />} />
        <span className="w-px h-8 bg-gray-300 rounded mx-2 tablet:hidden" />
        <CustomSelect value={filters.experience} onChange={(value) => setFilters((f) => ({ ...f, experience: value }))} options={[...experienceTags, ...jobCategoryTags]} placeholder="All Categories" icon={<FaBriefcase />} />
        <span className="w-px h-8 bg-gray-300 rounded mx-2 tablet:hidden" />
        <CustomSelect value={filters.remote} onChange={(value) => setFilters((f) => ({ ...f, remote: value }))} options={workTypeTags} placeholder="All Types" />
        <span className="w-px h-8 bg-gray-300 rounded mx-2 tablet:hidden" />
        <div className="flex items-center bg-white rounded-full py-1 px-3 shadow-sm ml-auto tablet:w-full tablet:ml-0 tablet:mt-2 tablet:order-4 xs:mt-0">
          <input type="text" placeholder="Search jobs..." value={filters.search} onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))} className="border-none bg-transparent text-base outline-none py-1 px-2 text-gray-900 w-36 tablet:w-full tablet:flex-1 xs:text-base xs:py-1.5 xs:px-2" />
          <FaSearch className="text-gray-400 text-base ml-1" />
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
