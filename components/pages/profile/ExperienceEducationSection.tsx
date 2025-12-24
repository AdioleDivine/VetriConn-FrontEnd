"use client";
import React from "react";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";

export const ExperienceEducationSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-12 mt-10 bg-white rounded-xl shadow-sm py-8 tablet:grid-cols-1 tablet:gap-6 tablet:mx-4 tablet:py-6">
      <div className="flex flex-col">
        <ExperienceSection />
      </div>
      <div className="flex flex-col">
        <EducationSection />
      </div>
    </div>
  );
};
