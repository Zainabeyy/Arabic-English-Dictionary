export interface Example {
  arabic: string;
  english: string;
}

export interface WordDataType {
  searchWithHarakat:string;
  translation: string;
  gender: string;
  root: string;
  rootExplanation: string;
  type: {
    arabic: string;
    english: string;
  };
  examples: Example[];
}
