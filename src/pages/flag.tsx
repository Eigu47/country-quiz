import { useEffect, useState } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { NextPage } from "next";
import Image from "next/image";

import GameOverModal from "../components/quiz/GameOverModal";
import QuizCard from "../components/quiz/QuizCard";
import QuizChoices from "../components/quiz/QuizChoices";
import StartButton from "../components/quiz/StartButton";
import COUNTRIES_LIST from "../constants/countries.json";
import { TIME_LIMIT } from "../constants/game-const";
import { useRoundStore, useTimerStore } from "../utils/store";
import { getRandomCountryIndexes } from "../utils/utils";

const Flag: NextPage = () => {
  const [randomIndexes, setRandomIndexes] = useState(getRandomCountryIndexes());

  const [optionsParent] = useAutoAnimate<HTMLElement>();

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

  return (
    <main
      ref={optionsParent}
      className="container mx-auto flex h-full flex-col text-center"
    >
      <QuizCard>
        {currentCountry && (
          <Image
            src={currentCountry.flag}
            alt="Flag"
            objectFit="contain"
            layout="fill"
            priority
          />
        )}
        {round === null && <StartButton nextCountry={nextCountry} />}
      </QuizCard>
      <QuizChoices
        key={round}
        nextCountry={nextCountry}
        randomIndexes={randomIndexes}
      />
      {!isTimerRunning && !isTimeLeft && (
        <GameOverModal playAgain={playAgain} />
      )}
    </main>
  );
};

export default Flag;
