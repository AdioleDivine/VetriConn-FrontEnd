"use client";
import React, { useState } from "react";
import styles from "./index.module.scss";
import { Accordion } from "@/components/ui/Accordion";
import accordionStyles from "@/components/ui/Accordion/index.module.scss";
import { FaPlus, FaMinus } from "react-icons/fa6";
const faqs = [
  {
    question: "Is VetriConn Safe to use?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Urna vulputate neque arcu eget. Senectus scelerisque egestas quisque tortor elit eget bibendum amet aliquam. Pellentesque consectetur non non imperdiet. Sed tincidunt viverra a aliquet placerat porta tortor. Adipiscing tortor eu commodo sem in enim sit libero. Odio volutpat nunc tortor felis nibh sodales id. Vestibulum tristique convallis nec pulvinar etiam nullam elit neque.",
  },
  // Add more FAQ items as needed
  { question: "Is VetriConn Safe to use?", answer: "Same answer as above." },
  { question: "Is VetriConn Safe to use?", answer: "Same answer as above." },
  { question: "Is VetriConn Safe to use?", answer: "Same answer as above." },
  { question: "Is VetriConn Safe to use?", answer: "Same answer as above." },
  { question: "Is VetriConn Safe to use?", answer: "Same answer as above." },
  { question: "Is VetriConn Safe to use?", answer: "Same answer as above." },
  { question: "Is VetriConn Safe to use?", answer: "Same answer as above." },
];

const splitFaqs = () => {
  const mid = Math.ceil(faqs.length / 2);
  return [faqs.slice(0, mid), faqs.slice(mid)];
};

export const FaqSection = () => {
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
    <section className={styles.faqSection}>
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
