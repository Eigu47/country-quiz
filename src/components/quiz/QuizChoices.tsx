import React, { useMemo, useRef, useState } from "react";

import COUNTRIES_LIST from "../../constants/countries.json";
import useTimeout from "../../utils/hooks/useTimeout";
import { useRoundStore, useTimerStore } from "../../utils/store";
import { getOptions } from "../../utils/utils";
import QuizChoicesOption from "./QuizChoicesOption";

type Props = {
  randomIndexes: number[];
  nextCountry: () => void;
};

export default function QuizChoices({ randomIndexes, nextCountry }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const nextRoundDelay = useRef(false);

  const { round } = useRoundStore();
  const startTimer = useTimerStore((state) => state.startTimer);
  const addTime = useTimerStore((state) => state.addTime);

  const countryIndex = round !== null ? randomIndexes[round] : undefined;
  const correctAnwswer =
    countryIndex !== undefined ? COUNTRIES_LIST[countryIndex]?.name : undefined;

  const options = useMemo(() => getOptions(countryIndex), [countryIndex]);

  function handleSelectCountry(option: string) {
    startTimer(false);
    setSelectedCountry(option);

    nextRoundDelay.current = true;
  }

  useTimeout(
    () => {
      if (selectedCountry === correctAnwswer) {
        addTime(2);
        nextCountry();
      } else {
        startTimer(false, 0);
      }

      nextRoundDelay.current = false;
    },
    2000,
    nextRoundDelay.current
  );

  return (
    <section className="mx-auto my-6 flex h-full w-80 flex-col justify-center gap-4 text-2xl text-slate-50 sm:w-4/6 sm:gap-6">
      {options.map((option) => (
        <QuizChoicesOption
          key={option.name}
          option={option}
          state={
            !selectedCountry
              ? "unanswered"
              : correctAnwswer === option.name
              ? "correct"
              : correctAnwswer !== option.name &&
                selectedCountry === option.name
              ? "incorrect"
              : "unselected"
          }
          handleSelectCountry={handleSelectCountry}
        />
      ))}
    </section>
  );
}
