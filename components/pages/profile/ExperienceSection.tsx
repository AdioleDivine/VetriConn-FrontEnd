"use client";
import React from "react";
import Image from "next/image";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  logo: string;
}

interface ExperienceSectionProps {
  experiences?: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences = [
    {
      id: "1",
      company: "Google Inc.",
      role: "Product Designer",
      duration: "Oct 2022 - Present/Contract",
      location: "Ottawa, ON",
      logo: "/images/icons/google.svg",
    },
    {
      id: "2",
      company: "Facebook Inc.",
      role: "Product Designer",
      duration: "Oct 2018 - 2022",
      location: "Ottawa, ON",
      logo: "/images/icons/facebook.svg",
    },
  ],
}) => {
  return (
    <div className="mt-8 px-8 tablet:px-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Experience</h3>
      <div className="flex flex-col gap-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="flex items-start gap-4 tablet:gap-3">
            <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-gray-200 tablet:w-9 tablet:h-9">
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <h4 className="text-base font-semibold text-gray-900 m-0 leading-snug tablet:text-[0.9rem]">{experience.role}</h4>
              <p className="text-sm text-gray-500 m-0 leading-snug tablet:text-[0.8rem]">{experience.company}</p>
              <div className="flex flex-col gap-0.5 mt-1">
                <span className="text-sm text-gray-400 leading-snug tablet:text-[0.8rem]">{experience.duration}</span>
                <span className="text-sm text-gray-400 leading-snug tablet:text-[0.8rem]">{experience.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
