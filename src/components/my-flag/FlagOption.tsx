import React from "react";

import Image from "next/image";

import { Country } from "@/types/country-types";

type Props = {
  option: Country;
  handleSelectCountry: (option: string) => void;
  isCorrect: boolean;
  selected: string | undefined;
};

export default function FlagOption({
  option,
  handleSelectCountry,
  isCorrect,
  selected,
}: Props) {
  function getClass() {
    if (!selected) return NO_ANSWER;
    if (isCorrect) return CORRECT;
    if (!isCorrect && selected === option.name) return WRONG;
    return UNSELECTED;
  }

  return (
    <button
      className={`relative flex items-center justify-between overflow-hidden rounded-xl py-2 px-6 ring-2 duration-200 sm:py-3 sm:px-10 ${getClass()}`}
      onClick={() => {
        if (!selected) handleSelectCountry(option.name);
      }}
      disabled={!!selected}
    >
      <Image
        src={option.flag}
        alt="Flag"
        objectFit="contain"
        layout="fill"
        priority
      />
    </button>
  );
}

const NO_ANSWER = "ring-slate-50 hover:ring-emerald-500";
const CORRECT = "ring-4 ring-emerald-500";
const WRONG = "ring-4 ring-red-500";
const UNSELECTED = "ring-slate-50";
