"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const aboutContent = {
  headline: {
    prefix: "A Legacy of Purpose:",
    highlight: "Reconnecting Experience with Opportunity",
  },
  description:
    "At VetriConn, our mission is to strengthen the Canadian workforce and economy by reconnecting Canadian retirees and veterans with flexible work, volunteer, and remote opportunities. We believe in offering renewed purpose, engagement, and community for those transitioning from full-time service into retirement.",
  features: ["Part-time positions", "Full-time roles", "Volunteer opportunities"],
  cta: {
    text: "Explore Opportunities",
    href: "/jobs",
  },
};

// Decorative images positioned closer to content with rotation
const decorativeImages = [
  { src: "/images/Hero/1.svg", alt: "Professional working at desk", rotation: "rotate-[32deg]" },
  { src: "/images/Hero/2.svg", alt: "Team collaboration", rotation: "-rotate-[38deg]" },
  { src: "/images/Hero/3.svg", alt: "Career growth", rotation: "-rotate-[35deg]" },
  { src: "/images/Hero/4.svg", alt: "Community connection", rotation: "rotate-[42deg]" },
];

interface AboutSectionProps {
  id?: string;
}

export const AboutSection = ({ id }: AboutSectionProps) => (
  <section
    id={id}
    className="py-20 bg-gray-light relative overflow-hidden mobile:py-12"
    aria-labelledby="about-heading"
  >
    {/* Decorative images - hidden on screens smaller than 1200px to prevent overlap */}
    <div className="absolute inset-0 pointer-events-none hidden xl:block">
      {/* Top left image */}
      <div className={`absolute top-12 left-[5%] w-36 h-36 rounded-xl overflow-hidden shadow-lg ${decorativeImages[0].rotation}`}>
        <Image
          src={decorativeImages[0].src}
          alt={decorativeImages[0].alt}
          fill
          className="object-cover"
        />
      </div>
      {/* Top right image */}
      <div className={`absolute top-8 right-[5%] w-32 h-32 rounded-xl overflow-hidden shadow-lg ${decorativeImages[1].rotation}`}>
        <Image
          src={decorativeImages[1].src}
          alt={decorativeImages[1].alt}
          fill
          className="object-cover"
        />
      </div>
      {/* Bottom left image */}
      <div className={`absolute bottom-12 left-[3%] w-32 h-32 rounded-xl overflow-hidden shadow-lg ${decorativeImages[2].rotation}`}>
        <Image
          src={decorativeImages[2].src}
          alt={decorativeImages[2].alt}
          fill
          className="object-cover"
        />
      </div>
      {/* Bottom right image */}
      <div className={`absolute bottom-8 right-[3%] w-36 h-36 rounded-xl overflow-hidden shadow-lg ${decorativeImages[3].rotation}`}>
        <Image
          src={decorativeImages[3].src}
          alt={decorativeImages[3].alt}
          fill
          className="object-cover"
        />
      </div>
    </div>

    <div className="container-main relative z-10">
      {/* Centered content area */}
      <div className="text-center max-w-3xl mx-auto">
        {/* Headline with mixed typography */}
        <h2 id="about-heading" className="heading-1 mb-6 mobile:mb-4">
          {aboutContent.headline.prefix}{" "}
          <span className="text-primary">{aboutContent.headline.highlight}</span>
        </h2>

        {/* Supporting description */}
        <p className="body-text text-lg mb-8 mobile:text-base mobile:mb-6">
          {aboutContent.description}
        </p>

        {/* Feature list */}
        <div className="flex justify-center gap-6 mb-10 flex-wrap mobile:flex-col mobile:gap-3 mobile:mb-8">
          {aboutContent.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-text font-semibold"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="text-primary flex-shrink-0"
              >
                <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.1" />
                <path
                  d="M6 10L9 13L14 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href={aboutContent.cta.href}
          className="btn-primary inline-block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {aboutContent.cta.text}
        </Link>
      </div>
    </div>
  </section>
);
