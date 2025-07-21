"use client";

import React from "react";
import { getBookmarkById } from "@/app/lib/Bookmark";
import WordSpeech from "@/components/WordSpeech";
// import BookmarkBtn from "@/components/BookmarkBtn";
import RootRelatedWords from "@/components/RootRelatedWords";
import { BookmarkDataType } from "@/app/lib/types/type";
import { useParams } from "next/navigation";
export default function BookmarkWordPage() {
  const param = useParams();
  const { id } = param;
  const [bookmark, setBookmark] = React.useState<BookmarkDataType | null>(null);

  React.useEffect(() => {
    async function fetchBookmark() {
      const data = await getBookmarkById(id as string);
      setBookmark(data as BookmarkDataType);
    }

    fetchBookmark();
  }, [id]);
  console.log(bookmark);

  if (bookmark)
    return (
      <main className="max-w-3xl w-full my-16 mx-7 sm:mx-12">
        <section className="flex justify-between items-center">
          <WordSpeech word={bookmark.arWord} />
          <div className="flex justify-end items-center gap-6 mt-16 mb-11">
            <div className="mt-16 mb-11 text-right">
              <h1 className="mainWord" lang="ar">
                {bookmark.arWord}
              </h1>
              <p className="wordType">
                ({bookmark.wordType.english}){" "}
                <span lang="ar">{bookmark.wordType.arabic}</span>
              </p>
            </div>
            {/* <BookmarkBtn bookmark={bookmark} /> */}
          </div>
        </section>

        <div className="my-10">
          <p className="text-4xl mb-7 capitalize" lang="ar">
            {bookmark.enWord}
          </p>
        </div>

        <div className="line" />
        <section className="my-10">
          <p className="title mb-7" lang="ar">
            Root Word:{" "}
            <span className="arabicParaText text-right">
              {bookmark.rootWord}
            </span>
          </p>
          <p className="title">
            Root Word Explanation:
            <span className="description">{bookmark.rootWordExplanation}</span>
          </p>
          <RootRelatedWords relatedWords={bookmark.rootRelatedWords} />
        </section>

        <div className="line" />
        <section>
          <h2 className="title font-bold my-10">Examples</h2>
          <ul className="list-disc list-inside mr-10">
            {bookmark.examples.map((example, index) => (
              <li key={index} className="my-5 text-base sm:text-lg">
                <span className="arabicParaText font-arabic-naskh" lang="ar">
                  {example.arabic}
                </span>
                <span className="block ml-5 mt-1">{example.english}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    );
}
