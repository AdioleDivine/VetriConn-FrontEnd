"use client";
import JobCard from "@/components/ui/JobCard";
import JobFilters from "@/components/ui/JobFilters";
import PageHeader from "@/components/ui/PageHeader";
import React from "react";
import { useJobs } from "@/hooks/useJobs";
import { useState, useMemo } from "react";
import JobDescriptor from "@/components/ui/JobDescriptor";

const Dashboard = () => {
  const { jobs, isLoading, isError } = useJobs({ limit: 50 });
  const [filters, setFilters] = useState({ location: "", experience: "", remote: "", search: "" });
  const [sortBy, setSortBy] = useState("updated");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  React.useEffect(() => {
    if (jobs.length > 0 && !selectedJobId) setSelectedJobId(jobs[0].id);
  }, [jobs, selectedJobId]);

  const filteredAndSortedJobs = useMemo(() => {
    if (!jobs.length) return [];
    const filtered = jobs.filter((job) => {
      const matchesLocation = !filters.location || job.location === filters.location;
      const matchesExperience = !filters.experience || job.tags.some((tag) => tag.name === filters.experience);
      const matchesRemote = !filters.remote || job.tags.some((tag) => tag.name === filters.remote);
      const matchesSearch = !filters.search || job.role.toLowerCase().includes(filters.search.toLowerCase()) || job.company_name.toLowerCase().includes(filters.search.toLowerCase());
      return matchesLocation && matchesExperience && matchesRemote && matchesSearch;
    });
    return filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "title": comparison = a.role.localeCompare(b.role); break;
        case "company": comparison = a.company_name.localeCompare(b.company_name); break;
        default: comparison = a.id.localeCompare(b.id); break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [jobs, filters, sortBy, sortOrder]);

  const selectedJob = useMemo(() => {
    if (!filteredAndSortedJobs.length) return null;
    const currentSelected = filteredAndSortedJobs.find((job) => job.id === selectedJobId);
    if (currentSelected) return currentSelected;
    if (filteredAndSortedJobs.length > 0) {
      setSelectedJobId(filteredAndSortedJobs[0].id);
      return filteredAndSortedJobs[0];
    }
    return null;
  }, [filteredAndSortedJobs, selectedJobId]);

  const handleSortChange = (newSortBy: string, newSortOrder: "asc" | "desc") => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex gap-4 max-w-[1400px] mx-auto">
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-shimmer" />
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-shimmer" />
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-shimmer" />
            <div className="h-10 flex-1 bg-gray-200 rounded-lg animate-shimmer" />
          </div>
        </div>
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex justify-between items-center max-w-[1400px] mx-auto">
            <div className="h-8 w-48 bg-gray-200 rounded animate-shimmer" />
            <div className="h-8 w-32 bg-gray-200 rounded animate-shimmer" />
          </div>
        </div>
        <main className="flex flex-1 max-w-[1400px] mx-auto w-full p-4 gap-6 tablet:flex-col">
          <aside className="w-[400px] flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-200px)] tablet:w-full tablet:max-h-none">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg animate-shimmer" />
                  <div className="flex-1">
                    <div className="h-5 w-3/4 bg-gray-200 rounded animate-shimmer mb-2" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-shimmer" />
                  </div>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded animate-shimmer mb-3" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-shimmer" />
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-shimmer" />
                </div>
              </div>
            ))}
          </aside>
          <section className="flex-1 bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-lg animate-shimmer" />
              <div>
                <div className="h-6 w-48 bg-gray-200 rounded animate-shimmer mb-2" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-shimmer" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded animate-shimmer" />
              <div className="h-4 w-full bg-gray-200 rounded animate-shimmer" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-shimmer" />
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex items-center justify-center flex-1 p-8">
          <p className="text-red-500 text-lg">Unable to load jobs at the moment. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <JobFilters jobs={jobs} filters={filters} setFilters={setFilters} />
      <PageHeader title="Recommended Jobs" jobCount={filteredAndSortedJobs.length} sortBy={sortBy} sortOrder={sortOrder} onSortChange={handleSortChange} />
      <main className="flex flex-1 max-w-[1400px] mx-auto w-full p-4 gap-6 tablet:flex-col">
        {filteredAndSortedJobs.length === 0 ? (
          <div className="flex items-center justify-center flex-1 p-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h2>
              <p className="text-gray-500">Please try adjusting your search criteria or check back later for new opportunities.</p>
            </div>
          </div>
        ) : (
          <>
            <aside className="w-[400px] flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-200px)] tablet:w-full tablet:max-h-none">
              {filteredAndSortedJobs.map((job) => (
                <JobCard key={job.id} role={job.role} name={job.company_name} description={job.full_description} tags={job.tags} logo={job.company_logo} variant="sidebar" selected={selectedJobId === job.id} onSelect={() => setSelectedJobId(job.id)} />
              ))}
            </aside>
            <section className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden">
              {selectedJob ? <JobDescriptor {...selectedJob} /> : <div className="flex items-center justify-center h-full p-8"><p className="text-gray-500">Select a job to view details</p></div>}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
