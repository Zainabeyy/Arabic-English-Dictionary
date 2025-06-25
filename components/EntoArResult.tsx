import { EnToArType } from "@/app/lib/types/type";
import React from "react";

export default function EntoArResult({ wordData }: { wordData: EnToArType }) {
  console.log(wordData);
  return (
    <section>
      <div className="mt-16 mb-11 text-right">
        <h1
          className="text-[4rem] font-medium text-dark2 dark:text-white w-full"
          lang="ar"
        >
          {wordData.arabicTranslation}
        </h1>
        <p className="text-purple">
          ({wordData.type.english}){" "}
          <span className="text-xl" lang="ar">
            {wordData.type.arabic}
          </span>
        </p>
      </div>

      <div className="line" />
      <div className="my-10">
        <p className="title">
          Masculine:{" "}
          <span className="description">{wordData.genderForms?.masculine}</span>
        </p>
        <p className="title">
          Feminine:{" "}
          <span className="description">{wordData.genderForms?.feminine}</span>
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
        <div className="text-xl mt-4">
          <p className="text-gray3 text-lg">Word with same Root:</p>
          <p className="text-purple">{wordData.relatedRoots.join(", ")}</p>
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
