"use client";
import React, { useState } from "react";
import styles from "./index.module.scss";
import { Accordion } from "@/components/ui/Accordion";
import accordionStyles from "@/components/ui/Accordion/index.module.scss";
import { FaPlus, FaMinus } from "react-icons/fa6";
const faqs = [
  {
    question: "What is Vetriconn?",
    answer:
      "Vetriconn is an online platform that connects Canadian retirees and veterans with meaningful employment, volunteer, and mentorship opportunities.",
  },
  // Add more FAQ items as needed
  { question: "Who can use Vetriconn?", answer: "Vetriconn is open to Canadian armed forces veterans, retirees, and any older adult looking to re-engage in the workforce or community life. The Age of acceptance for Vetriconn is 45 years and above." },
  { question: "Is there a cost to use Vetriconn?", answer: "Vetriconn is mostly free for job seekers and community volunteers, Vetriconn does offer premium features for an affordable fee. Employers may also have premium features for a fee." },
  { question: "What types of opportunities are available?", answer: "You can find part-time jobs, consulting work, volunteer roles, seasonal jobs, and community leadership opportunities." },
  { question: " I haven’t worked in years. Can I still apply?", answer: "Absolutely. Many employers on Vetriconn value your experience, leadership, and reliability regardless of the gap." },
  { question: " How do job or volunteer matches work?", answer: "Our platform uses a mix of your preferences and skills to recommend tailored opportunities, including nearby listings." },
  { question: " I’m not tech-savvy. Can I still use Vetriconn?", answer: "Vetriconn is designed to be user-friendly. If you need help, our support team is here for you by phone or email." },
  { question: " Can I browse anonymously or hide my profile?", answer: "Yes. You can adjust your privacy settings to hide your profile from employers or make it visible only when you apply." },
];

const splitFaqs = () => {
  const mid = Math.ceil(faqs.length / 2);
  return [faqs.slice(0, mid), faqs.slice(mid)];
};

interface FaqSectionProps {
  id?: string;
}

export const FaqSection = ({ id }: FaqSectionProps) => {
  const [openIndexes, setOpenIndexes] = useState<
    [number | null, number | null]
  >([null, null]);
  const [leftFaqs, rightFaqs] = splitFaqs();

  const handleToggle = (col: 0 | 1, idx: number) => {
    setOpenIndexes((prev) => {
      const newIndexes: [number | null, number | null] = [...prev];
      newIndexes[col] = prev[col] === idx ? null : idx;
      return newIndexes;
    });
  };

  return (
    <section className={styles.faqSection} id={id}>
      <h2 className={styles.title}>
        Got Questions?
        <br />
        We&apos;ve Got Answers
      </h2>
      <div className={styles.faqGrid}>
        <div className={styles.faqCol}>
          {leftFaqs.map((faq, idx) => (
            <Accordion
              key={idx}
              className={styles.faqItem + " " + accordionStyles.open}
              title={faq.question}
              symbol={openIndexes[0] === idx ? <FaMinus /> : <FaPlus />}
              content={faq.answer}
              open={openIndexes[0] === idx}
              onToggle={() => handleToggle(0, idx)}
            />
          ))}
        </div>
        <div className={styles.faqCol}>
          {rightFaqs.map((faq, idx) => (
            <Accordion
              key={idx+4}
              className={styles.faqItem + " " + accordionStyles.open}
              title={faq.question}
              symbol={openIndexes[0] === idx+4 ? <FaMinus /> : <FaPlus />}
              content={faq.answer}
              open={openIndexes[0] === idx+4}
              onToggle={() => handleToggle(0, idx+4)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
