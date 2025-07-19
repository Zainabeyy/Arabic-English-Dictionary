"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  BookOpen,
  Menu,
  PanelLeftClose,
  PanelRightClose,
  Search,
  Settings,
} from "lucide-react";
import NavItem from "./NavItem";
import SettingComp from "./SettingComp";
import useIsMediumScreen from "@/hooks/useMediaQuery";

export default function SideNav() {
  const [open, setOpen] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const navItems = [
    { label: "Search Word", icon: Search, link: "/" },
    { label: "Bookmarks", icon: Bookmark, link: "/bookmarks" },
  ];
  const isMedium = useIsMediumScreen();

  function handleShowSetting() {
    setShowSettings((prev) => !prev);
  }

  return (
    <motion.aside
      initial={{ width: "0rem" }}
      animate={{
        width: open ? "16rem" : isMedium ? "4rem" : "0rem",
      }}
      className={`h-screen fixed flex flex-col justify-between left-0 top-0 z-50 bg-gray1 dark:bg-dark2 transition duration-200 ${
        open ? "p-5" : "md:p-4"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`fixed z-100 top-5 text-gray2 block md:hidden ${
          open ? "mx-0" : "mx-4"
        }`}
      >
        <Menu />
      </button>
      <div>
        <BookOpen
          size={open ? 40 : 32}
          color="hsl(0,0%,70%)"
          className="hidden md:block"
        />
        <button
          onClick={() => setOpen(!open)}
          className="absolute -right-8 top-5 text-gray2 hidden md:block"
        >
          {open ? <PanelLeftClose /> : <PanelRightClose />}
        </button>

        <nav className={`my-10 flex-col gap-4 ${
          open ? "flex" : "hidden md:flex"
        }`}>
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
        className={`mb-1 items-center gap-3 max-w-7 ${
          open ? "flex" : "hidden md:flex"
        }`}
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
