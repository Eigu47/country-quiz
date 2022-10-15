import React from "react";

import FlagOption from "@/components/my-flag/FlagOption";
import useQuizChoices from "@/utils/hooks/useQuizChoices";

type Props = {
  randomIndexes: number[];
  nextCountry: () => void;
  className?: string;
  uniqueBy?: "borders" | "region";
};

export default function FlagChoices({
  randomIndexes,
  nextCountry,
  className,
  uniqueBy,
}: Props) {
  const {
    selectedCountry,
    currentCountry: correctAnswer,
    options,
    handleSelectCountry,
  } = useQuizChoices(randomIndexes, nextCountry, uniqueBy);

  return (
    <section
      className={`mx-auto my-6 grid h-full w-80 auto-cols-fr auto-rows-fr grid-cols-3 gap-4 text-2xl text-slate-50 sm:w-4/6 sm:gap-6 ${className}`}
    >
      {options.map((option) => (
        <FlagOption
          key={option.name}
          option={option}
          isCorrect={correctAnswer?.name === option.name}
          selected={selectedCountry}
          handleSelectCountry={handleSelectCountry}
        />
      ))}
    </section>
  );
}
