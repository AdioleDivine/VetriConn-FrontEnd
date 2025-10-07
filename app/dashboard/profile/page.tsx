"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { ProfileHeader } from "@/components/pages/profile/ProfileHeader";
import { ProfileStats } from "@/components/pages/profile/ProfileStats";
import { EditActions } from "@/components/pages/profile/EditActions";

import { ProfessionalSummary } from "@/components/pages/profile/ProfessionalSummary";
import { AttachmentsSection } from "@/components/pages/profile/AttachmentsSection";
// import { ExperienceEducationSection } from "@/components/pages/profile/ExperienceEducationSection";
import { updateUserProfile } from "@/lib/api";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useToaster } from "@/components/ui/Toaster";
import {
  ProfileHeaderSkeleton,
  ProfileStatsSkeleton,
} from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";

interface EditingProfile {
  name: string;
  title: string;
  location: string;
  experience: string;
  current: string;
  lookingFor: string[];
  bio: string | null;
  avatar: string;
  socials: {
    linkedin: string;
    twitter: string;
    github: string;
  };
  professionalSummary: string;
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingData, setEditingData] = useState<EditingProfile | null>(null);
  const { showToast } = useToaster();
  const { userProfile, isLoading, isError, mutateProfile } = useUserProfile();

  // Initialize editing data when entering edit mode
  useEffect(() => {
    if (isEditing && userProfile && !editingData) {
      setEditingData({
        name: userProfile.name,
        title: userProfile.title || "",
        location: userProfile.location,
        experience: userProfile.experience,
        current: userProfile.current,
        lookingFor: [...userProfile.lookingFor],
        bio: userProfile.bio,
        avatar: userProfile.avatar,
        socials: {
          linkedin: userProfile.socials?.linkedin || "",
          twitter: userProfile.socials?.twitter || "",
          github: userProfile.socials?.github || "",
        },
        professionalSummary: userProfile.professionalSummary || "",
      });
    }
  }, [isEditing, userProfile, editingData]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset editing data
      setEditingData(null);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditingData(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editingData || !userProfile) return;

    setIsSaving(true);

    try {
      // Prepare the data to send to the backend
      const profileUpdateData: Record<string, unknown> & {
        socials?: Record<string, string>;
      } = {};

      const nameParts = editingData.name.trim().split(" ");
      if (nameParts.length > 0) {
        profileUpdateData.first_name = nameParts[0];
        if (nameParts.length > 1) {
          profileUpdateData.last_name = nameParts.slice(1).join(" ");
        }
      }

      if (editingData.bio && editingData.bio.trim()) {
        profileUpdateData.bio = editingData.bio.trim();
      } else {
        profileUpdateData.bio = "";
      }

      if (editingData.title && editingData.title.trim()) {
        profileUpdateData.profession = editingData.title.trim();
      }

      if (editingData.current && editingData.current.trim()) {
        profileUpdateData.current_job = editingData.current.trim();
      }

      if (editingData.experience && editingData.experience.trim()) {
        profileUpdateData.experience = editingData.experience.trim();
      }

      if (editingData.location && editingData.location.trim()) {
        profileUpdateData.location = editingData.location.trim();
      }

      if (editingData.lookingFor && editingData.lookingFor.length > 0) {
        profileUpdateData.looking_for = editingData.lookingFor.filter(
          (item: string) => item.trim()
        );
      }

      if (editingData.avatar && editingData.avatar.trim()) {
        profileUpdateData.picture = editingData.avatar.trim();
      } else {
        profileUpdateData.picture = "";
      }

      // Validate URLs for social links
      const isValidUrl = (url: string) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      };

      profileUpdateData.socials = {};
      if (editingData.socials.linkedin && editingData.socials.linkedin.trim()) {
        const linkedinUrl = editingData.socials.linkedin.trim();
        if (isValidUrl(linkedinUrl)) {
          profileUpdateData.socials.linkedin = linkedinUrl;
        } else {
          showToast({
            type: "error",
            title: "Invalid URL",
            description: "Please enter a valid LinkedIn URL.",
          });
          return;
        }
      }
      if (editingData.socials.twitter && editingData.socials.twitter.trim()) {
        const twitterUrl = editingData.socials.twitter.trim();
        if (isValidUrl(twitterUrl)) {
          profileUpdateData.socials.twitter = twitterUrl;
        } else {
          showToast({
            type: "error",
            title: "Invalid URL",
            description: "Please enter a valid X (Twitter) URL.",
          });
          return;
        }
      }
      if (editingData.socials.github && editingData.socials.github.trim()) {
        const githubUrl = editingData.socials.github.trim();
        if (isValidUrl(githubUrl)) {
          profileUpdateData.socials.github = githubUrl;
        } else {
          showToast({
            type: "error",
            title: "Invalid URL",
            description: "Please enter a valid GitHub URL.",
          });
          return;
        }
      }

      if (editingData.professionalSummary !== undefined) {
        profileUpdateData.professional_summary = editingData.professionalSummary.trim();
      }

      // Debug: Log what we're sending to the backend

      const response = await updateUserProfile(profileUpdateData);

      if (response.success) {
        // Exit edit mode and refresh data
        setIsEditing(false);
        setEditingData(null);
        mutateProfile();

        showToast({
          type: "success",
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      } else {
        throw new Error(
          (response as { message?: string }).message ||
            "Failed to update profile"
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update profile";
      showToast({
        type: "error",
        title: "Update Failed",
        description: errorMessage,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    if (!editingData) return;

    if (field.includes(".")) {
      const [parentField, childField] = field.split(".");
      setEditingData((prev) => {
        if (!prev) return null;

        const parentValue = prev[parentField as keyof EditingProfile];
        return {
          ...prev,
          [parentField]: {
            ...(typeof parentValue === "object" && parentValue !== null
              ? parentValue
              : {}),
            [childField]: value,
          },
        };
      });
    } else {
      setEditingData((prev) =>
        prev
          ? {
              ...prev,
              [field]: value,
            }
          : null
      );
    }
  };

  if (isLoading) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <ProfileHeaderSkeleton />
          <ProfileStatsSkeleton />
        </div>
      </div>
    );
  }

  if (isError || !userProfile) {
    return (
      <div className={styles.profileContainer}>
        <ErrorState
          title="Failed to Load Profile"
          message="We couldn't load your profile data. This might be due to a network issue or the server being unavailable."
          onRetry={() => mutateProfile()}
        />
      </div>
    );
  }

  // Use editing data when in edit mode, otherwise use original profile data
  const displayProfile = isEditing && editingData ? editingData : userProfile;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <ProfileHeader
          userProfile={displayProfile}
          isEditing={isEditing}
          isSaving={isSaving}
          onEditToggle={handleEditToggle}
          onSave={handleSave}
          onCancel={handleCancel}
          onInputChange={handleInputChange}
        />

        <ProfileStats
          userProfile={displayProfile}
          editingData={editingData}
          isEditing={isEditing}
          onInputChange={handleInputChange}
        />
      </div>

      <ProfessionalSummary 
        summary={displayProfile.professionalSummary}
        isEditing={isEditing}
        onInputChange={handleInputChange}
      />

      <EditActions
        isEditing={isEditing}
        isSaving={isSaving}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <AttachmentsSection />
      {/* <ExperienceEducationSection /> */}
    </div>
  );
};

export default ProfilePage;
