"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { FaEdit, FaLinkedin, FaTwitter, FaGithub, FaUserCircle } from "react-icons/fa";
import Image from "next/image";

interface ProfileHeaderProps {
  userProfile: {
    name: string;
    title: string;
    avatar: string;
    bio: string | null;
    socials?: { linkedin?: string; twitter?: string; github?: string };
  };
  isEditing: boolean;
  isSaving?: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel?: () => void;
  onInputChange: (field: string, value: string | string[]) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userProfile,
  isEditing,
  onEditToggle,
  onInputChange,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={clsx("flex items-center justify-between gap-6 p-8 bg-white", isEditing && "flex-col items-stretch text-left")}>
      <div className={clsx("flex items-center gap-6 flex-1", isEditing && "flex-col items-center gap-8 w-full max-w-none")}>
        <div className="relative shrink-0">
          <div className={clsx(
            "rounded-full bg-gray-100 flex items-center justify-center relative overflow-hidden border-2 border-gray-200",
            isEditing ? "w-[120px] h-[120px]" : "w-[140px] h-[140px] tablet:w-[110px] tablet:h-[110px] mobile:w-[90px] mobile:h-[90px]"
          )}>
            {userProfile.avatar && userProfile.avatar.trim() && !imageError ? (
              <Image src={userProfile.avatar} alt={userProfile.name} width={140} height={140} className="w-full h-full object-cover rounded-full" onError={() => setImageError(true)} />
            ) : (
              <FaUserCircle className="bg-white rounded-full w-[100px] h-[100px] flex items-center justify-center text-gray-200" />
            )}
          </div>
        </div>

        <div className={clsx("flex-1 flex flex-col gap-2", isEditing && "w-full self-stretch")}>
          {isEditing ? (
            <div className="flex flex-col w-full gap-5">
              <div className="flex gap-8 tablet:flex-col tablet:gap-5">
                <div className="flex flex-col gap-4 h-full flex-1">
                  <h4 className="text-base font-bold text-gray-700 m-0 mb-4">Personal Details</h4>
                  <div className="flex gap-4 mobile:flex-col mobile:gap-4">
                    <input
                      type="text"
                      value={userProfile.name}
                      onChange={(e) => onInputChange("name", e.target.value)}
                      className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-lg bg-white text-gray-900 text-base mb-0 transition-all font-medium focus:outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] placeholder:text-gray-400 placeholder:text-[15px] placeholder:font-normal mobile:flex-1"
                      placeholder="Enter your full name"
                    />
                    <input
                      type="text"
                      value={userProfile.title}
                      onChange={(e) => onInputChange("title", e.target.value)}
                      className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-lg bg-white text-gray-900 text-base mb-0 transition-all font-medium focus:outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] placeholder:text-gray-400 placeholder:text-[15px] placeholder:font-normal mobile:flex-1"
                      placeholder="Enter your profession"
                    />
                  </div>
                  <textarea
                    value={userProfile.bio || ""}
                    onChange={(e) => onInputChange("bio", e.target.value)}
                    className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-lg bg-white text-gray-900 text-[15px] mb-0 resize-none min-h-[120px] flex-1 font-inherit leading-relaxed transition-all font-medium focus:outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(220,38,38,0.1)] placeholder:text-gray-400 placeholder:text-sm placeholder:font-normal"
                    placeholder="Tell others about yourself..."
                  />
                </div>

                <div className="mt-0 pt-5 border-t-2 border-gray-100 tablet:mt-0 tablet:pt-0 tablet:border-t-0 tablet:border-l-2 tablet:border-gray-100 tablet:pl-8 flex-1">
                  <h4 className="text-base font-bold text-gray-700 m-0 mb-4">Social Links</h4>
                  <div className="flex flex-col gap-4">
                    {[
                      { key: "linkedin", icon: FaLinkedin, color: "text-[#0077b5]", placeholder: "https://linkedin.com/in/yourprofile" },
                      { key: "twitter", icon: FaTwitter, color: "text-[#1da1f2]", placeholder: "https://x.com/yourusername" },
                      { key: "github", icon: FaGithub, color: "text-gray-800", placeholder: "https://github.com/yourusername" },
                    ].map(({ key, icon: Icon, color, placeholder }) => (
                      <div key={key} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 tablet:gap-3 tablet:p-3">
                        <Icon className={clsx("text-xl shrink-0", color)} />
                        <input
                          type="url"
                          value={userProfile.socials?.[key as keyof typeof userProfile.socials] || ""}
                          onChange={(e) => onInputChange(`socials.${key}`, e.target.value)}
                          className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-md bg-white text-gray-900 text-[15px] font-normal transition-all focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(220,38,38,0.1)] placeholder:text-gray-400"
                          placeholder={placeholder}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold m-0 text-gray-900 leading-tight tablet:text-2xl mobile:text-[22px]">{userProfile.name}</h1>
              <p className="text-[17px] text-gray-500 m-0 font-medium tablet:text-[15px] mobile:text-sm">{userProfile.title || "Professional"}</p>
              {userProfile.bio && <p className="text-[15px] text-gray-600 m-0 leading-relaxed tablet:text-sm mobile:text-[13px]">{userProfile.bio}</p>}
              <div className="flex gap-3 mt-2">
                {userProfile.socials?.linkedin && (
                  <a href={userProfile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-2 rounded-lg transition-all no-underline hover:bg-black/5 hover:-translate-y-0.5">
                    <FaLinkedin className="text-xl text-[#0077b5]" />
                  </a>
                )}
                {userProfile.socials?.twitter && (
                  <a href={userProfile.socials.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-2 rounded-lg transition-all no-underline hover:bg-black/5 hover:-translate-y-0.5">
                    <FaTwitter className="text-xl text-[#1da1f2]" />
                  </a>
                )}
                {userProfile.socials?.github && (
                  <a href={userProfile.socials.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-2 rounded-lg transition-all no-underline hover:bg-black/5 hover:-translate-y-0.5">
                    <FaGithub className="text-xl text-gray-800" />
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="shrink-0 tablet:w-full">
          <button
            className="flex items-center gap-2 bg-primary text-white border-none py-3 px-6 rounded-md cursor-pointer text-sm font-medium transition-all hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60 tablet:w-full tablet:justify-center tablet:py-4 tablet:px-8"
            onClick={onEditToggle}
          >
            Edit <FaEdit className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};
