import React from "react";

const aboutContent = [
  {
    type: "paragraph",
    text: "At Vetriconn, our mission is to strengthen the Canadian workforce and economy by reconnecting Canadian retirees and veterans with flexible work, volunteer, and remote opportunities. We believe in offering renewed purpose, engagement, and community for those transitioning from full-time service into retirement.",
  },
  {
    type: "paragraph",
    text: "Our streamlined platform makes it easy for retirees and veterans to explore and access:",
  },
  {
    type: "list",
    ordered: true,
    items: ["Part-time positions", "Full-time roles", "Volunteer opportunities"],
  },
  {
    type: "paragraph",
    text: "Vetriconn is committed to making workforce re-entry smooth and fulfilling by:",
  },
  {
    type: "list",
    ordered: false,
    items: [
      "Featuring job postings tailored specifically for retirees and veterans.",
      "Automating job matches based on individual experience and interests.",
      "Offering hands-on support with resume building and application processes.",
      "Promoting opportunities for community involvement and volunteer work.",
    ],
  },
  {
    type: "paragraph",
    text: "By helping retirees and veterans find purpose, income, and connection, Vetriconn contributes to closing labour gaps and building a stronger, more inclusive Canadian workforce.",
  },
];

interface AboutSectionProps {
  id?: string;
}

export const AboutSection = ({ id }: AboutSectionProps) => (
  <div
    className="bg-[#fcfcfc] rounded-2xl py-12 px-8 shadow-sm mobile:py-6 mobile:px-5 mobile:rounded-xl"
    id={id}
  >
    <h1 className="heading-1 mb-8 mobile:mb-5">About VetriConn</h1>
    {aboutContent.map((block, index) => {
      if (block.type === "paragraph") {
        return (
          <p key={index} className="font-open-sans text-base text-text-muted leading-relaxed mb-5 mobile:text-sm mobile:mb-4">
            {block.text}
          </p>
        );
      }
      if (block.type === "list") {
        const ListTag = block.ordered ? "ol" : "ul";
        return (
          <ListTag
            key={index}
            className={`font-open-sans text-base text-text-muted leading-relaxed mb-5 m-0 pl-6 mobile:text-sm mobile:pl-5 mobile:mb-4 ${
              block.ordered ? "list-decimal" : "list-disc"
            }`}
          >
            {block.items?.map((item, i) => (
              <li key={i} className="pl-4">
                {block.ordered ? <strong>{item}</strong> : item}
              </li>
            ))}
            <br />
          </ListTag>
        );
      }
      return null;
    })}
  </div>
);
