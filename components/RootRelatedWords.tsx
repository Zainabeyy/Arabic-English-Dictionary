import { RootWordsType } from "@/app/lib/types/type";
import React from "react";

export default function RootRelatedWords(props: RootWordsType) {
  return (
    <div className="arabicParaText mt-4">
      <p className="title">Word with same Root:</p>
      {props.relatedWords.map((word, index) => (
        <button
          key={index}
          className="text-primary-light dark:text-primary-dark hover:underline mr-2 curosr-pointer"
          onClick={() => {
            if (props.searchWord) props.searchWord(word);
          }}
          aria-label={`Search for related word ${word}`}
        >
          ,{word}
        </button>
      ))}
    </div>
  );
}
