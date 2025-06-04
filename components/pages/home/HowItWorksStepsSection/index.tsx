import styles from "./index.module.scss";
import UserIcon from "@/public/images/user.svg";
import UploadIcon from "@/public/images/upload.svg";
import BellIcon from "@/public/images/bell.svg";

const steps = [
  {
    icon: <UserIcon />,
    title: "Create Your Free Account",
    description:
      "Sign up in seconds to access job opportunities tailored to your skills and experience.",
  },
  {
    icon: <UploadIcon />,
    title: "Upload Your Credentials",
    description:
      "Easily upload your resume and any required certifications to complete your profile.",
  },
  {
    icon: <BellIcon />,
    title: "Get Matched and Notified",
    description:
      "Receive instant alerts when jobs that fit your profile go live—never miss an opportunity.",
  },
];

const HowItWorksStepsSection = () => (
  <section className={styles.howItWorksStepsSection}>
    <div className={styles.inner}>
      <h2 className={styles.heading}>How it works</h2>
      <div className={styles.stepsRow}>
        {steps.map((step, idx) => (
          <div className={styles.step} key={idx}>
            <div className={styles.icon}>{step.icon}</div>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksStepsSection;
