"use client";

import { db } from "@/app/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { Minus } from "lucide-react";
import { useAuth } from "@/app/lib/auth/AuthProvider";
import { BookmarkDataType } from "@/app/lib/types/type";
import { removeBookmarkWithId } from "@/app/lib/Bookmark";

export default function BookmarkPage() {
  const [data, setData] = React.useState<BookmarkDataType[]>([]);
  const { user } = useAuth();

  React.useEffect(() => {
    async function fetchData() {
      if (user) {
        const uid = user.uid;
        const dbData = await getDocs(
          collection(db, "users", uid, "bookmarkWords")
        );

        const bookmarks: BookmarkDataType[] = dbData.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<BookmarkDataType, "id">),
        }));

        setData(bookmarks);
      }
    }
    fetchData();
  }, [user, data]);

  return (
    <div className="max-w-3xl w-full my-16 mx-7 sm:mx-12">
      <h2 className="text-4xl font-semibold mb-10">Bookmarked Words</h2>
      {!user ? (
        <div>You are not logged in</div>
      ) : data.length === 0 ? (
        <p className="sm:text-lg text-primary-light dark:text-primary-dark">
          No bookmarks found.
        </p>
      ) : (
        <ul className="space-y-4">
          {data.map((item) => (
            <li
              key={item.id}
              className="p-6 border border-secondary hover:border-primary hover:border-2 flex justify-between items-center rounded-2xl shadow-sm text-2xl"
            >
              <p> {item.enWord}</p>
              <div className="flex items-center gap-4">
                <p className="text-4xl">{item.arWord}</p>
                <button onClick={() => removeBookmarkWithId(item.id)} className="bg-primary-light dark:bg-primary-dark rounded-full p-1">
                  <Minus strokeWidth="4"/>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
