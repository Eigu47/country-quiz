import React from "react";

import QuizChoicesBigger from "@/components/quiz-choices/QuizChoicesBigger";
import useQuizChoices from "@/utils/hooks/useQuizChoices";

type Props = {
  randomIndexes: number[];
  nextCountry: () => void;
};

export default function QuizCardChoices({ randomIndexes, nextCountry }: Props) {
  const { selectedCountry, options, handleSelectCountry } = useQuizChoices(
    randomIndexes,
    nextCountry
  );

  const biggestArea = Math.max(...options.map((option) => option.area));
  const biggestCountry = options.find((option) => option.area === biggestArea);

  return (
    <section className="mx-auto flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-2xl text-slate-50 sm:flex-row sm:gap-6">
      {options[0] && options[1] && (
        <>
          <QuizChoicesBigger
            option={options[0]}
            isCorrect={biggestCountry?.name === options[0].name}
            selected={selectedCountry}
            handleSelectCountry={handleSelectCountry}
          />
          <p className="text-black">VS</p>
          <QuizChoicesBigger
            option={options[1]}
            isCorrect={biggestCountry?.name === options[1].name}
            selected={selectedCountry}
            handleSelectCountry={handleSelectCountry}
          />
        </>
      )}
    </section>
  );
}
