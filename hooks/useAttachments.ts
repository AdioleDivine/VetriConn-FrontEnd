import { useState, useCallback } from "react";
import useSWR from "swr";
import {
  getUserAttachments,
  uploadAttachments,
  deleteAttachment,
  updateAttachment,
  Attachment,
} from "@/lib/api";

export function useAttachments() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch attachments using SWR
  const { data, error, mutate, isLoading } = useSWR(
    "/attachments",
    getUserAttachments
  );

  const attachments = data?.data?.attachments || [];

  // Upload files
  const uploadFiles = useCallback(
    async (files: File[]) => {
      if (!files || files.length === 0) {
        throw new Error("No files provided for upload");
      }

      setIsUploading(true);
      setUploadProgress(0);

      try {
        // Use the updated uploadAttachments function that handles sequential uploads
        const result = await uploadAttachments(files);

        setUploadProgress(100);

        // Refresh the attachments list
        await mutate();

        return result;
      } catch (error) {
        console.error("Upload failed:", error);
        throw error;
      } finally {
        setIsUploading(false);
        setTimeout(() => setUploadProgress(0), 1000);
      }
    },
    [mutate]
  );

  // Delete attachment
  const deleteAttachmentById = useCallback(
    async (attachmentId: string) => {
      try {
        const result = await deleteAttachment(attachmentId);

        // Refresh the attachments list
        await mutate();

        return result;
      } catch (error) {
        console.error("Delete failed:", error);
        throw error;
      }
    },
    [mutate]
  );

  // Update attachment
  const updateAttachmentById = useCallback(
    async (
      attachmentId: string,
      updateData: { name?: string; [key: string]: unknown }
    ) => {
      try {
        const result = await updateAttachment(attachmentId, updateData);

        // Refresh the attachments list
        await mutate();

        return result;
      } catch (error) {
        console.error("Update failed:", error);
        throw error;
      }
    },
    [mutate]
  );

  // Refresh attachments
  const refreshAttachments = useCallback(() => {
    return mutate();
  }, [mutate]);

  return {
    attachments,
    isLoading,
    error: error?.message || null,
    isUploading,
    uploadProgress,
    uploadFiles,
    deleteAttachment: deleteAttachmentById,
    updateAttachment: updateAttachmentById,
    refreshAttachments,
  };
}
