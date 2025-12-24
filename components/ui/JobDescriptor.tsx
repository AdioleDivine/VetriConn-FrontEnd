"use client";
import React from "react";
import clsx from "clsx";
import { FaRegStar } from "react-icons/fa";
import { Job } from "@/types/job";
import { BsBuildings } from "react-icons/bs";

type JobDescriptorProps = Job;

const tagColorMap: Record<string, string> = { flutter: "bg-blue-100 text-blue-600", mobile: "bg-purple-100 text-purple-600", ios: "bg-emerald-100 text-emerald-600", android: "bg-yellow-100 text-yellow-600", dart: "bg-cyan-100 text-cyan-600" };

const JobDescriptor: React.FC<JobDescriptorProps> = ({ role, company_name, location, salary, salary_range, tags, full_description, responsibilities, qualifications, applicationLink }) => {
  const formatSalary = (salaryObj: { symbol: string; number?: number; currency: string }) => salaryObj.number ? `${salaryObj.symbol}${salaryObj.number.toLocaleString()} ${salaryObj.currency}` : `${salaryObj.symbol}0 ${salaryObj.currency}`;

  return (
    <div className="bg-gray-100 rounded-none shadow-none max-w-none m-0 py-12 px-10 flex flex-col items-start h-full overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/10 hover:scrollbar-thumb-black/15 tablet:py-8 tablet:px-6 sm:py-6 sm:px-4 xs:py-5 xs:px-3">
      <div className="w-full flex flex-col items-center text-center relative mb-12 pb-8 border-b border-gray-300">
        <BsBuildings className="rounded-2xl overflow-visible bg-gray-200 text-5xl" />
        <div className="mt-6 mb-4 flex flex-col items-center gap-2">
          <h2 className="font-lato text-center mb-2 mt-0 text-3xl font-bold text-gray-900 tablet:text-[22px] sm:text-xl xs:text-lg">{role}</h2>
          <p className="font-open-sans text-sm font-light text-center mb-1 text-gray-500 tablet:text-sm sm:text-[13px] xs:text-xs">{company_name}</p>
          {location && <p className="font-open-sans text-sm font-normal text-center mb-1 text-gray-500 tablet:text-[13px] sm:text-xs xs:text-[11px]">{location}</p>}
        </div>
        <div className="flex flex-wrap gap-2 mb-6 justify-center tablet:gap-2 tablet:my-4 sm:gap-1.5 sm:my-3 xs:gap-1 xs:my-2.5">
          {tags.map((tag, i) => <span key={i} className={clsx("py-1 px-3.5 rounded-xl text-[13px] font-semibold text-text tablet:text-xs tablet:py-1.5 tablet:px-3 sm:text-[11px] sm:py-1 sm:px-2.5 xs:text-[10px] xs:py-0.5 xs:px-2", tag.color && tagColorMap[tag.color] ? tagColorMap[tag.color] : "bg-gray-300")}>{tag.name}</span>)}
        </div>
        <button className="absolute top-4 right-4 bg-gray-50 border border-gray-200 cursor-pointer p-3 rounded-lg transition-all duration-200 z-[2] hover:bg-gray-100 group"><FaRegStar className="text-xl text-gray-400 transition-colors duration-200 group-hover:text-primary" /></button>
      </div>
      <div className="w-full mb-5"><div className="font-bold text-[15px] mb-1 text-text tablet:text-lg tablet:mb-3 sm:text-base sm:mb-2.5 xs:text-[15px] xs:mb-2">Job Description</div><div className="font-open-sans text-body text-text mb-2 tablet:text-sm tablet:leading-relaxed tablet:mb-5 sm:text-[13px] sm:leading-normal sm:mb-4 xs:text-xs xs:leading-snug xs:mb-3.5">{full_description}</div></div>
      {(salary_range || salary) && <div className="w-full mb-5"><div className="font-open-sans text-base font-semibold text-gray-700 mb-4">Salary/Offer: {salary_range?.start_salary?.number && salary_range?.end_salary?.number ? `${formatSalary(salary_range.start_salary)} - ${formatSalary(salary_range.end_salary)}` : salary ? formatSalary(salary) : "Not specified"}</div></div>}
      <div className="w-full mb-5"><div className="font-bold text-[15px] mb-1 text-text tablet:text-lg tablet:mb-3 sm:text-base sm:mb-2.5 xs:text-[15px] xs:mb-2">Responsibilities</div><ol className="m-0 ml-5 p-0 font-open-sans text-body text-text">{responsibilities.map((item, i) => <li key={i}>{item}</li>)}</ol></div>
      <div className="w-full mb-5"><div className="font-bold text-[15px] mb-1 text-text tablet:text-lg tablet:mb-3 sm:text-base sm:mb-2.5 xs:text-[15px] xs:mb-2">Qualifications</div><ol className="m-0 ml-5 p-0 font-open-sans text-body text-text">{qualifications.map((item, i) => <li key={i}>{item}</li>)}</ol></div>
      {applicationLink ? <a href={applicationLink} target="_blank" rel="noopener noreferrer" className="mt-6 mx-auto block bg-primary text-white border-none rounded-lg py-3 px-10 text-base font-semibold cursor-pointer transition-colors duration-200 hover:bg-red-700 tablet:py-2.5 tablet:px-8 tablet:text-sm tablet:mt-5 sm:py-2 sm:px-6 sm:text-[13px] sm:mt-4 xs:py-2 xs:px-5 xs:text-xs xs:mt-3.5">Apply Now</a> : <button className="mt-6 mx-auto block bg-primary text-white border-none rounded-lg py-3 px-10 text-base font-semibold cursor-pointer transition-colors duration-200 hover:bg-red-700 tablet:py-2.5 tablet:px-8 tablet:text-sm tablet:mt-5 sm:py-2 sm:px-6 sm:text-[13px] sm:mt-4 xs:py-2 xs:px-5 xs:text-xs xs:mt-3.5">Apply Now</button>}
    </div>
  );
};

export default JobDescriptor;
