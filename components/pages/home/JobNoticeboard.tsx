"use client";
import JobCard from "@/components/ui/JobCard";
import { useJobs } from "@/hooks/useJobs";

export const JobNoticeboard = () => {
  const { jobs, isLoading, isError } = useJobs({ limit: 6 });

  if (isLoading) {
    return (
      <div className="py-8 px-[5%] max-w-[1200px] mx-auto">
        <h2 className="font-lato text-heading-2 text-text mb-8 text-center">Job Noticeboard</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 mobile:grid-cols-1 mobile:justify-items-center">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="w-full">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-2" />
                <div className="h-4 w-[60%] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-4" />
                <div className="h-3.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded mb-4" />
                <div className="flex gap-2">
                  <div className="h-5 w-[60px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-xl" />
                  <div className="h-5 w-[60px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-xl" />
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
      <div className="py-8 px-[5%] max-w-[1200px] mx-auto">
        <h2 className="font-lato text-heading-2 text-text mb-8 text-center">Job Noticeboard</h2>
        <div className="col-span-full text-center py-12 px-4 text-red-500 text-lg">
          <p>Unable to load jobs at the moment. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-[5%] max-w-[1200px] mx-auto mobile:text-center">
      <h2 className="font-lato text-heading-2 text-text mb-8 text-center">Job Noticeboard</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 mobile:grid-cols-1 mobile:justify-items-center">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} role={job.role} name={job.company_name} description={job.full_description} tags={job.tags} />)
        ) : (
          <div className="col-span-full text-center py-12 px-4 text-text text-lg"><p>No jobs available at the moment.</p></div>
        )}
      </div>
    </div>
  );
};
