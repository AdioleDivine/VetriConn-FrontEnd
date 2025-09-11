"use client";
import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

interface AttachmentsSectionProps {
  attachments?: Array<{
    id: number;
    name: string;
    preview: string;
  }>;
}

export const AttachmentsSection: React.FC<AttachmentsSectionProps> = ({
  attachments = [
    {
      id: 1,
      name: "Software Eng Resume.pdf",
      preview: "/images/attachment.avif",
    },
    {
      id: 2,
      name: "Software Eng Resume.pdf",
      preview: "/images/attachment.avif",
    },
    {
      id: 3,
      name: "Software Eng Resume.pdf",
      preview: "/images/attachment.avif",
    },
  ],
}) => {
  return (
    <div className={styles.attachmentsSection}>
      <div className={styles.attachmentsHeader}>
        <h3 className={styles.attachmentsTitle}>Attachments</h3>
        <button className={styles.attachmentsUploadBtn}>
          Upload <span style={{ fontSize: "1.2em", marginLeft: 4 }}>+</span>
        </button>
      </div>
      <div className={styles.attachmentsGrid}>
        {attachments.map((attachment) => (
          <div key={attachment.id} className={styles.attachmentCard}>
            <Image
              src={attachment.preview}
              alt="Attachment Preview"
              width={120}
              height={90}
              className={styles.attachmentImage}
            />
            <div className={styles.attachmentLabel}>{attachment.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
