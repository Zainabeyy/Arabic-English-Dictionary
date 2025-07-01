"use client";

import { Moon } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export default function ThemeSwitcher() {
  const [dark, setDark] = React.useState(false);
  const MotionMoon = motion(Moon);

  React.useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDark(isDark);
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      newDark ? "dark" : "light"
    );
  };
  return (
    <div className="flex items-center gap-3">
      <motion.button
        onClick={toggleTheme}
        className={`themeSwitcher transition-colors duration-300 w-10 h-5 sm:w-11 sm:h-6 px-1 py-1.5 rounded-full flex items-center ${
          dark ? "bg-gray3 justify-start" : "bg-purple justify-end"
        }`}
        role="switch"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        aria-checked={dark}
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
        animate={{ stroke: dark ? "#a445ed" : "#757575" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
