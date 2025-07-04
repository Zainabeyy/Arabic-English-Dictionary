import { RootWordsType } from "@/app/lib/types/type";
import React from "react";

export default function RootRelatedWords({ relatedWords, searchWord }:RootWordsType) {
  return (
    <div className="arabicParaText mt-4">
      <p className="title">Word with same Root:</p>
      {relatedWords.map((word, index) => (
        <button
          key={index}
          className="text-purple hover:underline mr-2 curosr-pointer"
          onClick={() => {
            searchWord(word);
          }}
          aria-label={`Search for related word ${word}`}
        >
          {word}
        </button>
      ))}
    </div>
  );
}
