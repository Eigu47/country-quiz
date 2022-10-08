import { useState } from "react";

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
  const [randomCountryIndexes, setRandomCountryIndexes] = useState(() =>
    getRandomCountryIndexes()
  );

  const { round, nextRound, resetRound, score, resetScore } = useRoundStore();
  const startTimer = useTimerStore((state) => state.startTimer);
  const isTimerRunning = useTimerStore((state) => state.isTimerRunning);
  const isTimeLeft = useTimerStore((state) => state.isTimeLeft);

  function nextCountry() {
    startTimer(true);
    nextRound();
  }

  function playAgain() {
    setRandomCountryIndexes(getRandomCountryIndexes());
    startTimer(false, TIME_LIMIT);
    resetRound();
    resetScore();
  }

  const currentCountry =
    round !== 0 ? COUNTRIES_LIST[randomCountryIndexes[round]] : undefined;

  return (
    <main className="container mx-auto flex h-full flex-col text-center">
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
        {round === 0 && (
          <button
            className="mx-auto h-fit self-center rounded-xl bg-cyan-500 px-12 py-6 text-xl shadow ring-1 ring-black/30 duration-100 hover:scale-105 active:scale-95"
            onClick={nextCountry}
          >
            Start!
          </button>
        )}
      </QuizCard>
      <QuizChoices randomCountryIndexes={randomCountryIndexes} />
      {!isTimerRunning && !isTimeLeft && (
        <Modal>
          <div className="my-10 flex w-full flex-col justify-between text-center">
            <p className="text-3xl">Your score: {score - 1}</p>
            <button
              className="my-10 mx-auto w-min whitespace-nowrap rounded-xl bg-cyan-500 px-3 py-6 text-3xl shadow ring-1 ring-black/20 duration-100 hover:scale-105 active:scale-95"
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
