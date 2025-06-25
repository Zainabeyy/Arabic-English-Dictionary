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
