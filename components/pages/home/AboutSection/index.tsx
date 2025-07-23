import React from "react";
import styles from "./index.module.scss";

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
  <div className={styles.aboutContainer} id={id}>
    <h1>About VetriConn</h1>
    {aboutContent.map((block, index) => {
      if (block.type === "paragraph") {
        return <p key={index}>{block.text}</p>;
      }

      if (block.type === "list") {
        const ListTag = block.ordered ? "ol" : "ul";
        return (
          <ListTag key={index}>
            {block.items?.map((item, i) => (
              <li key={i}>
                {block.ordered ? <strong>{item}</strong> : item}
              </li>
            ))}
            <br/>
          </ListTag>
        );
      }

      return null;
    })}
  </div>
);

