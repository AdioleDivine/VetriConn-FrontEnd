"use client";
import React from "react";
import { IoDocumentText } from "react-icons/io5";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  disabled?: boolean;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove, disabled = false }) => {
  const getFileIcon = (): React.ReactNode => {
    const filename = file.name.toLowerCase();
    if (file.type === "application/pdf" || filename.includes(".pdf")) return <BsFillFileEarmarkPdfFill className="w-6 h-6 text-primary" />;
    return <IoDocumentText className="w-6 h-6 text-primary" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-lg p-3 gap-3 transition-all duration-200 hover:border-primary hover:shadow-[0_2px_8px_rgba(220,38,38,0.1)]">
      <div className="flex items-center justify-center w-10 h-10 bg-red-50 rounded-md shrink-0">{getFileIcon()}</div>
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div className="text-[15px] font-semibold text-gray-700 leading-tight overflow-hidden text-ellipsis whitespace-nowrap text-left">{file.name}</div>
        <div className="text-[13px] text-gray-500 font-medium">{formatFileSize(file.size)}</div>
      </div>
      <button className="bg-transparent border-none text-gray-400 text-xl cursor-pointer p-1 rounded shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-200 hover:enabled:bg-red-100 hover:enabled:text-primary disabled:opacity-50 disabled:cursor-not-allowed" onClick={onRemove} disabled={disabled}>×</button>
    </div>
  );
};
