"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaBell,
  FaUserCircle,
  FaBars,
  FaChevronLeft,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaTasks,
  FaAward,
  FaGraduationCap,
  FaChartBar,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  role?: "admin" | "teacher" | "student";
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role = "student", collapsed, onToggle }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  let menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
  ];

  if (role === "admin") {
    menuItems = [
      ...menuItems,
      { name: "Courses", path: "/dashboard/courses", icon: <FaBook /> },
      { name: "Students", path: "/dashboard/students", icon: <FaUsers /> },
      { name: "Reports", path: "/dashboard/reports", icon: <FaFileAlt /> },
      { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
    ];
  } else if (role === "teacher") {
    menuItems = [
      ...menuItems,
      { name: "My Classes", path: "/dashboard/classes", icon: <FaChalkboardTeacher /> },
      { name: "Assignments", path: "/dashboard/assignments", icon: <FaTasks /> },
      { name: "Grades", path: "/dashboard/grades", icon: <FaAward /> },
      { name: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
    ];
  } else if (role === "student") {
    menuItems = [
      ...menuItems,
      { name: "My Courses", path: "/dashboard/courses", icon: <FaGraduationCap /> },
      { name: "Assignments", path: "/dashboard/assignments", icon: <FaTasks /> },
      { name: "Progress", path: "/dashboard/progress", icon: <FaChartBar /> },
    ];
  }

  const handleLogout = () => setShowLogoutConfirm(true);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <>
      <aside
        className={`fixed z-50 bg-green-900/95 backdrop-blur-sm text-white min-h-screen p-2 flex flex-col shadow-lg transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <button
          onClick={onToggle}
          className="mb-4 text-white p-2 rounded hover:bg-green-800 transition self-end"
        >
          {collapsed ? <FaBars size={18} /> : <FaChevronLeft size={18} />}
        </button>

      {!collapsed && (
            <div className="mb-6 px-2 py-3 bg-green-800 rounded-lg flex flex-col space-y-4 shadow-inner">
              <h1 className="text-2xl font-bold text-center">Dashboard</h1>
              <div className="flex items-center justify-between">
                {/* Updated Profile Picture Section */}
                <div className="flex items-center space-x-3 bg-green-700 px-3 py-2 rounded-full">
                  <FaUserCircle size={32} />
                  <span className="font-medium text-base">{role}</span>
                </div>
                <button className="relative p-2 rounded-full hover:bg-green-700 transition">
                  <FaBell size={18} />
                  <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-red-600 w-full px-3 py-2 rounded-lg hover:bg-red-500 transition font-medium text-sm shadow-md"
              >
                <FaSignOutAlt />
                Logout
              </motion.button>
            </div>
          )}

        <nav className="flex flex-col space-y-2 mt-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <motion.div key={item.path} whileHover={{ x: 5 }}>
                <Link
                  href={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-white text-green-900 font-semibold shadow-md"
                      : "hover:bg-green-700 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="mt-auto text-center text-green-300 text-xs">
            &copy; {new Date().getFullYear()} LMS
          </div>
        )}
      </aside>

      <AnimatePresence>
          {showLogoutConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // Replaced backdrop-blur-md with a simple dark overlay
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-sm text-center transform transition-transform duration-300"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Are you sure?
                </h3>
                <p className="text-gray-600 mb-6">
                  You will be logged out of your session.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmLogout}
                    className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
};

export default Sidebar;