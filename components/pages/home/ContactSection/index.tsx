import styles from "./index.module.scss";
import FacebookIcon from "@/public/images/facebook.svg";
import LocationIcon from "@/public/images/location.svg";
import CallCallingIcon from "@/public/images/call-calling.svg";
import SmsIcon from "@/public/images/sms.svg";
import SmsTrackingIcon from "@/public/images/sms-tracking.svg";
import { FiLinkedin } from "react-icons/fi";

interface ContactSectionProps {
  id?: string;
}

const ContactSection = ({ id }: ContactSectionProps) => (
  <section className={styles.contactSection} id={id}>
    <h1 className={styles.heading}>Get In Touch</h1>
    <div className={styles.contentWrapper}>
      <form className={styles.form}>
        <h2>
          Send a message{" "}
          <span className={styles.icon}>
            <SmsTrackingIcon />
          </span>
        </h2>
        <input type="text" placeholder="Full name" className={styles.input} />
        <input
          type="email"
          placeholder="Email address"
          className={styles.input}
        />
        <textarea
          placeholder="Description"
          className={styles.textarea}
          rows={6}
        />
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
      <div className={styles.infoCard}>
        <h2 className={styles.infoHeading}>Contact information</h2>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>
            <LocationIcon />
          </span>
          <span>Ottawa, Ontario.</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>
            <CallCallingIcon />
          </span>
          <span>
            English - 1(647)-889-9542 <br />
            <br /> French - 1(613)-501-9162
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>
            <SmsIcon />
          </span>
          <span>richmonda@vetriconn.ca</span>
        </div>
        <div className={styles.socials}>
          <a
            href="https://www.facebook.com/profile.php?id=61580233844003"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.linkedin.com/company/vetriconn-inc/?viewAsMember=true"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
          {/* <a href="#" aria-label="X">
            <XIcon />
          </a> */}
        </div>
      </div>
    </div>
  </section>
);
export default ContactSection;
