// app/dashboard/AdminDashboard/Layout.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" collapsed={collapsed} onToggle={toggleSidebar} />
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

export default AdminLayout;