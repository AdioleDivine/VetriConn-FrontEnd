import React from "react";
import DottedBox from "@/public/images/dotted_box.svg";
import BlueCircle from "@/public/images/blue_circle.svg";
import TestimonialCard from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    text: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."`,
    name: "John Doe",
    role: "Front-end Developer",
    org: "Charity13",
    orgColor: "#E53E3E",
  },
  {
    text: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."`,
    name: "John Doe",
    role: "Front-end Developer",
    org: "Charity13",
    orgColor: "#E53E3E",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="relative bg-white py-24 pb-28 min-h-[400px] overflow-hidden">
      <DottedBox className="absolute top-10 left-2 w-[70px] h-auto z-0" />
      <BlueCircle className="absolute top-14 left-10 w-[22px] h-[22px] z-[1]" />
      <DottedBox className="absolute bottom-6 right-6 w-[70px] h-auto z-0" />
      <BlueCircle className="absolute bottom-10 right-14 w-[22px] h-[22px] z-[1]" />
      <h2 className="font-lato text-heading-2 text-text text-center mb-10">What other&apos;s have to say</h2>
      <div className="flex items-center justify-center gap-8 relative mobile:flex-col mobile:gap-10">
        <span className="w-[18px] h-[18px] rounded-full bg-gray-300 inline-block mx-6 mobile:my-6 mobile:mx-0" />
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
        <span className="w-[18px] h-[18px] rounded-full bg-[#17406d] inline-block mx-6 mobile:my-6 mobile:mx-0" />
      </div>
    </section>
  );
};
