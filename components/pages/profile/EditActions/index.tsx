"use client";
import React from "react";
import styles from "./index.module.scss";

interface EditActionsProps {
  isEditing: boolean;
  isSaving?: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export const EditActions: React.FC<EditActionsProps> = ({
  isEditing,
  isSaving = false,
  onSave,
  onCancel,
}) => {
  if (!isEditing) return null;

  return (
    <div className={styles.editActions}>
      <div className={styles.editButtons}>
        <button
          className={styles.cancelBtn}
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
        <button className={styles.saveBtn} onClick={onSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};
