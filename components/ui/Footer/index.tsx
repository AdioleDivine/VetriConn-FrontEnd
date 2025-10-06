import Image from "next/image";
import styles from "./index.module.scss";
import Logo from "@/public/images/logo_1.svg";
// import Pipeda from "@/public/images/pipedasvg.svg";
import { FiLinkedin } from "react-icons/fi";
import { LiaFacebookF } from "react-icons/lia";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.left}>
          <div className={styles.logoRow}>
            <Logo className={styles.logo} />
          </div>
          {/* <Pipeda className={styles.logo} /> */}
          <Image
            src="/badge.svg"
            alt="Pipeda Certification Badge"
            height={40}
            width={140}
          />
        </div>
        <div className={styles.linksSection}>
          <div className={styles.linkColumn}>
            <div className={styles.linkTitle}>Privacy & Policies</div>
            <a
              target="_blank"
              href="https://vetriconntandc.notion.site/VETRICONN-INC-TERMS-AND-CONDITIONS-22ac6380202c807fa63ef48c7ca69815"
            >
              Terms & Conditions
            </a>
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
          Vetriconn © 2025 All rights Reserved.
        </div>
        <div className={styles.socials}>
          {/* <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a> */}
          <a
            href="https://www.facebook.com/profile.php?id=61580233844003"
            aria-label="Facebook"
          >
            <LiaFacebookF />
          </a>
          <a
            href="https://www.linkedin.com/company/vetriconn-inc/?viewAsMember=true"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
