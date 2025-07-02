import { ArtoEnType, SearchWordType } from "@/app/lib/types/type";
import React from "react";
import WordSpeech from "./WordSpeech";
import RootRelatedWords from "./RootRelatedWords";

export default function Result({
  wordData,
  searchWord,
}: {
  wordData: ArtoEnType;
  searchWord: SearchWordType;
}) {
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
        <p className="textMedium mb-2">
          Meaning:{" "}
          <span className="text-base sm:text-lg capitalize font-normal">
            {wordData.translation}
          </span>
        </p>
        <p className="textMedium">
          Gender: <span className="text-lg font-normal">{wordData.gender}</span>
        </p>
      </div>

      <div className="line" />
      <div className="my-10">
        <p className="text-xl font-bold mb-7" lang="ar">
          Root Word:{" "}
          <span className="text-lg text-right font-normal">
            {wordData.root}
          </span>
        </p>
        <div className="text-lg">
          <p className="text-gray3">Root Word Explanation:</p>
          <p>{wordData.rootExplanation}</p>
        </div>
        <RootRelatedWords
          relatedWords={wordData.relatedWords}
          searchWord={searchWord}
        />
      </div>

      <div className="line" />
      <div>
        <h2 className="textLarge font-bold my-10">Examples</h2>
        <ul className="list-disc list-inside mr-10">
          {wordData.examples.map((example, index) => (
            <li key={index} className="my-5 text-base sm:text-lg">
              <span className="textLarge font-arabic-naskh" lang="ar">
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
