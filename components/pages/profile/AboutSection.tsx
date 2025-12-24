"use client";
import React from "react";

interface AboutSectionProps {
  bio: string;
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  bio,
  isEditing,
  onInputChange,
}) => {
  return (
    <div className="p-8 tablet:p-4">
      <h3 className="text-2xl font-semibold text-text m-0 mb-4">About</h3>
      {isEditing ? (
        <textarea
          value={bio}
          onChange={(e) => onInputChange("bio", e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg text-base leading-relaxed resize-y min-h-[120px] focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)]"
          rows={4}
        />
      ) : (
        <p className="text-base leading-relaxed text-text-muted m-0">{bio}</p>
      )}
    </div>
  );
};
