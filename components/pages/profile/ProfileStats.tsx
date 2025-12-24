"use client";
import React from "react";

interface ProfileStatsProps {
  userProfile: {
    current: string;
    experience: string;
    location: string;
    lookingFor: string[];
  };
  editingData?: {
    name: string;
    title: string;
    location: string;
    experience: string;
    current: string;
    lookingFor: string[];
    bio: string | null;
    avatar: string;
    socials: {
      linkedin: string;
      twitter: string;
      github: string;
    };
    professionalSummary?: string;
  } | null;
  isEditing: boolean;
  onInputChange: (field: string, value: string | string[]) => void;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  userProfile,
  editingData,
  isEditing,
  onInputChange,
}) => {
  const displayData = isEditing && editingData ? editingData : userProfile;

  const inputClasses = "w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-normal focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]";

  return (
    <div className="grid grid-cols-4 bg-white border border-gray-200 rounded-lg mx-8 my-6 overflow-hidden tablet:grid-cols-2 tablet:mx-3 tablet:my-3 mobile:mx-2 mobile:my-2">
      <div className="p-6 border-r border-gray-200 last:border-r-0 tablet:border-b tablet:border-gray-200 tablet:[&:nth-child(2n)]:border-r-0 tablet:[&:nth-child(3)]:border-b-0 tablet:[&:nth-child(4)]:border-b-0 tablet:p-3 mobile:p-2.5">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-gray-500 capitalize mb-1">Current</span>
          {isEditing ? (
            <input
              type="text"
              value={displayData.current || ""}
              onChange={(e) => onInputChange("current", e.target.value)}
              className={inputClasses}
              placeholder="Enter your current job"
            />
          ) : (
            <span className="text-sm font-normal text-gray-700 leading-relaxed">{userProfile.current || "Not specified"}</span>
          )}
        </div>
      </div>

      <div className="p-6 border-r border-gray-200 last:border-r-0 tablet:border-b tablet:border-gray-200 tablet:[&:nth-child(2n)]:border-r-0 tablet:[&:nth-child(3)]:border-b-0 tablet:[&:nth-child(4)]:border-b-0 tablet:p-3 mobile:p-2.5">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-gray-500 capitalize mb-1">Experience</span>
          {isEditing ? (
            <input
              type="text"
              value={displayData.experience || ""}
              onChange={(e) => onInputChange("experience", e.target.value)}
              className={inputClasses}
            />
          ) : (
            <span className="text-sm font-normal text-gray-700 leading-relaxed">{userProfile.experience || "Not specified"}</span>
          )}
        </div>
      </div>

      <div className="p-6 border-r border-gray-200 last:border-r-0 tablet:border-b tablet:border-gray-200 tablet:[&:nth-child(2n)]:border-r-0 tablet:[&:nth-child(3)]:border-b-0 tablet:[&:nth-child(4)]:border-b-0 tablet:p-3 mobile:p-2.5">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-gray-500 capitalize mb-1">Location</span>
          {isEditing ? (
            <input
              type="text"
              value={displayData.location || ""}
              onChange={(e) => onInputChange("location", e.target.value)}
              className={inputClasses}
            />
          ) : (
            <span className="text-sm font-normal text-gray-700 leading-relaxed">{userProfile.location || "Not specified"}</span>
          )}
        </div>
      </div>

      <div className="p-6 border-r border-gray-200 last:border-r-0 tablet:border-b tablet:border-gray-200 tablet:[&:nth-child(2n)]:border-r-0 tablet:[&:nth-child(3)]:border-b-0 tablet:[&:nth-child(4)]:border-b-0 tablet:p-3 mobile:p-2.5">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-gray-500 capitalize mb-1">Looking For</span>
          {isEditing ? (
            <input
              type="text"
              value={(displayData.lookingFor ?? []).join(", ")}
              onChange={(e) =>
                onInputChange(
                  "lookingFor",
                  e.target.value.split(", ").map((s) => s.trim()).filter((s) => s)
                )
              }
              className={inputClasses}
              placeholder="e.g., Full time, Part time, Remote"
            />
          ) : (
            <span className="text-sm font-normal text-gray-700 leading-relaxed">
              {(userProfile.lookingFor ?? []).length > 0 ? (userProfile.lookingFor ?? []).join(", ") : "Not specified"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
