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

export default function QuizChoicesBigger({
  option,
  handleSelectCountry,
  isCorrect,
  selected,
}: Props) {
  const [animateRef] = useAutoAnimate<HTMLDivElement>();

  const currentClass =
    selected !== undefined && isCorrect
      ? CORRECT
      : selected !== undefined && !isCorrect
      ? WRONG
      : "";

  return (
    <article className="flex h-full w-full flex-col justify-center">
      <p
        className={`w-full whitespace-nowrap text-xl text-black ${currentClass}`}
      >
        {option.name}
      </p>
      <button
        className="relative h-full w-full"
        onClick={() => {
          if (selected === undefined) handleSelectCountry(option.name);
        }}
        disabled={selected !== undefined}
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
        {selected !== undefined && (
          <p className={`w-full text-xl ${currentClass}`}>
            {option.area.toLocaleString() + " km²"}
          </p>
        )}
      </div>
    </article>
  );
}

const CORRECT = "text-emerald-600 font-bold";
const WRONG = "text-red-500 font-bold";
