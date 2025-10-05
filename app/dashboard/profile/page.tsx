"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { ProfileHeader } from "@/components/pages/profile/ProfileHeader";
import { ProfileStats } from "@/components/pages/profile/ProfileStats";

import { ProfessionalSummary } from "@/components/pages/profile/ProfessionalSummary";
import { AttachmentsSection } from "@/components/pages/profile/AttachmentsSection";
import { ExperienceEducationSection } from "@/components/pages/profile/ExperienceEducationSection";
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
        professionalSummary: userProfile.professionalSummary,
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
      const profileUpdateData: any = {};
      
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
      
      profileUpdateData.socials = {};
      if (editingData.socials.linkedin && editingData.socials.linkedin.trim()) {
        profileUpdateData.socials.linkedin = editingData.socials.linkedin.trim();
      }
      if (editingData.socials.twitter && editingData.socials.twitter.trim()) {
        profileUpdateData.socials.twitter = editingData.socials.twitter.trim();
      }
      if (editingData.socials.github && editingData.socials.github.trim()) {
        profileUpdateData.socials.github = editingData.socials.github.trim();
      }
      
      if (editingData.professionalSummary && editingData.professionalSummary.trim()) {
        profileUpdateData.professional_summary = editingData.professionalSummary.trim();
      }

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
        throw new Error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile save error:", error);
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
      setEditingData(prev => {
        if (!prev) return null;
        
        const parentValue = prev[parentField as keyof EditingProfile];
        return {
          ...prev,
          [parentField]: {
            ...(typeof parentValue === 'object' && parentValue !== null ? parentValue : {}),
            [childField]: value,
          },
        };
      });
    } else {
      setEditingData(prev => prev ? {
        ...prev,
        [field]: value,
      } : null);
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

      <ProfessionalSummary />
      <AttachmentsSection />
      <ExperienceEducationSection />
    </div>
  );
};

export default ProfilePage;
