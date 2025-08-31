"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaBook,
  FaClipboardList,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaBell,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import StudentLayout from "./Layout";

// Student Dashboard Stats
const studentStats = [
  {
    title: "Courses Enrolled",
    value: 5,
    icon: <FaBook size={28} />,
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "Assignments Pending",
    value: 3,
    icon: <FaClipboardList size={28} />,
    color: "from-red-500 to-red-700",
  },
  {
    title: "Teachers",
    value: 2,
    icon: <FaChalkboardTeacher size={28} />,
    color: "from-purple-500 to-purple-700",
  },
  {
    title: "Upcoming Deadlines",
    value: 4,
    icon: <FaCalendarAlt size={28} />,
    color: "from-yellow-500 to-yellow-700",
  },
];

const StudentDashboard: React.FC = () => {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    <StudentLayout>
      <AnimatePresence>
        {!firstRender && (
          // The parent div no longer has p-6 padding
          <div className="w-full h-full">
            {/* Hero Section */}
            <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.5 }}
                           className="relative h-60 w-full overflow-hidden mb-8 shadow-lg"
                         >
                           <Image
                             src="/assets/spc-background.avif"
                             alt="San Pablo City Background"
                             layout="fill"
                             objectFit="cover"
                             quality={100}
                             className="z-0"
                           />
                           {/* Added a black overlay with opacity for better text readability */}
                           <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
           
                           <div className="relative z-20 flex flex-col items-center justify-center h-full text-white p-6">
                             {/* Added the logo here */}
                             <Image
                               src="/assets/SPCLOGO.avif"
                               alt="San Pablo City Logo"
                               width={80}
                               height={80}
                               className="mb-4 drop-shadow-lg"
                             />
                             <h1 className="text-5xl font-extrabold mb-3 text-center drop-shadow-lg">
                               Student Dashboard
                             </h1>
                             <p className="text-lg text-center drop-shadow-md">
                               Welcome to your LMS in San Pablo City, Laguna.
                             </p>
                           </div>
                         </motion.div>
                       


            {/* A new div with p-6 padding is added here to contain the rest of the content */}
            <div className="p-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {studentStats.map((stat, index) => (
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

              {/* Student-specific Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Assignments */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="bg-white rounded-xl shadow p-5"
                >
                  <h2 className="text-xl font-semibold mb-4 text-black">
                    <FaClipboardList className="inline mr-2 text-blue-500" />
                    Upcoming Assignments
                  </h2>
                  <ul className="space-y-3 text-black">
                    <li className="flex justify-between items-center transition-colors duration-200 p-2 hover:bg-gray-100 rounded-md">
                      <span className="font-semibold">Mathematics Quiz</span>
                      <span className="text-sm text-gray-500">
                        Due: October 26, 2025
                      </span>
                    </li>
                    <li className="flex justify-between items-center transition-colors duration-200 p-2 hover:bg-gray-100 rounded-md">
                      <span className="font-semibold">Science Project</span>
                      <span className="text-sm text-gray-500">
                        Due: November 5, 2025
                      </span>
                    </li>
                    <li className="flex justify-between items-center transition-colors duration-200 p-2 hover:bg-gray-100 rounded-md">
                      <span className="font-semibold">History Essay</span>
                      <span className="text-sm text-gray-500">
                        Due: November 15, 2025
                      </span>
                    </li>
                  </ul>
                </motion.div>

                {/* Recent Course Activity */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="bg-white rounded-xl shadow p-5"
                >
                  <h2 className="text-xl font-semibold mb-4 text-black">
                    <FaBell className="inline mr-2 text-red-500" />
                    Recent Activity
                  </h2>
                  <ul className="space-y-3 text-black">
                    <li className="flex justify-between items-center transition-colors duration-200 p-2 hover:bg-gray-100 rounded-md">
                      <span className="font-semibold">Mr. Adams</span> uploaded new course material
                      <span className="text-sm text-gray-500">
                        15 min ago
                      </span>
                    </li>
                    <li className="flex justify-between items-center transition-colors duration-200 p-2 hover:bg-gray-100 rounded-md">
                      <span className="font-semibold">Ms. Johnson</span> graded your quiz
                      <span className="text-sm text-gray-500">
                        2 hours ago
                      </span>
                    </li>
                    <li className="flex justify-between items-center transition-colors duration-200 p-2 hover:bg-gray-100 rounded-md">
                      <span className="font-semibold">Dr. Carter</span> posted a new announcement
                      <span className="text-sm text-gray-500">
                        1 day ago
                      </span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </StudentLayout>
  );
};

export default StudentDashboard;