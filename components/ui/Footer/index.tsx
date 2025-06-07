import styles from "./index.module.scss";
import Logo from "@/public/images/logo_1.svg";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.left}>
          <div className={styles.logoRow}>
            <Logo className={styles.logo} />
          </div>
          <p className={styles.description}>
            &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.&quot;
          </p>
        </div>
        <div className={styles.linksSection}>
          <div className={styles.linkColumn}>
            <div className={styles.linkTitle}>Privacy & Policies</div>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Guide</a>
          </div>
          <div className={styles.linkColumn}>
            <div className={styles.linkTitle}>Company</div>
            <a href="#">About Us</a>
            <a href="#" className={styles.disabled}>
              Careers
            </a>
            <a href="#" className={styles.disabled}>
              FAQs
            </a>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.copyright}>
          © 2024 All rights Reserved. Vetriconn
        </div>
        <div className={styles.socials}>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Twitter">
            <FaXTwitter />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
