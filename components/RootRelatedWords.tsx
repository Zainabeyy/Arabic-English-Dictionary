"use client";

import { fetchWordData } from "@/app/lib/fetchWordData";
import { RootWordsType } from "@/app/lib/types/type";
import React from "react";

export default function RootRelatedWords(props: RootWordsType) {
  async function fetchData(word: string) {
    await fetchWordData(word);
    window.location.replace(`/?query=${word}`);
  }
  return (
    <div className="arabicParaText mt-4">
      <p className="title">Word with same Root:</p>
      {props.relatedWords.map((word, index) => (
        <div key={index} className="w-full flex justify-end">
          <button
            className="text-primary-light dark:text-primary-dark hover:underline curosr-pointer text-lg sm:text-xl flex items-baseline gap-x-3 mb-2 sm:mb-3"
            onClick={() => fetchData(word.arabic)}
            aria-label={`Search for related word ${word}`}
          >
            <span>({word.english})</span>
            <span className="text-xl sm:text-3xl">{word.arabic}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
