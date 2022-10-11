import React from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import useGetGameMode from "../../utils/hooks/useGetGameMode";
import { useRoundStore } from "../../utils/store";
import QuizCardTimer from "./QuizCardTimer";

type Props = {
  children: React.ReactNode;
};

export default function QuizCard({ children }: Props) {
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
        className="my-8 mx-auto flex h-36 w-full flex-col justify-end sm:my-10 sm:h-52 sm:w-80"
      >
        {round === null && (
          <p className="my-auto text-2xl">{gameMode?.description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
