import React from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import QuizCardTimer from "@/components/quiz-card/QuizCardTimer";
import useGetGameMode from "@/utils/hooks/useGetGameMode";
import { useRoundStore } from "@/utils/store";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function QuizCard({ children, className }: Props) {
  const gameMode = useGetGameMode();
  const round = useRoundStore((state) => state.round);

  const [imageParent] = useAutoAnimate<HTMLDivElement>();
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
        ref={imageParent}
        className={`mx-auto my-8 mb-6 flex h-32 w-full flex-col justify-end sm:my-10 sm:h-52 ${className}`}
      >
        {round === null && (
          <p className="my-auto text-2xl">{gameMode?.description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
