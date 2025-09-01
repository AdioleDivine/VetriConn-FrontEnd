"use client"
import React, { useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { IoIosClose } from "react-icons/io"
const Advert = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`${styles.container}  ${isOpen ? styles.open : ""}`}>
      <p className={styles.advertText}>
        <span>We are conducting Product Research |</span>
        <Link href={"https://forms.gle/Bdwab4EUHJ2eAUu88"}>Take the survey to help us launch better</Link>
      </p>

      <IoIosClose title="close"
        onClick={() => setIsOpen( open => !open)}
      />

    </div>
  );
};

export default Advert;
