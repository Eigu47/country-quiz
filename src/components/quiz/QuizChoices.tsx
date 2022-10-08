import React, { useMemo, useState, useRef } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import COUNTRIES_LIST from "../../constants/countries.json";
import { useRoundStore, useTimerStore } from "../../utils/store";
import useTimeout from "../../utils/useTimeout";
import { getOptions } from "../../utils/utils";
import QuizChoicesOption from "./QuizChoicesOption";

type Props = {
  randomCountryIndexes: number[];
};

export default function QuizChoices({ randomCountryIndexes }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const nextRoundDelay = useRef(false);

  const { round, nextRound, resetRound } = useRoundStore();
  const startTimer = useTimerStore((state) => state.startTimer);
  const addTime = useTimerStore((state) => state.addTime);

  const [optionsParent] = useAutoAnimate<HTMLElement>({ duration: 100 });

  const options = useMemo(
    () => (round !== 0 ? getOptions(randomCountryIndexes, round) : []),
    [randomCountryIndexes, round]
  );

  const correctAnwswer = COUNTRIES_LIST[randomCountryIndexes[round]].name;

  function handleSelectCountry(option: string) {
    startTimer(false);
    setSelectedCountry(option);

    nextRoundDelay.current = true;
  }

  useTimeout(
    () => {
      if (selectedCountry === correctAnwswer) {
        addTime(2);
        nextRound();
        startTimer(true);
      } else {
        resetRound();
        startTimer(false, 0);
      }

      setSelectedCountry(undefined);
      nextRoundDelay.current = false;
    },
    2500,
    nextRoundDelay.current
  );

  return (
    <section
      ref={optionsParent}
      className="mx-auto my-20 flex h-full w-80 flex-col justify-between text-2xl text-slate-50 sm:w-4/6"
    >
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
