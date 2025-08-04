import { User } from "firebase/auth";
import React from "react";

export interface Example {
  arabic: string;
  english: string;
}

export interface ArtoEnType {
  searchWithHarakat: string;
  translation: string;
  gender: string;
  root: string;
  rootExplanation: string;
  type: {
    arabic: string;
    english: string;
  };
  examples: Example[];
  relatedWords: string[];
}

export interface EnToArType {
  englishWord: string;
  arabicTranslation: string;
  genderForms?: {
    masculine: string;
    feminine: string;
  };
  type: {
    arabic: string;
    english: string;
  };
  root: string;
  rootExplanation: string;
  relatedRoots: string[];
  examples: Example[];
}

export interface SearchWordType {
  (word: string): void;
}

export type RootWordsType = {
  relatedWords: rootRelatedWordType[];
  searchWord?: SearchWordType;
};

export type rootRelatedWordType = {
  arabic: string;
  english: string;
};

export type BookmarkDataType = {
  id: string;
  arWord: string;
  enWord: string;
  wordType: {
    arabic: string;
    english: string;
  };
  rootWord: string;
  rootWordExplanation: string;
  rootRelatedWords: rootRelatedWordType[];
  examples: Example[];
};

export type NavItemProps = {
  link?: string;
  label: string;
  icon: React.ElementType;
  open: boolean;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
};

export type SearchParamsProp = {
    searchParams:Promise<{query: string | undefined;}>
};