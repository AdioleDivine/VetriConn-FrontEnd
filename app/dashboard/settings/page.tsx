"use client";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 tablet:p-4">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-500 mb-8">Manage your account preferences and settings</p>

        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
          <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-700">Profile Settings</span>
            <button className="bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors hover:bg-primary-hover">Edit Profile</button>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-700">Notification Preferences</span>
            <button className="bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors hover:bg-primary-hover">Manage</button>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-700">Privacy Settings</span>
            <button className="bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors hover:bg-primary-hover">Configure</button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Preferences</h2>
          <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-700">Job Alerts</span>
            <button className="bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors hover:bg-primary-hover">Configure</button>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-700">Saved Searches</span>
            <button className="bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors hover:bg-primary-hover">Manage</button>
          </div>
        </div>

        <div className="text-center py-8 text-gray-400">
          <p>More settings options coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
