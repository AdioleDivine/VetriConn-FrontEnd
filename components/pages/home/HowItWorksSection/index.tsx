import CircleCheckIcon from "@/public/images/circle_check.svg";
import styles from "./index.module.scss";

const benefits = [
  {
    title: "More Convenient",
    description:
      "Life is complicated. We use innovation to simplify it. From using artificial intelligence to learn property dimensions to adding a 3D property interface that lets you select which areas to shovel, forstix was designed to make snow removal simpler. By doing more, the app lets you do less.",
  },
  {
    title: "More Connected",
    description:
      "Our provider app – Forstix – unlocks the true potential of an on-demand platform. Job requests are sent to a central server and offered to Forstixers based on their availability, real-time location, and other factors. So don't worry about finding an optimal provider – the app does it for you.",
  },
  {
    title: "Stronger Communities",
    description:
      "We love technology. But people are our true passion. The app brings local communities together to overcome snow. By using the app, you gain back valuable time. Your neighbors serving as Forstix gain additional income. Neighbors helping neighbors – we call that a win-win.",
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
