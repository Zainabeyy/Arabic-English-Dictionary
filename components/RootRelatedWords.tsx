"use client";

import { fetchWordData } from "@/app/lib/fetchWordData";
import { RootWordsType } from "@/app/lib/types/type";
import React from "react";

export default function RootRelatedWords(props: RootWordsType) {
  async function fetchData(word:string){
    await fetchWordData(word);
    window.location.replace(`/?query=${word}`)
  }
  return (
    <div className="arabicParaText mt-4">
      <p className="title">Word with same Root:</p>
      {props.relatedWords.map((word, index) => (
        <button
          key={index}
          className="text-primary-light dark:text-primary-dark hover:underline mr-2 curosr-pointer"
          onClick={()=>fetchData(word)}
          aria-label={`Search for related word ${word}`}
        >
          ,{word}
        </button>
      ))}
    </div>
  );
}
