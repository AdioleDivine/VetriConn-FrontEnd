"use client";
import React from "react";
import { FaBookmark } from "react-icons/fa";

const SavedJobsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 tablet:p-4">
      <div className="max-w-[800px] mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <FaBookmark className="text-3xl text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
            <p className="text-gray-500">Jobs you&apos;ve bookmarked for later</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
          <FaBookmark className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No saved jobs yet</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Start exploring jobs and save the ones that interest you by clicking the bookmark icon.
          </p>
          <a href="/dashboard" className="inline-block bg-primary text-white py-3 px-6 rounded-lg font-medium transition-colors hover:bg-primary-hover">
            Browse Jobs
          </a>
        </div>
      </div>
    </div>
  );
};

export default SavedJobsPage;
