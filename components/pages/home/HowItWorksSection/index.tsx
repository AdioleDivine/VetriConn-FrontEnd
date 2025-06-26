import CircleCheckIcon from "@/public/images/circle_check.svg";
import styles from "./index.module.scss";

const benefits = [
  {
    title: "More Convenient",
    description:
      "VetriConn’s user-friendly platform makes it easy to create a profile and apply for jobs, saving time and simplifying the entire process.",
  },
  {
    title: "More Connected",
    description:
      "Our provider app, Forstix, enhances the on-demand experience by automatically matching job requests with available Forstixers based on real-time location, availability, and other smart criteria—so you don’t have to search; the app finds the right match for you.",
  },
  {
    title: "Stronger Communities",
    description:
      "At VetriConn, people come first. Connecting retirees and veterans with meaningful work and volunteer opportunities, we help strengthen communities. Organizations benefit from experienced support, our users gain purpose, income, and connection—neighbors supporting neighbors, creating a true win-win.",
  },
];

export const HowItWorksSection = () => (
  <div className={styles.howItWorksContainer}>
    <h1>Benefits of Using VetriConn</h1>
    {benefits.map((benefit, idx) => (
      <div key={idx} className={styles.benefitItem}>
       <span className={styles.icon}><CircleCheckIcon /></span>
        <div>
          <strong>{benefit.title}</strong>
          <p>{benefit.description}</p>
        </div>
      </div>
    ))}
  </div>
);
