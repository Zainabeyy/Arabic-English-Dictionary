"use client";

import { Search } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm({ defaultQuery }: { defaultQuery: string }) {
  const [query, setQuery] = useState(defaultQuery);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      router.push(`/?query=${encodeURIComponent(query)}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12 relative">
      <input
        type="text"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Arabic or English word"
        aria-label="Search Arabic or English word"
        lang="ar"
        dir="auto"
        autoComplete="off"
        className={`searchInput ${isPending && "opacity-60"} `}
      />
      <button
        type="submit"
        disabled={isPending}
        className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 text-gray2"
        aria-label="Search"
      >
        {isPending ? (
          <div className="animate-spin border-2 border-gray2 border-t-transparent rounded-full size-5"></div>
        ) : (
          <Search size={28} className="size-4 sm:size-7" />
        )}
      </button>
    </form>
  );
}
