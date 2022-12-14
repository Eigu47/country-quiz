import React from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";

import { Country } from "@/types/country-types";

type Props = {
  option: Country;
  handleSelectCountry: (option: string) => void;
  isCorrect: boolean;
  selected: string | undefined;
};

export default function BiggerOptions({
  option,
  handleSelectCountry,
  isCorrect,
  selected,
}: Props) {
  const [animateRef] = useAutoAnimate<HTMLDivElement>();

  const currentClass =
    selected && isCorrect ? CORRECT : selected && !isCorrect ? WRONG : "";

  return (
    <article className="flex h-full w-full flex-1 flex-col justify-center text-xl sm:w-auto sm:text-2xl">
      <p className={`whitespace-nowrap ${currentClass}`}>{option.name}</p>
      <button
        className="relative h-full w-full"
        onClick={() => {
          if (!selected) handleSelectCountry(option.name);
        }}
        disabled={!!selected}
      >
        <Image
          src={option.flag}
          alt="Flag"
          objectFit="contain"
          layout="fill"
          priority
        />
      </button>
      <div ref={animateRef} className="min-h-[28px]">
        {selected && (
          <p className={currentClass}>
            {option.area.toLocaleString() + " km²"}
          </p>
        )}
      </div>
    </article>
  );
}

const CORRECT = "text-emerald-600 font-bold";
const WRONG = "text-red-500 font-bold";
