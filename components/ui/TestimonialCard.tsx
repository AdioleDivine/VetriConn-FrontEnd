import React from "react";

interface TestimonialCardProps {
  text: string;
  name: string;
  role: string;
  org: string;
  orgColor?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, name, role, org, orgColor = "#E53E3E" }) => {
  return (
    <div className="bg-gray-100 rounded-2xl pt-8 px-6 pb-6 min-w-[320px] max-w-[400px] shadow-sm flex flex-col gap-6">
      <p className="font-open-sans text-body text-text leading-relaxed mb-2">{text}</p>
      <div className="w-full h-px bg-gray-300 mb-5" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-start">
          <div className="font-open-sans text-base font-bold text-text mb-0.5">{name}</div>
          <div className="font-open-sans text-[13px] text-text">
            <span>{role}</span>
            <span style={{ color: orgColor }}> @ {org}</span>
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-md shrink-0" />
      </div>
    </div>
  );
};

export default TestimonialCard;
