import React from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import BackButton from "@/components/base/BackButton";
import QuizCardTimer from "@/components/base/QuizCardTimer";
import StartButton from "@/components/base/StartButton";
import useGetGameMode from "@/utils/hooks/useGetGameMode";
import { useRoundStore } from "@/utils/store";

type Props = {
  children: React.ReactNode;
  nextCountry: () => void;
  className?: string;
};

export default function QuizCard({ children, nextCountry, className }: Props) {
  const gameMode = useGetGameMode();
  const { round } = useRoundStore();

  const [cardParent] = useAutoAnimate<HTMLDivElement>();
  const [roundParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <section className="relative mx-auto mt-24 w-full rounded-xl bg-indigo-50 sm:mt-40 sm:w-4/6">
      <QuizCardTimer />
      <div
        ref={roundParent}
        className="flex justify-between py-3 px-3 text-black sm:py-4 sm:px-4 sm:text-xl"
      >
        <p>{gameMode?.title}</p>
        {round !== null && (
          <p className="whitespace-nowrap">Round {round + 1}</p>
        )}
      </div>
      <div
        ref={cardParent}
        className={`mx-auto my-6 flex h-32 w-full flex-col sm:h-52 ${className}`}
      >
        {children}
        {round === null && (
          <p className="my-auto px-3 text-2xl sm:text-4xl">
            {gameMode?.description}
          </p>
        )}
        {round === null && <StartButton nextCountry={nextCountry} />}
      </div>
      <BackButton />
    </section>
  );
}
