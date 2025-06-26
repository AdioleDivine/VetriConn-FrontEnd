import React from "react";
import styles from "./index.module.scss";

export const AboutSection = () => (
  <div className={styles.aboutContainer}>
    <h1>About VetriConn</h1>
    <p>
      At Vetriconn, our mission is to strengthen the Canadian workforce and economy by reconnecting Canadian retirees and veterans with flexible work, volunteer, and remote opportunities. We believe in offering renewed purpose, engagement, and community for those transitioning from full-time service into retirement.
    </p>
    <p>
      Our streamlined platform makes it easy for retirees and veterans to explore and access:
    </p>
    <ol>
      <li><strong>Part-time positions</strong></li>
      <li><strong>Full-time roles</strong></li>
      <li><strong>Volunteer opportunities</strong></li>
    </ol>
    <br />
    <p>
      Vetriconn is committed to making workforce re-entry smooth and fulfilling by:
    </p>
    <ul>
      <li>Featuring job postings tailored specifically for retirees and veterans.</li>
      <li>Automating job matches based on individual experience and interests.</li>
      <li>Offering hands-on support with resume building and application processes.</li>
      <li>Promoting opportunities for community involvement and volunteer work.</li>
    </ul>
    <br />
    <p>
      By helping retirees and veterans find purpose, income, and connection, Vetriconn contributes to closing labour gaps and building a stronger, more inclusive Canadian workforce.
    </p>
  </div>
);
