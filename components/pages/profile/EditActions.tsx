"use client";
import React from "react";

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
    <div className="flex justify-center p-8 bg-white rounded-lg mx-8 my-6 border border-gray-200 tablet:mx-3 tablet:p-6 mobile:mx-2 mobile:p-4">
      <div className="flex gap-4 max-w-[400px] w-full tablet:flex-col tablet:max-w-none tablet:gap-4">
        <button
          className="flex items-center justify-center gap-2 bg-gray-100 text-gray-500 border-2 border-gray-300 py-4 px-8 rounded-lg cursor-pointer text-base font-semibold transition-all flex-1 hover:bg-gray-200 hover:text-gray-700 hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none disabled:shadow-none"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
        <button
          className="flex items-center justify-center gap-2 bg-primary text-white border-none py-4 px-8 rounded-lg cursor-pointer text-base font-semibold transition-all flex-1 hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none disabled:shadow-none"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};
