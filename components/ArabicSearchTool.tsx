"use client";

import { Search } from "lucide-react";
import React from "react";
import ArtoEnResult from "./ArtoEnResult";
import { ArtoEnType, EnToArType } from "@/app/lib/types/type";
import EntoArResult from "./EntoArResult";

export default function ArabicSearchTool() {
  const [wordData, setWordData] = React.useState<
    ArtoEnType | EnToArType | string
  >("");
  const [word, setWord] = React.useState("");
  const [direction, setDirection] = React.useState("arToEn");
  const [searchError, setSearchError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function fetchWordData(word: string) {
    if (!word.trim()) {
      setSearchError("Whoops, can't be empty...");
      return;
    }
    setSearchError("");
    setLoading(true);
    const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(word);
    const detectedDirection = isArabic ? "arToEn" : "enToAr";
    setDirection(detectedDirection);
    setWord(word);

    try {
      const response = await fetch("api/dictionary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: word,
          direction: detectedDirection,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWordData(JSON.parse(data.reply));
    } catch (e) {
      console.error(e);
      setSearchError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const word = formData.get("word") as string;
    fetchWordData(word);
  }

  function searchWord(word: string) {
    fetchWordData(word);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`mt-12 flex rounded-2xl overflow-hidden bg-gray1 dark:bg-dark3 ${
          searchError && "ring-2 ring-red"
        }`}
      >
        <button type="submit" className="ml-4" aria-label="Search">
          <Search size={28} className="size-5 sm:size-7" />
        </button>
        <input
          type="text"
          aria-label="Search Arabic or English word"
          placeholder="Search Arabic or English word"
          name="word"
          lang="ar"
          autoComplete="off"
          dir="auto"
          className="searchInput"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
      </form>
      <p className="text-red mt-3 ml-2">{searchError}</p>

      <div aria-live="polite" role="region">
        {loading ? (
          <div className="flex justify-center items-center w-full h-80">
            <img src="/Spinner.gif" alt="loading" width={100} height={100} />
          </div>
        ) : wordData ? (
          direction === "arToEn" ? (
            <ArtoEnResult
              wordData={wordData as ArtoEnType}
              searchWord={searchWord}
            />
          ) : (
            <EntoArResult wordData={wordData as EnToArType} searchWord={searchWord}/>
          )
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-80">
            <p className="text-lg sm:text-2xl text-purple">Nothing to show yet.</p>
            <p className="text-green mt-2 text-sm sm:text-base">
              Enter an Arabic or English word to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
