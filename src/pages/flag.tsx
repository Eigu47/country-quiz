import { useState } from "react";

import type { NextPage } from "next";
import Image from "next/image";

import Modal from "../components/portal/Modal";
import QuizCard from "../components/quiz/QuizCard";
import QuizChoices from "../components/quiz/QuizChoices";
import countriesList from "../constants/countries.json";
import { useRoundStore, useTimerStore } from "../utils/store";
import { getRandomCountryIndexes } from "../utils/utils";

const TIME_LIMIT = 10;
const OPTIONS = ["Option 1", "Option 2", "Option 3", "Option 4"];

const Flag: NextPage = () => {
  const [randomCountryIndexes, setRandomCountryIndexes] = useState(() =>
    getRandomCountryIndexes()
  );

  const { round, nextRound, resetRound } = useRoundStore();
  const playTimer = useTimerStore((state) => state.playTimer);
  const setTimer = useTimerStore((state) => state.setTimer);
  const isTimerRunning = useTimerStore((state) => state.isTimerRunning);
  const isTimeOver = useTimerStore((state) => state.isTimeOver);

  const currentCountry =
    round !== 0 ? countriesList[randomCountryIndexes[round]] : undefined;

  function nextCountry() {
    setTimer(TIME_LIMIT);
    playTimer(true);
    nextRound();
  }

  function playAgain() {
    setRandomCountryIndexes(getRandomCountryIndexes());
    resetRound();
    setTimer(TIME_LIMIT);
  }

  return (
    <main className="container mx-auto flex h-full flex-col text-center">
      <QuizCard gameName="Guess by flag" round={round} timeLimit={TIME_LIMIT}>
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
      <QuizChoices options={OPTIONS} />
      {!isTimerRunning && isTimeOver && (
        <Modal>
          <div className="my-10 flex w-full flex-col justify-between text-center">
            <p className="text-3xl">Your score: {round}</p>
            <button
              className="my-10 mx-auto w-min whitespace-nowrap rounded-xl bg-cyan-500 px-3 py-6 text-3xl shadow ring-1 ring-black/30 duration-100 hover:scale-105 active:scale-95"
              onClick={playAgain}
            >
              Play Again?
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default Flag;
