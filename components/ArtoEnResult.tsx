import { ArtoEnType, SearchWordType } from "@/app/lib/types/type";
import React from "react";
import WordSpeech from "./WordSpeech";
import RootRelatedWords from "./RootRelatedWords";

export default function Result({
  wordData,
  searchWord,
}: {
  wordData: ArtoEnType | string;
  searchWord: SearchWordType;
}) {
  if(typeof wordData === "string")
    return <p className="text-center mt-16 text-xl text-purple">{wordData}</p>;
  else
  return (
    <section>
      <div className="flex justify-between items-center">
        <WordSpeech word={wordData.searchWithHarakat} />
        <div className="mt-16 mb-11 text-right">
          <h1
            className="mainWord"
            lang="ar"
          >
            {wordData.searchWithHarakat}
          </h1>
          <p className="wordType">
            ({wordData.type.english}){" "}
            <span lang="ar">
              {wordData.type.arabic}
            </span>
          </p>
        </div>
      </div>

      <div className="line" />
      <div className="my-10">
        <p className="title mb-2">
          Meaning:{" "}
          <span className="description capitalize">
            {wordData.translation}
          </span>
        </p>
        <p className="title">
          Gender: <span className="description">{wordData.gender}</span>
        </p>
      </div>

      <div className="line" />
      <div className="my-10">
        <p className="title mb-7" lang="ar">
          Root Word:{" "}
          <span className="description text-right">
            {wordData.root}
          </span>
        </p>
        <p className="title">
          Root Word Explanation:
          <span className="description">{wordData.rootExplanation}</span>
        </p>
        <RootRelatedWords
          relatedWords={wordData.relatedWords}
          searchWord={searchWord}
        />
      </div>

      <div className="line" />
      <div>
        <h2 className="title my-10">Examples</h2>
        <ul className="list-disc list-inside mr-10">
          {wordData.examples.map((example, index) => (
            <li key={index} className="my-5 text-base sm:text-lg">
              <span className="arabicParaText font-arabic-naskh" lang="ar">
                {example.arabic}
              </span>
              <span className="block ml-5 mt-1">{example.english}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
