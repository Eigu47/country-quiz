import { useState, useEffect } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { NextPage } from "next";
import Image from "next/image";

import Modal from "../components/portal/Modal";
import QuizCard from "../components/quiz/QuizCard";
import QuizChoices from "../components/quiz/QuizChoices";
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
    if (randomIndexes[(round ?? 0) + 1] === undefined) {
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

  const currentCountry =
    round !== null ? COUNTRIES_LIST[randomIndexes[round]!] : undefined;

  return (
    <main
      ref={optionsParent}
      className="container mx-auto flex h-full flex-col text-center"
    >
      <QuizCard gameName="Guess by flag">
        {currentCountry && (
          <Image
            src={currentCountry.flag}
            alt="Flag"
            objectFit="contain"
            layout="fill"
            priority
          />
        )}
        {round === null && (
          <button
            className="mx-auto my-3 h-fit rounded-xl bg-cyan-500 px-12 py-6 text-xl shadow ring-1 ring-black/30 transition-transform duration-100 hover:scale-105 active:scale-95 sm:mb-6"
            onClick={nextCountry}
          >
            Start!
          </button>
        )}
      </QuizCard>
      <QuizChoices
        key={round}
        nextCountry={nextCountry}
        randomIndexes={randomIndexes}
      />
      {!isTimerRunning && !isTimeLeft && (
        <Modal>
          <div className="my-10 flex w-full flex-col justify-between text-center">
            <p className="text-3xl">Your score: {round ?? 0}</p>
            <button
              className="my-6 mx-auto w-min whitespace-nowrap rounded-xl bg-cyan-500 px-1 py-4 text-2xl shadow ring-1 ring-black/20 duration-100 hover:scale-105 active:scale-95 sm:px-3 sm:py-6 sm:text-3xl"
              onClick={playAgain}
            >
              Try Again?
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default Flag;
