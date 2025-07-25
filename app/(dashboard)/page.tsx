"use client";

import { Search } from "lucide-react";
import React from "react";
import { ArtoEnType, EnToArType } from "@/app/lib/types/type";
import ArtoEnResult from "@/components/ArtoEnResult";
import EntoArResult from "@/components/EntoArResult";
import RiveBird from "@/components/RiveBird";

export default function Home() {
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
      if (data.reply === "Word Not found.") {
        setWordData("Word Not found.");
      } else {
        setWordData(JSON.parse(data.reply));
      }
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
    <div className="max-w-3xl w-full my-8 mx-7 sm:mx-12">
      <form onSubmit={handleSubmit} className={`mt-12 relative`}>
        <input
          type="text"
          aria-label="Search Arabic or English word"
          placeholder="Search Arabic or English word"
          name="word"
          lang="ar"
          autoComplete="off"
          dir="auto"
          className={`searchInput ${searchError && "ring-2 ring-red"}`}
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button
          type="submit"
          className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 text-gray2"
          aria-label="Search"
        >
          <Search size={28} className="size-4 sm:size-7" />
        </button>
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
            <EntoArResult
              wordData={wordData as EnToArType}
              searchWord={searchWord}
            />
          )
        ) : (
          <div className="flex flex-col justify-center items-center w-full mt-10">
            <RiveBird/>
            <p className="text-lg sm:text-2xl text-primary-light dark:text-primary-dark">
              Nothing to show yet.
            </p>
            <p className="text-secondary-light dark:text-secondary-dark mt-2 text-sm sm:text-base">
              Enter an Arabic or English word to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
