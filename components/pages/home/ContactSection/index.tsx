import styles from "./index.module.scss";
import FacebookIcon from "@/public/images/facebook.svg";
import InstagramIcon from "@/public/images/instagram.svg";
import XIcon from "@/public/images/X.svg";
import LocationIcon from "@/public/images/location.svg";
import CallCallingIcon from "@/public/images/call-calling.svg";
import SmsIcon from "@/public/images/sms.svg";
import SmsTrackingIcon from "@/public/images/sms-tracking.svg";

const ContactSection = () => (
  <section className={styles.contactSection}>
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
          <span>
            ui fames Cras Street, ridiculus in fringilla arcu interdum ultrices
            Canada
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>
            <CallCallingIcon />
          </span>
          <span>+447 093 3773 373, +447 8363 733 333</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>
            <SmsIcon />
          </span>
          <span>forstix@gmail.com</span>
        </div>
        <div className={styles.socials}>
          <a href="#" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="#" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href="#" aria-label="X">
            <XIcon />
          </a>
        </div>
      </div>
    </div>
  </section>
);
export default ContactSection;
