import React, { useEffect } from "react";

import BiggerOption from "@/components/bigger/BiggerOption";
import useQuizChoices from "@/utils/hooks/useQuizChoices";

type Props = {
  randomIndexes: number[];
  nextCountry: () => void;
};

export default function BiggerChoices({ randomIndexes, nextCountry }: Props) {
  const { selectedCountry, options, handleSelectCountry, setCorrectCountry } =
    useQuizChoices(randomIndexes, nextCountry);

  const biggestArea = Math.max(...options.map((option) => option.area));
  const biggestCountry = options.find((option) => option.area === biggestArea);

  useEffect(() => {
    setCorrectCountry(biggestCountry?.name);
  }, [biggestCountry?.name, setCorrectCountry]);

  return (
    <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-2xl sm:flex-row sm:gap-6">
      {options[0] && options[1] && (
        <>
          <BiggerOption
            option={options[0]}
            isCorrect={biggestCountry?.name === options[0].name}
            selected={selectedCountry}
            handleSelectCountry={handleSelectCountry}
          />
          <p>VS</p>
          <BiggerOption
            option={options[1]}
            isCorrect={biggestCountry?.name === options[1].name}
            selected={selectedCountry}
            handleSelectCountry={handleSelectCountry}
          />
        </>
      )}
    </div>
  );
}
