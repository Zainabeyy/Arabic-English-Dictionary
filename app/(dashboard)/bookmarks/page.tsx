"use client";

import { db } from "@/app/lib/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import { ArrowRight, Minus } from "lucide-react";
import { useAuth } from "@/app/lib/auth/AuthProvider";
import { BookmarkDataType } from "@/app/lib/types/type";
import { removeBookmarkWithId } from "@/app/lib/Bookmark";
import Link from "next/link";

export default function BookmarkPage() {
  const [data, setData] = React.useState<BookmarkDataType[]>([]);
  const [loading, setLoading] = React.useState(true); // 👈 start as loading
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const uid = user.uid;
    const unsubscribe = onSnapshot(
      collection(db, "users", uid, "bookmarkWords"),
      (snapshot) => {
        // 👇 Only show loading spinner for the *first* snapshot
        const bookmarks: BookmarkDataType[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<BookmarkDataType, "id">),
        }));

        setData(bookmarks);
        setLoading(false); // after first response
      },
      (error) => {
        console.error("Error fetching real-time bookmarks:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // 👇 UI rendering
  return (
    <div className="max-w-3xl w-full my-16 mx-7 sm:mx-12">
      <h2 className="text-4xl font-semibold mb-10">Bookmarked Words</h2>

      {!user ? (
        <div>You are not logged in</div>
      ) : loading ? (
        <div className="flex items-center gap-2 text-lg sm:text-2xl text-primary-light dark:text-primary-dark">
          <span className="animate-spin border-2 border-primary-light dark:border-primary-dark border-t-transparent rounded-full size-5"></span>
          Loading bookmarks...
        </div>
      ) : data.length === 0 ? (
        <p className="sm:text-lg text-primary-light dark:text-primary-dark">
          No bookmarks found.
        </p>
      ) : (
        <ul className="space-y-4">
          {data.map((item) => (
            <li
              key={item.id}
              className="p-6 border border-secondary flex flex-col rounded-2xl shadow-sm text-2xl"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => removeBookmarkWithId(item.id)}
                    className="bg-secondary hover:bg-primary text-white rounded-full p-1"
                  >
                    <Minus strokeWidth="3" size={18} color="white" />
                  </button>
                  <p>{item.enWord}</p>
                </div>
                <p className="text-4xl">{item.arWord}</p>
              </div>

              <Link
                href={`/bookmarks/${item.id}`}
                className="flex items-center gap-1 mt-3 hover:text-primary focus:text-primary focus:underline bookmarkLink"
              >
                <p className="text-sm">detail</p>
                <ArrowRight size={14} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
