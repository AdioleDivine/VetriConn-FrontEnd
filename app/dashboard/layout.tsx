import DashboardNavbar from "@/components/ui/DashboardNavbar";

import React from "react";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <DashboardNavbar />
      <div className="container">
        {/* This is where the main content will be rendered */}
        {children}
      </div>
    </div>
  );
};

export default layout;
