"use client";
import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import { useAttachments } from "@/hooks/useAttachments";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Attachment } from "@/lib/api";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useToaster } from "@/components/ui/Toaster";

interface AttachmentsSectionProps {
  className?: string;
}

export const AttachmentsSection: React.FC<AttachmentsSectionProps> = () => {
  const {
    attachments,
    isLoading,
    error,
    isUploading,
    uploadProgress,
    uploadFiles,
    deleteAttachment,
    refreshAttachments,
  } = useAttachments();

  const { showToast } = useToaster();

  // File upload states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Validate file type
  const isValidFileType = (file: File): boolean => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const allowedExtensions = [".pdf", ".doc", ".docx"];

    return (
      allowedTypes.includes(file.type) ||
      allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
    );
  };

  // Handle file selection
  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter(isValidFileType);

    if (validFiles.length !== files.length) {
      // Show error toast for invalid files
      console.warn(
        "Some files were rejected. Only PDF, DOC, and DOCX files are allowed."
      );
    }

    setSelectedFiles((prev) => [...prev, ...validFiles]);
  };

  // Handle file input change
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileSelect(event.target.files);
  };

  // Handle drag events
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    handleFileSelect(event.dataTransfer.files);
  };

  // Handle click to open file dialog
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Remove selected file
  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle final upload
  const handleFinalUpload = async () => {
    if (selectedFiles.length === 0) return;

    try {
      await uploadFiles(selectedFiles);

      // Clear selected files after successful upload
      setSelectedFiles([]);

      showToast({
        type: "success",
        title: "Upload successful",
        description: `${selectedFiles.length} file${
          selectedFiles.length > 1 ? "s" : ""
        } uploaded successfully`,
      });
    } catch (error) {
      console.error("Upload failed:", error);

      showToast({
        type: "error",
        title: "Upload failed",
        description:
          error instanceof Error ? error.message : "Failed to upload files",
      });
    }
  };

  // Handle attachment deletion
  const handleDeleteAttachment = async (attachment: Attachment) => {
    const attachmentId = attachment.id || attachment._id;
    if (!attachmentId) {
      console.error("No attachment ID found");
      return;
    }

    try {
      await deleteAttachment(attachmentId);

      showToast({
        type: "success",
        title: "Attachment deleted",
        description: "Attachment has been removed successfully",
      });
    } catch (error) {
      console.error("Delete failed:", error);

      showToast({
        type: "error",
        title: "Delete failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to delete attachment",
      });
    }
  };

  // Get file icon based on file type
  const getFileIcon = (file: File): string => {
    if (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    ) {
      return "📄";
    }
    return "📝";
  };

  // Get file icon from URL/filename
  const getFileIconFromUrl = (url: string): string => {
    const filename = url.split("/").pop() || "";
    if (filename.toLowerCase().endsWith(".pdf")) {
      return "📄";
    }
    return "📝";
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.attachmentsSection}>
        <div className={styles.attachmentsHeader}>
          <h3 className={styles.attachmentsTitle}>Attachments</h3>
          {attachments.length > 0 && (
            <button className={styles.attachmentsUploadBtn} disabled>
              Upload <span style={{ fontSize: "1.2em", marginLeft: 4 }}>+</span>
            </button>
          )}
        </div>
        <div className={styles.attachmentsGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.attachmentCard}>
              <Skeleton width="120px" height="90px" />
              <Skeleton width="80%" height="16px" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={styles.attachmentsSection}>
        <div className={styles.attachmentsHeader}>
          <h3 className={styles.attachmentsTitle}>Attachments</h3>
          {attachments.length > 0 && (
            <button className={styles.attachmentsUploadBtn}>
              Upload <span style={{ fontSize: "1.2em", marginLeft: 4 }}>+</span>
            </button>
          )}
        </div>
        <ErrorState
          title="Failed to load attachments"
          message={error}
          onRetry={() => refreshAttachments()}
        />
      </div>
    );
  }

  return (
    <div className={styles.attachmentsSection}>
      <div className={styles.attachmentsHeader}>
        <h3 className={styles.attachmentsTitle}>Attachments</h3>
        {attachments.length > 0 && (
          <button
            className={styles.attachmentsUploadBtn}
            onClick={handleUploadClick}
          >
            Upload <span style={{ fontSize: "1.2em", marginLeft: 4 }}>+</span>
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />

      <div className={styles.attachmentsGrid}>
        {attachments.length === 0 && selectedFiles.length === 0 ? (
          <div
            className={`${styles.emptyState} ${
              isDragging ? styles.dragging : ""
            }`}
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className={styles.uploadIcon}>
              <FaPlus />
            </div>
            <p className={styles.emptyStateText}>
              Add your resume, portfolio, or other documents
            </p>
            <p className={styles.emptyStateSubtext}>
              Click to browse or drag and drop PDF, DOC, or DOCX files here
            </p>
          </div>
        ) : (
          <>
            {/* Existing attachments */}
            {attachments.map((attachment: Attachment) => (
              <div
                key={attachment.id || attachment._id}
                className={styles.attachmentCard}
              >
                <div className={styles.attachmentPreview}>
                  <div className={styles.fileIcon}>
                    {getFileIconFromUrl(attachment.url)}
                  </div>
                  <button
                    className={styles.deleteAttachmentBtn}
                    onClick={() => handleDeleteAttachment(attachment)}
                    title="Delete attachment"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className={styles.attachmentLabel}>{attachment.name}</div>
                <div className={styles.attachmentSize}>
                  {attachment.size || attachment.file_size
                    ? formatFileSize(
                        attachment.size || attachment.file_size || 0
                      )
                    : ""}
                </div>
              </div>
            ))}

            {/* Selected files waiting for upload */}
            {selectedFiles.map((file, index) => (
              <div
                key={`selected-${index}`}
                className={styles.selectedFileCard}
              >
                <div className={styles.fileIcon}>{getFileIcon(file)}</div>
                <div className={styles.fileInfo}>
                  <div className={styles.fileName}>{file.name}</div>
                  <div className={styles.fileSize}>
                    {formatFileSize(file.size)}
                  </div>
                </div>
                <button
                  className={styles.removeFileBtn}
                  onClick={() => removeSelectedFile(index)}
                  disabled={isUploading}
                >
                  ×
                </button>
              </div>
            ))}

            {/* Add more files button */}
            <div
              className={`${styles.addMoreCard} ${
                isDragging ? styles.dragging : ""
              }`}
              onClick={handleUploadClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className={styles.uploadIcon}>
                <FaPlus />
              </div>
              <p className={styles.addMoreText}>Add more</p>
            </div>
          </>
        )}
      </div>

      {/* Upload button for selected files */}
      {selectedFiles.length > 0 && (
        <div className={styles.uploadActions}>
          <button
            className={styles.finalUploadBtn}
            onClick={handleFinalUpload}
            disabled={isUploading}
          >
            {isUploading
              ? `Uploading... ${Math.round(uploadProgress)}%`
              : `Upload ${selectedFiles.length} file${
                  selectedFiles.length > 1 ? "s" : ""
                }`}
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setSelectedFiles([])}
            disabled={isUploading}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Upload progress bar */}
      {isUploading && (
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};
