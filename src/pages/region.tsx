import { useEffect, useState } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { NextPage } from "next";

import GameOverModal from "@/components/base/GameOverModal";
import QuizCard from "@/components/base/QuizCard";
import RegionChoices from "@/components/region/RegionChoices";
import { FLAT_SUBREGIONS } from "@/constants/countries-const";
import { TIME_LIMIT } from "@/constants/game-const";
import { useRoundStore, useTimerStore } from "@/utils/store";
import { getRandomCountryIndexes } from "@/utils/utils";

const Region: NextPage = () => {
  const [randomIndexes, setRandomIndexes] = useState(
    getRandomCountryIndexes(FLAT_SUBREGIONS.length)
  );
  const [modalOpen, setModalOpen] = useState(false);

  const [autoAnimateRef] = useAutoAnimate<HTMLDivElement>();

  const { round, nextRound, resetRound } = useRoundStore();
  const startTimer = useTimerStore((state) => state.startTimer);
  const isTimerRunning = useTimerStore((state) => state.isTimerRunning);
  const isTimeLeft = useTimerStore((state) => state.isTimeLeft);

  function nextCountry() {
    if (round !== null && randomIndexes[round + 1] === undefined) {
      setRandomIndexes((prev) => [
        ...prev,
        ...getRandomCountryIndexes(FLAT_SUBREGIONS.length),
      ]);
    }

    nextRound();
    startTimer(true);
  }

  function playAgain() {
    setRandomIndexes(getRandomCountryIndexes(FLAT_SUBREGIONS.length));
    startTimer(false, TIME_LIMIT);
    resetRound();
    setModalOpen(false);
  }

  useEffect(() => {
    if (round === null) {
      setRandomIndexes(getRandomCountryIndexes(FLAT_SUBREGIONS.length));
      startTimer(false, TIME_LIMIT);
      resetRound();
      setModalOpen(false);
    }
  }, [startTimer, resetRound, round]);

  useEffect(() => {
    if (!isTimerRunning && !isTimeLeft) setModalOpen(true);
  }, [isTimerRunning, isTimeLeft]);

  const regionIndex = round !== null ? randomIndexes[round] : undefined;
  const currentRegion: string | undefined =
    regionIndex !== undefined ? FLAT_SUBREGIONS[regionIndex] : undefined;

  return (
    <main
      ref={autoAnimateRef}
      className="container mx-auto flex h-full flex-col text-center"
    >
      <QuizCard nextCountry={nextCountry} className="justify-center">
        {currentRegion && (
          <h3 key={round} className="text-2xl sm:text-3xl">
            {currentRegion}
          </h3>
        )}
      </QuizCard>
      <RegionChoices
        key={round}
        uniqueBy="region"
        nextCountry={nextCountry}
        randomIndexes={randomIndexes}
      />
      {modalOpen && (
        <GameOverModal playAgain={playAgain} setModalOpen={setModalOpen} />
      )}
    </main>
  );
};

export default Region;
