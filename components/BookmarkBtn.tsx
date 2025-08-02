'use client';

import { addBookmark, removeBookmark } from "@/app/lib/Bookmark";
import { ArtoEnType, EnToArType } from "@/app/lib/types/type";
import { Bookmark } from "lucide-react";
import React from "react";

export default function BookmarkBtn({
  wordData,
}: {
  wordData: ArtoEnType | EnToArType;
}) {
  const [bookmarked, setBookmarked] = React.useState(false);

  async function handleAddBookmark() {
    try {
      await addBookmark(wordData);
      setBookmarked(true);
    } catch (err) {
      console.log(err);
      setBookmarked(false);
    }
  }

  async function handleRemoveBookmark() {
    try {
      await removeBookmark(wordData);
      setBookmarked(false);
    } catch (err) {
      console.log(err);
      setBookmarked(true);
    }
  }

  return (
    <button onClick={bookmarked ? handleRemoveBookmark : handleAddBookmark}>
      <Bookmark
        size={34}
        color="#a445ed"
        strokeWidth={1.5}
        fill={bookmarked ? "#a445ed" : "none"}
      />
    </button>
  );
}
