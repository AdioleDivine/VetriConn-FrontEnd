"use client";
import React, { useState } from "react";
import styles from "./page.module.scss";
import { ProfileHeader } from "@/components/pages/profile/ProfileHeader";
import { ProfileStats } from "@/components/pages/profile/ProfileStats";
import { ProfessionalSummary } from "@/components/pages/profile/ProfessionalSummary";
import { AttachmentsSection } from "@/components/pages/profile/AttachmentsSection";
import { ExperienceEducationSection } from "@/components/pages/profile/ExperienceEducationSection";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - replace with actual user data from your state management
  const [userProfile, setUserProfile] = useState({
    name: "Richmond Adiole",
    title: "Electrical Engineer",
    location: "Ottawa, Ontario",
    experience: "10 years",
    current: "Director at VetriConn",
    lookingFor: "Full time, Part time",
    bio: "Experienced Electrical Engineer with over 10 years of expertise in power systems, telecommunications, and industrial automation. Currently serving as Director at VetriConn, where I lead technical initiatives to connect veterans with meaningful career opportunities. Passionate about leveraging technology to create sustainable solutions and bridge the gap between military experience and civilian careers.",
    avatar: "/images/richmond.svg", // placeholder
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    setIsEditing(false);
    // Add save logic
  };

  const handleInputChange = (field: string, value: string) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <ProfileHeader
          userProfile={userProfile}
          isEditing={isEditing}
          onEditToggle={handleEditToggle}
          onSave={handleSave}
          onInputChange={handleInputChange}
        />

        <ProfileStats
          userProfile={userProfile}
          isEditing={isEditing}
          onInputChange={handleInputChange}
        />

        {/* <AboutSection
          bio={userProfile.bio}
          isEditing={isEditing}
          onInputChange={handleInputChange}
        /> */}
      </div>

      <ProfessionalSummary />
      <AttachmentsSection />
      <ExperienceEducationSection />
    </div>
  );
};

export default ProfilePage;
