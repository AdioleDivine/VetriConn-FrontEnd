"use client";
import React from "react";
import styles from "./page.module.scss";

const SettingsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>
          Manage your account preferences and settings
        </p>

        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Account Settings</h2>
          <div className={styles.settingItem}>
            <span>Profile Settings</span>
            <button className={styles.settingButton}>Edit Profile</button>
          </div>
          <div className={styles.settingItem}>
            <span>Notification Preferences</span>
            <button className={styles.settingButton}>Manage</button>
          </div>
          <div className={styles.settingItem}>
            <span>Privacy Settings</span>
            <button className={styles.settingButton}>Configure</button>
          </div>
        </div>

        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Job Preferences</h2>
          <div className={styles.settingItem}>
            <span>Job Alerts</span>
            <button className={styles.settingButton}>Configure</button>
          </div>
          <div className={styles.settingItem}>
            <span>Saved Searches</span>
            <button className={styles.settingButton}>Manage</button>
          </div>
        </div>

        <div className={styles.comingSoon}>
          <p>More settings options coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
