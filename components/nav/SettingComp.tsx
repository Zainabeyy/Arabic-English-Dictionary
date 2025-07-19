import React, { useRef } from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import SelectFont from "../SelectFont";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingComp({
  handleShowSetting,
}: {
  handleShowSetting: () => void;
}) {
  // --- close on clicking outside ---

  const settingRef = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        settingRef.current &&
        !settingRef.current.contains(e.target as Node)
      ) {
        handleShowSetting();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleShowSetting]);

  // --- ui ---
  return (
    <div className="fixed w-screen min-h-screen p-4 bg-dark3/50 top-0 left-0 flex justify-center items-center transition duration-300">
      <motion.div
        className="max-w-2xl w-full min-h-[35rem] h-full bg-white dark:bg-dark1 py-5 sm:py-8 px-6 sm:px-9 rounded-3xl flex flex-col gap-3 sm:gap-6"
        ref={settingRef}
        initial={{ opacity: 0, scale: 0.8, y: "-50%" }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: "50%" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-light">General Setting</h1>
          <button
            type="button"
            onClick={handleShowSetting}
            className="icon-btn"
          >
            <X className="size-5 sm:size-7" />
          </button>
        </div>
        <div className="h-[1px] bg-gray2" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-light">Theme</h2>
          <ThemeSwitcher />
        </div>
        <div className="h-[1px] bg-gray2" />
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-light">Font</h2>
          <SelectFont />
        </div>
      </motion.div>
    </div>
  );
}
