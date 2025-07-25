"use client";

import { Moon } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const MotionMoon = motion(Moon);

  const toggleTheme = () => {
    console.log(theme);
    setTheme(isDark ? "light" : "dark");
  };
  return (
    <div className="flex items-center gap-3">
      <motion.button
        onClick={toggleTheme}
        className="themeSwitcher transition-colors duration-300 w-10 h-5 sm:w-11 sm:h-6 px-1 py-1.5 rounded-full flex items-center dark:justify-start primaryGradient justify-end"
        role="switch"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-checked={isDark}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white rounded-full"
        />
      </motion.button>

      <MotionMoon
        size={30}
        className="size-6 sm:size-8"
        initial={{ stroke: "#757575" }}
        animate={{ stroke: isDark ? "#a445ed" : "#757575" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
