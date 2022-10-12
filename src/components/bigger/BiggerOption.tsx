import React from "react";

import Image from "next/image";

import { Country } from "@/types/country-types";

type Props = {
  option: Country;
  handleSelectCountry: (option: string) => void;
  isCorrect: boolean;
  selected: string | undefined;
};

export default function QuizChoicesBigger({
  option,
  handleSelectCountry,
  isCorrect,
  selected,
}: Props) {
  function getClass() {
    if (selected === undefined) return NO_ANSWER;
    if (isCorrect) return CORRECT;
    if (!isCorrect && selected === option.name) return WRONG;
    return UNSELECTED;
  }

  return (
    <>
      <button
        className="relative h-full w-full"
        onClick={() => {
          if (selected === undefined) handleSelectCountry(option.name);
        }}
        disabled={selected !== undefined}
      >
        <Image
          src={option.flag}
          alt="Flag"
          objectFit="contain"
          layout="fill"
          priority
        />
      </button>
    </>
  );
}

const NO_ANSWER =
  "text-slate-50 ring-slate-50 hover:ring-emerald-500 [&_svg]:hover:text-emerald-500";
const CORRECT = "text-emerald-500 ring-emerald-500";
const WRONG = "text-red-500 ring-red-500";
const UNSELECTED = "text-slate-50 ring-slate-50";
