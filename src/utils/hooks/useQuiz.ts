import { useEffect, useState } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import COUNTRIES_LIST from "@/constants/countries.json";
import { TIME_LIMIT } from "@/constants/game-const";
import { useRoundStore, useTimerStore } from "@/utils/store";
import { getRandomCountryIndexes } from "@/utils/utils";

export default function useQuiz() {
  const [randomIndexes, setRandomIndexes] = useState(getRandomCountryIndexes());

  const [autoAnimateRef] = useAutoAnimate<HTMLElement>();

  const { round, nextRound, resetRound } = useRoundStore();
  const startTimer = useTimerStore((state) => state.startTimer);
  const isTimerRunning = useTimerStore((state) => state.isTimerRunning);
  const isTimeLeft = useTimerStore((state) => state.isTimeLeft);

  function nextCountry() {
    if (round !== null && randomIndexes[round + 1] === undefined) {
      setRandomIndexes((prev) => [...prev, ...getRandomCountryIndexes()]);
    }

    nextRound();
    startTimer(true);
  }

  function playAgain() {
    setRandomIndexes(getRandomCountryIndexes());
    startTimer(false, TIME_LIMIT);
    resetRound();
  }

  useEffect(() => {
    startTimer(false, TIME_LIMIT);
    resetRound();
  }, [startTimer, resetRound]);

  const countryIndex = round !== null ? randomIndexes[round] : undefined;
  const currentCountry =
    countryIndex !== undefined ? COUNTRIES_LIST[countryIndex] : undefined;

  return {
    randomIndexes,
    autoAnimateRef,
    round,
    isTimerRunning,
    isTimeLeft,
    nextCountry,
    playAgain,
    currentCountry,
  };
}
