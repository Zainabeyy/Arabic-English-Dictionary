import { PlayIcon } from "lucide-react";
import React from "react";

export default function WordSpeech({ word }: { word: string }) {
  function speakArabicWord(word: string) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ar-SA";
    speechSynthesis.speak(utterance);
  }
  return (
    <button
      onClick={() => {
        speakArabicWord(word);
      }}
      className="bg-primary/30 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center hover:bg-primary/50 transition-colors duration-300"
      aria-label={`Play pronunciation of the Arabic word: ${word}`}
    >
      <PlayIcon color="#a445ed" size={36} className="font-bold size-7 sm:size-9" aria-hidden="true"/>
    </button>
  );
}
