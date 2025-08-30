"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Topbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear auth tokens or localStorage if needed
    router.push("/login");
  };

  return (
    <header className="bg-green-900 shadow-md flex justify-between items-center px-6 py-3 rounded-b-lg text-white">
      {/* Left: Dashboard title */}
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold">Dashboardssss</h2>
      </div>

      {/* Right: Notifications and user */}
      <div className="flex items-center space-x-4">
        {/* Notification bell */}
        <button className="relative p-2 rounded-full hover:bg-green-800 transition">
          <FaBell size={20} />
          <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User info */}
        <div className="flex items-center space-x-2 bg-green-800 px-3 py-1 rounded-full hover:bg-green-700 transition">
          <FaUserCircle size={24} />
          <span className="font-medium">Admin</span>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
