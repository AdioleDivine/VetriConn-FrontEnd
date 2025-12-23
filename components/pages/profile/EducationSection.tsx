"use client";
import React from "react";
import Image from "next/image";

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  logo: string;
}

interface EducationSectionProps {
  educations?: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  educations = [
    {
      id: "1",
      institution: "Carleton University",
      degree: "BE, Electrical and Electronics Engineering",
      duration: "Oct 2017 - August 2022",
      location: "Ottawa, ON",
      logo: "/images/icons/carleton.svg",
    },
    {
      id: "2",
      institution: "Udemy",
      degree: "Data Architecture Nano-Degree",
      duration: "March 2021 - April 2022",
      location: "Ottawa, ON",
      logo: "/images/icons/udemy.png",
    },
  ],
}) => {
  return (
    <div className="mt-8 px-8 tablet:px-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Education & Certifications</h3>
      <div className="flex flex-col gap-6">
        {educations.map((education) => (
          <div key={education.id} className="flex items-start gap-4 tablet:gap-3">
            <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-gray-200 tablet:w-9 tablet:h-9">
              <Image
                src={education.logo}
                alt={`${education.institution} logo`}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <h4 className="text-base font-semibold text-gray-900 m-0 leading-snug tablet:text-[0.9rem]">{education.degree}</h4>
              <p className="text-sm text-gray-500 m-0 leading-snug tablet:text-[0.8rem]">{education.institution}</p>
              <div className="flex flex-col gap-0.5 mt-1">
                <span className="text-sm text-gray-400 leading-snug tablet:text-[0.8rem]">{education.duration}</span>
                <span className="text-sm text-gray-400 leading-snug tablet:text-[0.8rem]">{education.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
