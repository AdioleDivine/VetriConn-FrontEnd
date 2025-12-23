"use client";
import React from "react";

interface ProfessionalSummaryProps {
  summary?: string;
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({
  summary = "",
  isEditing,
  onInputChange,
}) => {
  return (
    <div className="mt-10 bg-white rounded-xl p-8 flex flex-col h-[300px]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-gray-900">Professional Summary</h2>
      </div>

      {isEditing ? (
        <textarea
          value={summary}
          onChange={(e) => onInputChange("professionalSummary", e.target.value)}
          className="w-full flex-1 min-h-[120px] p-4 border-2 border-gray-200 rounded-lg text-base font-inherit leading-relaxed resize-none transition-colors bg-white text-gray-700 focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] placeholder:text-gray-400"
          placeholder="Write a brief professional summary highlighting your key skills, experience, and career objectives..."
        />
      ) : (
        <p className="text-base text-gray-700 mt-2 leading-relaxed">
          {summary || "No professional summary added yet."}
        </p>
      )}
    </div>
  );
};
