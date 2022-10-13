import React, { useMemo, useRef, useState } from "react";

import QuizChoicesOption from "@/components/base/QuizChoicesOption";
import { FLAT_SUBREGIONS } from "@/constants/countries-const";
import COUNTRIES_LIST from "@/constants/countries.json";
import type { Country } from "@/types/country-types";
import useGetGameMode from "@/utils/hooks/useGetGameMode";
import useTimeout from "@/utils/hooks/useTimeout";
import { useRoundStore, useTimerStore } from "@/utils/store";
import { getRandomCountry, shuffleArray } from "@/utils/utils";

const COUNTRIES_LENGTH = COUNTRIES_LIST.length;

type Props = {
  randomIndexes: number[];
  nextCountry: () => void;
  className?: string;
  uniqueBy?: "borders" | "region";
};

export default function RegionChoices({
  randomIndexes,
  nextCountry,
  className,
}: Props) {
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const nextRoundDelay = useRef(false);

  const gameMode = useGetGameMode();
  const { round } = useRoundStore();
  const startTimer = useTimerStore((state) => state.startTimer);
  const addTime = useTimerStore((state) => state.addTime);

  const regionIndex = round !== null ? randomIndexes[round] : undefined;
  const currentRegion: string | undefined =
    regionIndex !== undefined ? FLAT_SUBREGIONS[regionIndex] : undefined;

  // const correctCountry = useMemo(
  //   () => getRandomCountry("region", currentRegion),
  //   [currentRegion]
  // );

  // const options = useMemo(
  //   () => getRegionOptions(currentRegion, gameMode?.options, correctCountry),
  //   [currentRegion, gameMode?.options, correctCountry]
  // );

  const [correctCountry] = useState(() =>
    getRandomCountry("region", currentRegion)
  );
  const [options] = useState(() =>
    getRegionOptions(currentRegion, gameMode?.options, correctCountry)
  );

  function handleSelectCountry(option: string) {
    startTimer(false);
    setSelectedCountry(option);

    nextRoundDelay.current = true;
  }

  useTimeout(
    () => {
      if (selectedCountry === correctCountry.name) {
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
    <section
      className={`mx-auto my-6 flex h-full w-80 flex-col justify-center gap-4 text-2xl text-slate-50 sm:w-4/6 sm:gap-6 ${className}`}
    >
      {options.map((option) => (
        <QuizChoicesOption
          key={option.name}
          option={option}
          isCorrect={correctCountry?.name === option.name}
          selected={selectedCountry}
          handleSelectCountry={handleSelectCountry}
        />
      ))}
    </section>
  );
}

export function getRegionOptions(
  currentRegion: string | undefined,
  optionsLength: number | undefined,
  correctCountry: Country | undefined
): Country[] {
  if (!currentRegion || !optionsLength || !correctCountry) return [];

  const options = [correctCountry];

  while (options.length < optionsLength) {
    const randomIndex = Math.floor(Math.random() * COUNTRIES_LENGTH);
    const randomCountry = COUNTRIES_LIST[randomIndex] as Country;

    if (
      randomCountry === undefined ||
      options.includes(randomCountry) ||
      randomCountry.subregion !== currentRegion
    )
      continue;

    options.push(randomCountry);
  }

  return shuffleArray(options);
}
