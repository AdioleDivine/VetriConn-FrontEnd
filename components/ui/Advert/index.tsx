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
        <span>Product Research |</span>
        <Link href={"/"}>Help us launch better</Link>
      </p>

      <IoIosClose title="close"
        onClick={() => setIsOpen( open => !open)}
      />

    </div>
  );
};

export default Advert;
