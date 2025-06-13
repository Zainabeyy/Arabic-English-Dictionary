import { WordDataType } from "@/app/types/type";
import React from "react";

export default function Result({ wordData }: { wordData: WordDataType }) {
  return (
    <section>
      <div className="mt-16 mb-11">
        <h1
          className="text-[4rem] font-medium text-dark2 dark:text-white text-right w-full"
          lang="ar"
        >
          {wordData.searchWithHarakat}
        </h1>
        <p className="text-purple text-right">
          ({wordData.type.english}){" "}
          <span className="text-xl" lang="ar">
            {wordData.type.arabic}
          </span>
        </p>
      </div>

      <div className="line" />
      <div className="my-10">
        <p className="text-xl font-bold mb-2">
          Meaning:{" "}
          <span className="text-lg capitalize font-normal">
            {wordData.translation}
          </span>
        </p>
        <p className="text-xl font-bold">
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
      </div>

      <div className="line" />
      <div>
        <h2 className="text-2xl font-bold my-10">Examples</h2>
        <ul className="list-disc list-inside mr-10">
          {wordData.examples.map((example, index) => (
            <li key={index} className="my-5 text-lg">
              <span className="text-2xl font-arabic-naskh" lang="ar">
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
