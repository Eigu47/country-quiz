import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { NextPage } from "next";
import Image from "next/image";

import Modal from "../components/portal/Modal";
import QuizCard from "../components/quiz/QuizCard";
import QuizChoices from "../components/quiz/QuizChoices";
import countriesList from "../constants/countries.json";
import { useTimerStore } from "../utils/store";
import { getRandomCountryIndexes } from "../utils/utils";

const TIMER = 4;
const OPTIONS = ["Option 1", "Option 2", "Option 3", "Option 4"];

const Flag: NextPage = () => {
  const [round, setRound] = useState<number>();
  const [randomIndexes, setRandomIndexes] = useState(() =>
    getRandomCountryIndexes()
  );

  const startTimer = useTimerStore((state) => state.startTimer);
  const isTimeOver = useTimerStore((state) => state.isTimeOver);
  const setTimer = useTimerStore((state) => state.setTimer);

  const currentCountry =
    round !== undefined ? countriesList[randomIndexes[round]] : undefined;

  return (
    <main className="container mx-auto flex h-full flex-col text-center">
      <QuizCard gameName="Guess by flag" round={round} initialTimer={TIMER}>
        {currentCountry && (
          <Image
            src={currentCountry.flag}
            alt="Flag"
            objectFit="contain"
            layout="fill"
            priority
          />
        )}
        {round === undefined && (
          <button
            className="mx-auto h-fit self-center rounded-xl bg-cyan-500 px-12 py-6 text-xl shadow ring-1 ring-black/30 duration-100 hover:scale-105 active:scale-95"
            onClick={() => nextCountry(startTimer, setRound)}
          >
            Start!
          </button>
        )}
      </QuizCard>
      <QuizChoices options={OPTIONS} />
      {isTimeOver && (
        <Modal>
          <div className="my-10 flex w-full flex-col justify-between text-center">
            <p className="text-3xl">Your score: {round}</p>
            <button
              className="my-10 mx-auto w-min whitespace-nowrap rounded-xl bg-cyan-500 px-3 py-6 text-3xl shadow ring-1 ring-black/30 duration-100 hover:scale-105 active:scale-95"
              onClick={() =>
                playAgain(setRandomIndexes, setRound, setTimer, startTimer)
              }
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

function nextCountry(
  startTimer: (boolean: boolean) => void,
  setRound: Dispatch<SetStateAction<number | undefined>>
) {
  startTimer(true);

  setRound((prev) => {
    if (prev === undefined) return 0;
    prev + 1;
  });
}

function playAgain(
  setRandomIndexes: Dispatch<SetStateAction<number[]>>,
  setRound: Dispatch<SetStateAction<number | undefined>>,
  setTimer: (number: number) => void,
  startTimer: (boolean: boolean) => void
) {
  setRandomIndexes(getRandomCountryIndexes());
  setRound(0);
  setTimer(TIMER);
  startTimer(true);
}
