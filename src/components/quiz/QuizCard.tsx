import React from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import QuizCardTimer from "./QuizCardTimer";

type Props = {
  gameName: string;
  round: number | undefined;
  timeLimit: number;
  children: React.ReactNode;
};

export default function QuizCard({
  gameName,
  round,
  timeLimit,
  children,
}: Props) {
  const [imageParent] = useAutoAnimate<HTMLDivElement>();
  const [roundParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <section className="relative mx-auto mt-40 rounded-xl bg-indigo-50 sm:w-4/6">
      <QuizCardTimer timeLimit={timeLimit} />
      <div
        ref={roundParent}
        className="my-4 mx-4 flex justify-between text-xl text-black"
      >
        <p>{gameName}</p>
        {round !== 0 && <p className="whitespace-nowrap">Round {round}</p>}
      </div>
      <div ref={imageParent} className="my-10 mx-auto flex h-52 w-80">
        {children}
      </div>
    </section>
  );
}
