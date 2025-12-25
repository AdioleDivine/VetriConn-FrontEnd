"use client";

import { ReactNode } from "react";

// SVG Icons as components for better control
const ConvenienceIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="24" fill="#FEE2E2" />
    <path
      d="M24 14V24L30 27"
      stroke="#E53E3E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z"
      stroke="#E53E3E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ConnectedIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="24" fill="#FEE2E2" />
    <path
      d="M20 28C20 28 21.5 30 24 30C26.5 30 28 28 28 28"
      stroke="#E53E3E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21H21.01"
      stroke="#E53E3E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27 21H27.01"
      stroke="#E53E3E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 34C29.5228 34 34 29.5228 34 24C34 18.4772 29.5228 14 24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34Z"
      stroke="#E53E3E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CommunityIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="24" fill="#FEE2E2" />
    <path
      d="M30 32V30C30 28.9391 29.5786 27.9217 28.8284 27.1716C28.0783 26.4214 27.0609 26 26 26H22C20.9391 26 19.9217 26.4214 19.1716 27.1716C18.4214 27.9217 18 28.9391 18 30V32"
      stroke="#E53E3E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 22C26.2091 22 28 20.2091 28 18C28 15.7909 26.2091 14 24 14C21.7909 14 20 15.7909 20 18C20 20.2091 21.7909 22 24 22Z"
      stroke="#E53E3E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M35 32V30C34.9993 29.1137 34.7044 28.2528 34.1614 27.5523C33.6184 26.8519 32.8581 26.3516 32 26.13"
      stroke="#E53E3E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29 14.13C29.8604 14.3503 30.623 14.8507 31.1676 15.5523C31.7122 16.2539 32.0078 17.1168 32.0078 18.005C32.0078 18.8932 31.7122 19.7561 31.1676 20.4577C30.623 21.1593 29.8604 21.6597 29 21.88"
      stroke="#E53E3E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface Benefit {
  icon: ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <ConvenienceIcon />,
    title: "More Convenient",
    description:
      "VetriConn's intuitive, user-friendly platform makes it simple to create a profile and apply for jobs, saving time and reducing stress. Whether you're looking for part-time work, volunteer opportunities, or ways to stay engaged, we help you connect with meaningful roles quickly and effortlessly.",
  },
  {
    icon: <ConnectedIcon />,
    title: "More Connected",
    description:
      "With personalized job alerts and tailored opportunity notifications, users receive updates that align with their skills, preferences, and interests. VetriConn goes beyond generic listings—our platform curates opportunities specifically suited to your experience and lifestyle.",
  },
  {
    icon: <CommunityIcon />,
    title: "Stronger Communities",
    description:
      "By connecting retirees and veterans with purposeful work and volunteer opportunities, we help strengthen communities. Organizations gain valuable experienced support, while our users find purpose, income, and connection—creating a true win-win for everyone.",
  },
];

interface BenefitCardProps {
  benefit: Benefit;
}

const BenefitCard = ({ benefit }: BenefitCardProps) => (
  <article className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] mobile:p-6">
    <div className="mb-5 mobile:mb-4">{benefit.icon}</div>
    <h3 className="heading-3 mb-3 mobile:mb-2">{benefit.title}</h3>
    <p className="body-text m-0">{benefit.description}</p>
  </article>
);

interface BenefitsSectionProps {
  id?: string;
}

export const BenefitsSection = ({ id }: BenefitsSectionProps) => (
  <section
    id={id}
    className="py-20 bg-gray-bg mobile:py-12"
    aria-labelledby="benefits-heading"
  >
    <div className="container-main">
      {/* Headline with mixed typography */}
      <div className="text-center max-w-3xl mx-auto mb-14 mobile:mb-10">
        <h2 id="benefits-heading" className="heading-1 mb-5 mobile:mb-4">
          Why Choose{" "}
          <span className="text-primary">VetriConn</span>?
        </h2>
        <p className="body-text text-lg mobile:text-base">
          Discover how our platform makes finding meaningful opportunities easier,
          more personalized, and more impactful for retirees and veterans across Canada.
        </p>
      </div>

      {/* 3-column grid of benefit cards */}
      <div className="grid grid-cols-3 gap-8 mobile:grid-cols-1 mobile:gap-6">
        {benefits.map((benefit, idx) => (
          <BenefitCard key={idx} benefit={benefit} />
        ))}
      </div>
    </div>
  </section>
);
