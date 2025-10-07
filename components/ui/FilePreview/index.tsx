"use client";
import React from "react";
import styles from "./index.module.scss";
import { IoDocumentText } from "react-icons/io5";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  onRemove,
  disabled = false,
}) => {
  // Get file icon based on file type
  const getFileIcon = (): React.ReactNode => {
    const filename = file.name.toLowerCase();

    // Debug logging
    console.log(
      "File:",
      file.name,
      "Type:",
      file.type,
      "Extension check:",
      filename.includes(".pdf")
    );

    if (file.type === "application/pdf" || filename.includes(".pdf")) {
      return <BsFillFileEarmarkPdfFill className={styles.fileIconSvg} />;
    }
    if (
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      filename.includes(".doc") ||
      filename.includes(".docx")
    ) {
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

  return (
    <div className={styles.selectedFileCard}>
      <div className={styles.fileIcon}>{getFileIcon()}</div>
      <div className={styles.fileInfo}>
        <div className={styles.fileName}>{file.name}</div>
        <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
      </div>
      <button
        className={styles.removeFileBtn}
        onClick={onRemove}
        disabled={disabled}
      >
        ×
      </button>
    </div>
  );
};
