"use client";

import { Search } from "lucide-react";
import React from "react";
import Result from "./Result";
import { WordDataType } from "@/app/lib/types/type";
import Image from "next/image";

export default function ArabicSearchTool() {
  const [wordData, setWordData] = React.useState<WordDataType | null>(null);
  const [word, setWord] = React.useState("");
  const [searchError, setSearchError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    const formData = new FormData(event.currentTarget);
    const word = formData.get("word") as string;
    setWord(word);
    if (!word.trim()) {
      setSearchError("Whoops, can't be empty...");
      return;
    }
    setSearchError("");
    setLoading(true);
    try {
      const response = await fetch("api/dictionary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: word, direction: "arToEn" }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWordData(JSON.parse(data.reply));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-12 relative">
        <input
          type="text"
          placeholder="Search"
          name="word"
          lang="ar"
          autoComplete="off"
          className={`searchInput ${searchError && "border-2 border-red"}`}
        />
        <button
          type="submit"
          className="absolute right-5 top-1/2 -translate-y-1/2"
        >
          <Search size={28} />
        </button>
      </form>
      <p className="text-red mt-3 ml-2">{searchError}</p>

      {loading ? (
        <div className="flex justify-center items-center w-full h-80">
          <Image src="/Spinner.gif" alt="loading" width={100} height={100} />
        </div>
      ) : word && wordData ? (
        <Result wordData={wordData} />
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-80">
          <p className="text-2xl text-purple">Nothing to show yet.</p>
          <p className="text-green mt-2">
            Enter an Arabic word to get started!
          </p>
        </div>
      )}
    </div>
  );
}
