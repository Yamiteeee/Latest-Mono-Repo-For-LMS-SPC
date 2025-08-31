"use client";

import Layout from "../dashboard/AdminDashboard/Layout";
import Image from "next/image";
import {
  FaBook,
  FaUserGraduate,
  FaClipboardList,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Admin Dashboard Stats (mocked for now, later fetch from backend)
const stats = [
  {
    title: "Total Students",
    value: 200,
    icon: <FaUserGraduate size={28} />,
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "Total Teachers",
    value: 25,
    icon: <FaChalkboardTeacher size={28} />,
    color: "from-purple-500 to-purple-700",
  },
  {
    title: "Active Courses",
    value: 18,
    icon: <FaBook size={28} />,
    color: "from-green-500 to-green-700",
  },
  {
    title: "Pending Reports",
    value: 7,
    icon: <FaClipboardList size={28} />,
    color: "from-red-500 to-red-700",
  },
];

const AdminDashboard: React.FC = () => {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    <Layout>
      <AnimatePresence>
        {!firstRender && (
          <div className="w-full h-full">
            {/* Hero Section */}
            <div className="relative h-60 w-full overflow-hidden mb-8 rounded-xl shadow-lg">
              <Image
                src="/assets/spc-background.avif"
                alt="San Pablo City Background"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="z-0"
              />
              <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

              <div className="relative z-20 flex flex-col items-center justify-center h-full text-white p-6">
                <h1 className="text-5xl font-extrabold mb-3 text-center drop-shadow-lg">
                  Admin Dashboard
                </h1>
                <p className="text-lg text-center drop-shadow-md">
                  Welcome to your LMS in San Pablo City, Laguna.
                </p>
              </div>
            </div>

            <div className="p-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative rounded-xl shadow-lg overflow-hidden flex flex-col items-center justify-center h-52 transform bg-gradient-to-br ${stat.color}`}
                  >
                    <div className="relative z-10 text-white flex flex-col items-center justify-center h-full px-4 text-center">
                      <div className="mb-2">{stat.icon}</div>
                      <span className="text-lg font-semibold mb-2">
                        {stat.title}
                      </span>
                      <span className="text-4xl font-bold">{stat.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Performance Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performing Students */}
                <div className="bg-white rounded-xl shadow p-5">
                  <h2 className="text-xl font-semibold mb-4 text-black">
                    Top Performing Students
                  </h2>
                  <ul className="space-y-3 text-black">
                    <li className="flex justify-between">
                      <span>John Doe</span>
                      <span className="font-bold text-green-600">95%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Jane Smith</span>
                      <span className="font-bold text-green-600">92%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Michael Lee</span>
                      <span className="font-bold text-green-600">90%</span>
                    </li>
                  </ul>
                </div>

                {/* Teacher Activity */}
                <div className="bg-white rounded-xl shadow p-5">
                  <h2 className="text-xl font-semibold mb-4 text-black">
                    Recent Teacher Activity
                  </h2>
                  <ul className="space-y-3 text-black">
                    <li>
                      <span className="font-semibold">Mr. Adams</span> uploaded
                      new course material
                    </li>
                    <li>
                      <span className="font-semibold">Ms. Johnson</span> graded
                      student reports
                    </li>
                    <li>
                      <span className="font-semibold">Dr. Carter</span> added a
                      new assignment
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default AdminDashboard;
