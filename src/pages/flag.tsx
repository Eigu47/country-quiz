import { useState } from "react";

import type { NextPage } from "next";
import Image from "next/image";

import QuizCard from "../components/quiz/QuizCard";
import QuizChoices from "../components/quiz/QuizChoices";
import countriesList from "../constants/countries.json";
import { getRandomCountryIndexes } from "../utils/utils";

const TIMER = 10;
const OPTIONS = ["Option 1", "Option 2", "Option 3", "Option 4"];

const Flag: NextPage = () => {
  const [round, setRound] = useState<number>();
  const [randomIndexes] = useState(() => getRandomCountryIndexes());

  function nextCountry() {
    setRound((prev) => {
      if (prev === undefined) return 0;
      prev + 1;
    });
  }

  const currentCountry =
    round !== undefined ? countriesList[randomIndexes[round]!] : undefined;

  return (
    <main className="container mx-auto flex h-full flex-col text-center">
      <QuizCard gameName="Guess by flag" round={round} timer={TIMER}>
        {currentCountry && (
          <Image src={currentCountry.flag} alt="Flag" layout="fill" priority />
        )}
        {round === undefined && (
          <button
            className="mx-auto h-fit self-center rounded-xl bg-cyan-500 px-12 py-6 text-xl shadow ring-1 ring-black/30 duration-100 hover:scale-105 active:scale-95"
            onClick={nextCountry}
          >
            Start!
          </button>
        )}
      </QuizCard>
      <QuizChoices options={OPTIONS} />
    </main>
  );
};

export default Flag;
