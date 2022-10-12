import React from "react";

import {
  BsCircle,
  BsFillCheckCircleFill,
  BsFillXCircleFill,
} from "react-icons/bs";

import { Country } from "@/types/country-types";

type Props = {
  option: Country;
  handleSelectCountry: (option: string) => void;
  isCorrect: boolean;
  selected: string | undefined;
};

export default function FlagOptions({
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

  function Icon() {
    if (selected !== undefined && isCorrect) return <BsFillCheckCircleFill />;
    if (selected === option.name && !isCorrect) return <BsFillXCircleFill />;
    return <BsCircle />;
  }

  return (
    <button
      className={`flex items-center justify-between rounded-xl py-2 px-6 text-lg ring-2 duration-200 sm:py-3 sm:px-10 sm:text-2xl [&_svg]:duration-200 ${getClass()}`}
      onClick={() => {
        if (selected === undefined) handleSelectCountry(option.name);
      }}
      disabled={selected !== undefined}
    >
      {option.name}
      <Icon />
    </button>
  );
}

const NO_ANSWER =
  "text-slate-50 ring-slate-50 hover:ring-emerald-500 [&_svg]:hover:text-emerald-500";
const CORRECT = "text-emerald-500 ring-emerald-500";
const WRONG = "text-red-500 ring-red-500";
const UNSELECTED = "text-slate-50 ring-slate-50";
