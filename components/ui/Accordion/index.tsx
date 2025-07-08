/**
 * Accordion Component
 *
 * A reusable, accessible, and stylable accordion (expand/collapse) component for displaying content such as FAQs, panels, or any expandable section.
 *
 * @param {string} [className] - Additional CSS class(es) to apply to the root element. Useful for custom styling or layout.
 * @param {React.ReactNode} title - The main label or heading for the accordion. Displayed in the clickable header/button.
 * @param {React.ReactNode} [symbol] - The symbol/icon to show on the right (e.g., plus/minus, chevron). Optional.
 * @param {React.ReactNode} [content] - The content to display when the accordion is open. Can be used instead of or with children.
 * @param {boolean} open - Controls whether the accordion is expanded (true) or collapsed (false).
 * @param {() => void} onToggle - Callback function called when the header/button is clicked. Used to toggle the open state.
 * @param {React.ReactNode} [children] - Additional content to render inside the expanded panel, after content.
 */
import React from "react";
import styles from "./index.module.scss";

interface AccordionProps {
  /** Additional CSS class(es) to apply to the root element. Useful for custom styling or layout. */
  className?: string;
  /** The main label or heading for the accordion. Displayed in the clickable header/button. */
  title: React.ReactNode;
  /** The symbol/icon to show on the right (e.g., plus/minus, chevron). Optional. */
  symbol?: React.ReactNode;
  /** The content to display when the accordion is open. Can be used instead of or with children. */
  content?: React.ReactNode;
  /** Controls whether the accordion is expanded (true) or collapsed (false). */
  open: boolean;
  /** Callback function called when the header/button is clicked. Used to toggle the open state. */
  onToggle: () => void;
  /** Additional content to render inside the expanded panel, after content. */
  children?: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  className = "",
  title,
  symbol,
  content,
  open,
  onToggle,
  children,
}) => {
  return (
    <div
      className={`${styles["accordion-root"]} ${
        open ? styles.open : ""
      } ${className}`}
    >
      <button
        className={styles["accordion-question"]}
        onClick={onToggle}
        aria-expanded={open}
        type="button"
      >
        <span>{title}</span>
        <span className={`${styles["accordion-symbol"]} ${open ? styles.open : ""}`}>{symbol}</span>
      </button>
      <div className={`${styles["accordion-content"]} ${
        open ? styles.open : ""
      }`}>
        {open && (
          <div>
            {content}
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
