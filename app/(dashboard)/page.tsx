import { ArtoEnType, EnToArType, SearchParamsProp } from "@/app/lib/types/type";
import { Search } from "lucide-react";
import React from "react";
import ArtoEnResult from "@/components/ArtoEnResult";
import EntoArResult from "@/components/EntoArResult";
import RiveBird from "@/components/RiveBird";
import Form from "next/form";
import { fetchWordData } from "../lib/fetchWordData";

export default async function Home({ searchParams }:SearchParamsProp) {
  const query = ((await searchParams)?.query?.trim()) || "";
  let wordData: ArtoEnType | EnToArType | string = "";
  let direction = null;
  let error = "";

if (query) {
    const result = await fetchWordData(query);
    wordData = result.data || "";
    direction = result.direction;
    error = result.error || "";
  }


  return (
    <div className="max-w-3xl w-full my-8 mx-7 sm:mx-12">
      <Form action="/" className="mt-12 relative">
        <input
          type="text"
          aria-label="Search Arabic or English word"
          placeholder="Search Arabic or English word"
          name="query"
          defaultValue={query}
          lang="ar"
          autoComplete="off"
          dir="auto"
          className={`searchInput ${error && "ring-2 ring-red"}`}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 text-gray2"
          aria-label="Search"
        >
          <Search size={28} className="size-4 sm:size-7" />
        </div>
      </Form>

      {error && <p className="text-red mt-3 ml-2">{error}</p>}

      <div aria-live="polite" role="region" className="mt-8">
        {query ? (
          wordData === "Word Not found." ? (
            <p className="text-red">Word not found.</p>
          ) : direction === "arToEn" ? (
            <ArtoEnResult wordData={wordData as ArtoEnType}/>
          ) : (
            <EntoArResult wordData={wordData as EnToArType} />
          )
        ) : (
          <div className="flex flex-col justify-center items-center w-full mt-10">
            <RiveBird />
            <p className="text-lg sm:text-2xl text-primary-light dark:text-primary-dark">
              Nothing to show yet.
            </p>
            <p className="text-secondary-light dark:text-secondary-dark mt-2 text-sm sm:text-base">
              Enter an Arabic or English word to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
