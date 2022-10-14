import React, { useEffect } from "react";

import Image from "next/image";

import CloserOption from "@/components/closer/CloserOption";
import useQuizChoices from "@/utils/hooks/useQuizChoices";

type Props = {
  randomIndexes: number[];
  nextCountry: () => void;
};

export default function CloserChoices({ randomIndexes, nextCountry }: Props) {
  const {
    selectedCountry,
    options: rawOptions,
    currentCountry,
    handleSelectCountry,
    setCorrectCountry,
  } = useQuizChoices(randomIndexes, nextCountry);

  const options = rawOptions.filter(
    (option) => option.name !== currentCountry?.name
  );

  const distance0 =
    options[0] && getDistance(currentCountry?.latlng, options[0].latlng);
  const distance1 =
    options[1] && getDistance(currentCountry?.latlng, options[1].latlng);

  const correctCountryIsValid =
    distance0 && distance1 && options[0] && options[1];

  const correctCountry =
    correctCountryIsValid && distance0 < distance1
      ? options[0]
      : correctCountryIsValid
      ? options[1]
      : undefined;

  useEffect(() => {
    setCorrectCountry(correctCountry?.name);
  }, [correctCountry?.name, setCorrectCountry]);

  // TODO check overflow
  return (
    <div className="mx-auto flex h-full w-full flex-col gap-3 overflow-hidden px-6">
      {currentCountry && (
        <article className="flex h-2/5 flex-col">
          <p className="text-xl sm:text-2xl">{currentCountry.name}</p>
          <div className="relative h-full w-full">
            <Image
              src={currentCountry.flag}
              alt="Flag"
              objectFit="contain"
              layout="fill"
              priority
            />
          </div>
        </article>
      )}
      <div className="flex h-3/5 w-full justify-center gap-3 sm:gap-6">
        {options[0] && options[1] && (
          <>
            <CloserOption
              option={options[0]}
              isCorrect={correctCountry?.name === options[0].name}
              selected={selectedCountry}
              distance={distance0}
              handleSelectCountry={handleSelectCountry}
            />
            <CloserOption
              option={options[1]}
              isCorrect={correctCountry?.name === options[1].name}
              selected={selectedCountry}
              distance={distance1}
              handleSelectCountry={handleSelectCountry}
            />
          </>
        )}
      </div>
    </div>
  );
}

function getDistance(
  pointA: number[] | undefined,
  pointB: number[] | undefined
) {
  if (
    pointA?.[0] === undefined ||
    pointA?.[1] === undefined ||
    pointB?.[0] === undefined ||
    pointB?.[1] === undefined
  )
    return;

  const R = 6371;
  const dLat = (pointB[0] - pointA[0]) * (Math.PI / 180);
  const dLon = (pointB[1] - pointA[1]) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(pointA[0] * (Math.PI / 180)) *
      Math.cos(pointB[0] * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = Math.round(R * c * 100) / 100;
  return d;
}
