import { useMemo, useRef, useState } from "react";

import COUNTRIES_LIST from "@/constants/countries.json";
import type { Country } from "@/types/country-types";
import useGetGameMode from "@/utils/hooks/useGetGameMode";
import useTimeout from "@/utils/hooks/useTimeout";
import { useRoundStore, useTimerStore } from "@/utils/store";
import { getOptions } from "@/utils/utils";

export default function useQuizChoices(
  randomIndexes: number[],
  nextCountry: () => void,
  uniqueBy?: "borders" | "region"
) {
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const nextRoundDelay = useRef(false);

  const gameMode = useGetGameMode();
  const { round } = useRoundStore();
  const startTimer = useTimerStore((state) => state.startTimer);
  const addTime = useTimerStore((state) => state.addTime);

  const countryIndex = round !== null ? randomIndexes[round] : undefined;
  const currentCountry: Country | undefined =
    countryIndex !== undefined ? COUNTRIES_LIST[countryIndex] : undefined;

  const [correctCountry, setCorrectCountry] = useState<string | undefined>(
    currentCountry?.name
  );

  const [options] = useState(() =>
    getOptions(countryIndex, gameMode?.options, uniqueBy)
  );

  // const options = useMemo(
  //   () => getOptions(countryIndex, gameMode?.options, uniqueBy),
  //   [countryIndex, gameMode?.options, uniqueBy]
  // );

  function handleSelectCountry(option: string) {
    startTimer(false);
    setSelectedCountry(option);

    nextRoundDelay.current = true;
  }

  useTimeout(
    () => {
      if (selectedCountry === correctCountry) {
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

  return {
    selectedCountry,
    gameMode,
    currentCountry,
    options,
    handleSelectCountry,
    setCorrectCountry,
  };
}
