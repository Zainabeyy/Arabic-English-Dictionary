"use client";

import { addBookmark, removeBookmark } from "@/app/lib/Bookmark";
import { ArtoEnType, EnToArType } from "@/app/lib/types/type";
import { Bookmark } from "lucide-react";
import React from "react";
import { auth } from "@/app/lib/firebaseConfig";

export default function BookmarkBtn({
  wordData,
}: {
  wordData: ArtoEnType | EnToArType;
}) {
  const [bookmarked, setBookmarked] = React.useState(false);
  const [user, setUser] = React.useState(() => auth.currentUser);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  async function handleAddBookmark() {
    if (!user) return; // do nothing if not logged in
    try {
      await addBookmark(wordData);
      setBookmarked(true);
    } catch (err) {
      console.log(err);
      setBookmarked(false);
    }
  }

  async function handleRemoveBookmark() {
    if (!user) return; // do nothing if not logged in
    try {
      await removeBookmark(wordData);
      setBookmarked(false);
    } catch (err) {
      console.log(err);
      setBookmarked(true);
    }
  }

  const isDisabled = !user;

  return (
    <div className="relative group inline-block">
      <button
        onClick={bookmarked ? handleRemoveBookmark : handleAddBookmark}
        aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        className={`${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <Bookmark
          size={34}
          color={isDisabled ? "gray" : "#a445ed"}
          strokeWidth={1.5}
          fill={bookmarked && !isDisabled ? "#a445ed" : "none"}
        />
      </button>

      {/* Tooltip */}
      {isDisabled && (
        <span className="absolute top-6 mt-2 w-[17ch] bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Login to bookmark this word
        </span>
      )}
    </div>
  );
}
