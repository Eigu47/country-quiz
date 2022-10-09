import React, { useMemo, useState, useRef } from "react";

import COUNTRIES_LIST from "../../constants/countries.json";
import { useRoundStore, useTimerStore } from "../../utils/store";
import useTimeout from "../../utils/useTimeout";
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

  const options = useMemo(
    () => (round !== null ? getOptions(randomIndexes, round) : []),
    [randomIndexes, round]
  );

  const correctAnwswer =
    round !== null ? COUNTRIES_LIST[randomIndexes[round]!]?.name : undefined;

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
          key={option}
          option={option}
          state={
            !selectedCountry
              ? "unanswered"
              : correctAnwswer === option
              ? "correct"
              : correctAnwswer !== option && selectedCountry === option
              ? "incorrect"
              : "unselected"
          }
          handleSelectCountry={handleSelectCountry}
        />
      ))}
    </section>
  );
}
