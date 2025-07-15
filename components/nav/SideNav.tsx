"use client";

import {
  Bookmark,
  BookOpen,
  PanelLeftClose,
  PanelRightClose,
  Search,
  Settings,
} from "lucide-react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavItem from "./NavItem";
import SettingComp from "./SettingComp";

export default function SideNav() {
  const [open, setOpen] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const navItems = [
    { label: "Search Word", icon: Search, link: "/" },
    { label: "Bookmarks", icon: Bookmark, link: "/bookmarks" },
  ];

  function handleShowSetting() {
    setShowSettings((prev) => !prev);
  }

  return (
    <motion.aside
      initial={{ width: "4rem" }}
      animate={{ width: open ? "16rem" : "4rem" }}
      className={`h-screen fixed flex flex-col justify-between left-0 top-0 z-50 bg-gray1 dark:bg-dark2 transition duration-200 ${
        open ? "p-5" : "p-4"
      }`}
    >
      <div>
        <BookOpen size={open ? 40 : 32} color="hsl(0,0%,70%)" />
        <button
          onClick={() => setOpen(!open)}
          className="absolute -right-8 top-5 text-gray2"
        >
          {open ? <PanelLeftClose /> : <PanelRightClose />}
        </button>
        <nav className="my-10 flex flex-col gap-4">
          {navItems.map((item, index) => {
            return (
              <NavItem
                key={index}
                label={item.label}
                icon={item.icon}
                link={item.link}
                open={open}
              />
            );
          })}
        </nav>
      </div>
      <button
        type="button"
        className="mb-1 flex items-center gap-3 max-w-7"
        onClick={() => setShowSettings(!showSettings)}
      >
        <NavItem label="Settings" icon={Settings} open={open} />
      </button>
      <AnimatePresence>
        {showSettings && <SettingComp handleShowSetting={handleShowSetting} />}
      </AnimatePresence>
    </motion.aside>
  );
}
