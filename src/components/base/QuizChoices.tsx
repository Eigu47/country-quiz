import React from "react";

import FlagOption from "@/components/base/QuizChoicesOption";
import useQuizChoices from "@/utils/hooks/useQuizChoices";

type Props = {
  randomIndexes: number[];
  nextCountry: () => void;
  className?: string;
  uniqueBy?: "borders";
};

export default function QuizChoices({
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
      className={`mx-auto my-6 flex h-full w-80 flex-col justify-center gap-4 text-2xl text-slate-50 sm:w-4/6 sm:gap-6 ${className}`}
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
