"use client";

import { auth } from "@/app/lib/firebaseConfig";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { useAuth } from "@/app/lib/auth/AuthProvider";
import { AnimatePresence } from "framer-motion";

export default function UserMenu() {
  const { user } = useAuth();
  const contRef = useRef<HTMLDivElement | null>(null);
  const [openMenu, setOpenMenu] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contRef.current && !contRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  // --- created avatar ---
  function getInitials(name: string) {
    if (!name) return "";
    const words = name.trim().split(" ");
    const initials = words.map((word) => word[0].toUpperCase());
    return initials.slice(0, 2).join("");
  }
  const userInitials = user?.displayName ? getInitials(user.displayName) : "";

  const userAvatar = user?.photoURL ? (
    <Image
      src={user.photoURL ?? ""}
      width={40}
      height={40}
      alt="user"
      className="rounded-full"
    />
  ) : (
    <div className="w-10 h-10 rounded-full text-lg font-bold bg-primary-light dark:bg-primary-dark flex justify-center items-center">
      {userInitials}
    </div>
  );

  if (!user)
    return (
      <div className="fixed top-5 right-5 flex gap-2">
        <Link href="/signup" className="authLink">
          Sign Up
        </Link>
        <Link href="/signin" className="authLink">
          Log In
        </Link>
      </div>
    );

  // --- main comp ---

  return (
    <div className="fixed top-5 right-5 flex items-center gap-2">
      {userAvatar}
      <button onClick={() => setOpenMenu(!openMenu)}>
        {openMenu ? <ChevronUp /> : <ChevronDown />}
      </button>
      <AnimatePresence>
        {openMenu && (
          <div
          ref={contRef}
            className="gradientShadow absolute top-10 right-0 bg-white dark:bg-dark2 min-w-64 p-5 mt-5 rounded-2xl shadow-md"
          >
              <div className="flex items-center w-full gap-4">
                {userAvatar}
                <div>
                  <p>{user.displayName}</p>
                  <p className="truncate max-w-[16ch] inline-block">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                className="mt-4 authLink flex items-center gap-2"
                onClick={() => auth.signOut()}
                tabIndex={0}
              >
                Log Out
                <LogOut size={18} />
              </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
