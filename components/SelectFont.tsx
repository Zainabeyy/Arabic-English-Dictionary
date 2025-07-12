"use client";

import React, { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function SelectFont() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("Modern Font");
  const fonts = ["Modern Font", "Traditional Font"];
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // -- initial font setup

  React.useEffect(() => {
    const savedFont = localStorage.getItem("arabicFont") || "Modern Font";
    setSelectedOption(savedFont);

    const root = document.documentElement;
    if (savedFont === "Traditional Font") {
      root.style.setProperty(
        "--font-arabic-selected",
        "var(--font-arabic-naskh)"
      );
    } else {
      root.style.setProperty(
        "--font-arabic-selected",
        "var(--font-arabic-sans)"
      );
    }
  }, []);

  // -- function on font selection

  function handleSelectedFont(font: string) {
    setSelectedOption(font);
    setIsOpen(false);
    localStorage.setItem("arabicFont", font);
    const root = document.documentElement;
    if (font === "Traditional Font") {
      root.style.setProperty("--font-arabic-selected", "var(--font-naskh)");
    } else {
      root.style.setProperty("--font-arabic-selected", "var(--font-sans)");
    }
  }

  // -- keyboard navigation

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      setIsOpen(true);
      (listRef.current?.firstElementChild as HTMLLIElement)?.focus();
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  function handleListKeyDown(
    event: React.KeyboardEvent<HTMLLIElement>,
    font: string
  ) {
    if (event.key === "Enter" || event.key === " ") {
      handleSelectedFont(font);
    } else if (event.key === "ArrowDown") {
      (event.currentTarget.nextElementSibling as HTMLLIElement)?.focus();
    } else if (event.key === "ArrowUp") {
      (event.currentTarget.previousElementSibling as HTMLLIElement)?.focus();
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  function handleBlur() {
    requestAnimationFrame(() => {
      if (
        !listRef.current?.contains(document.activeElement) &&
        document.activeElement !== buttonRef.current
      ) {
        setIsOpen(false);
      }
    });
  }

  // closes on clicking outside the container

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // -- main component

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="text-base sm:text-lg font-bold dark:text-gray1 flex items-center gap-2 p-1 selectFontButton rounded-lg overflow-hidden outline-none border-none"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <ChevronDown color="#a445ed" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={listRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fontBox absolute mt-1 top-9 z-50 right-2 flex justify-center items-center"
            role="listbox"
            onBlur={handleBlur}
          >
            <ul className="text-base sm:text-lg rounded-xl overflow-hidden fontList">
              {fonts.map((font, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectedFont(font)}
                  onKeyDown={(event) => handleListKeyDown(event, font)}
                  tabIndex={0}
                  role="option"
                  aria-selected={font === selectedOption}
                >
                  {font}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
