"use client";
import React, { useState } from "react";
import styles from "./index.module.scss";
import { FaEllipsisV, FaTrash, FaDownload } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { Attachment } from "@/lib/api";

interface AttachmentCardProps {
  attachment: Attachment;
  onDelete: (attachment: Attachment) => void;
  onDownload: (attachment: Attachment) => void;
}

export const AttachmentCard: React.FC<AttachmentCardProps> = ({
  attachment,
  onDelete,
  onDownload,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get file icon from URL/filename or attachment object
  const getFileIcon = (): React.ReactNode => {
    const filename = (attachment?.name || attachment.url?.split("/").pop() || "").toLowerCase();
    
    console.log('Attachment:', attachment.name, 'URL:', attachment.url, 'Extension check:', filename.includes('.pdf'));
    
    if (filename.includes(".pdf")) {
      return <BsFillFileEarmarkPdfFill className={styles.fileIconSvg} />;
    }
    if (filename.includes(".doc") || filename.includes(".docx")) {
      return <IoDocumentText className={styles.fileIconSvg} />;
    }
    return <IoDocumentText className={styles.fileIconSvg} />;
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload(attachment);
    setIsMenuOpen(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(attachment);
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  const attachmentId = attachment.id || attachment._id || '';

  return (
    <div className={styles.attachmentCard}>
      <div className={styles.attachmentPreview}>
        <div className={styles.fileIcon}>
          {getFileIcon()}
        </div>
      </div>
      <div className={styles.attachmentLabel}>{attachment.name}</div>
      <div className={styles.attachmentFooter}>
        <div className={styles.attachmentSize}>
          {attachment.size || attachment.file_size
            ? formatFileSize(attachment.size || attachment.file_size || 0)
            : ""}
        </div>
        <div className={styles.menuContainer}>
          <button
            className={styles.kebabMenuBtn}
            onClick={handleMenuToggle}
            title="More options"
          >
            <FaEllipsisV />
          </button>
          {isMenuOpen && (
            <div className={styles.dropdown}>
              <button
                className={styles.dropdownItem}
                onClick={handleDownload}
              >
                <FaDownload />
                Download
              </button>
              <button
                className={styles.dropdownItem}
                onClick={handleDelete}
              >
                <FaTrash />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};