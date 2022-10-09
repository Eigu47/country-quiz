import React from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useRoundStore } from "../../utils/store";
import QuizCardTimer from "./QuizCardTimer";

type Props = {
  gameName: string;
  children: React.ReactNode;
};

export default function QuizCard({ gameName, children }: Props) {
  const round = useRoundStore((state) => state.round);

  const [imageParent] = useAutoAnimate<HTMLDivElement>();
  const [roundParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <section className="relative mx-auto mt-24 w-full rounded-xl bg-indigo-50 sm:mt-40 sm:w-4/6">
      <QuizCardTimer />
      <div
        ref={roundParent}
        className="my-4 mx-4 flex justify-between text-black sm:text-xl"
      >
        <p>{gameName}</p>
        {round !== null && (
          <p className="whitespace-nowrap">Round {round + 1}</p>
        )}
      </div>
      <div
        ref={imageParent}
        className="my-10 mx-auto flex h-36 w-full flex-col-reverse sm:h-52 sm:w-80"
      >
        {children}
      </div>
    </section>
  );
}
