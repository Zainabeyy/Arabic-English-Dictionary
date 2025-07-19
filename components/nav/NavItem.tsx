"use client";

import { NavItemProps } from "@/app/lib/types/type";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavItem(item: NavItemProps) {
  const Icon = item.icon;
  const pathname = usePathname();
  const content = (
    <div
      className={`flex items-center gap-2 text-base font-semibold hover:text-bold hover:text-secondary transition duration-300 ${
        pathname == item.link
          ? "text-primary-light dark:text-primary-dark"
          : "text-gray3 dark:text-gray1"
      }`}
    >
      <motion.div
        initial={{ width: "1.25rem" }}
        animate={{ width: item.open ? "1.75rem" : "1.5rem" }}
      >
        <Icon size={28} />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: item.open ? 1 : 0, x: item.open ? 0 : -10 }}
        transition={{ duration: 0.2 }}
        className={`overflow-hidden whitespace-nowrap ${!item.open && "w-0"}`}
      >
        {item.label}
      </motion.span>
    </div>
  );
  return item.link ? <Link href={item.link}>{content}</Link> : <>{content}</>;
}
