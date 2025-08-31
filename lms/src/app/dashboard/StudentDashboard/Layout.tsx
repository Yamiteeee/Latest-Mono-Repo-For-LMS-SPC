// app/dashboard/StudentDashboard/Layout.tsx

"use client";

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="student" collapsed={collapsed} onToggle={toggleSidebar} />
      <main
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default StudentLayout;