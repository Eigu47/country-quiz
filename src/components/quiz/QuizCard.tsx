import React from "react";

type Props = {
  gameName: string;
  round: number;
  timeLeft: number;
  TIMER: number;
  children: React.ReactNode;
};

export default function QuizCard({
  gameName,
  round,
  timeLeft,
  TIMER,
  children,
}: Props) {
  const rotation = ((TIMER - timeLeft) * 180 * 2) / TIMER;

  return (
    <section className="relative mx-auto mt-40 rounded-xl bg-indigo-50 sm:w-4/6">
      <div className="absolute -top-16 left-[calc(50%-64px)] flex h-32 w-32 items-center justify-center rounded-full bg-indigo-50 shadow ring-1 ring-black/10">
        <div className="absolute flex h-[120px] w-[120px] overflow-hidden rounded-full">
          <div
            className={`h-full w-1/2 origin-right bg-emerald-500 transition-all ${
              timeLeft >= TIMER / 2 ? "block" : "hidden"
            }`}
            style={{ rotate: `-${rotation}deg` }}
          />
          <div
            className={`h-full w-1/2 origin-right transition-all ${
              timeLeft !== 0 && "bg-emerald-500"
            }`}
            style={{
              rotate: `-${rotation}deg`,
            }}
          />
          <div
            className={`absolute h-full w-1/2 origin-right ${
              timeLeft >= TIMER / 2
                ? "rotate-180 bg-emerald-500"
                : "bg-indigo-50"
            }`}
          />
        </div>
        <div className="absolute h-28 w-28 rounded-full bg-indigo-50" />
      </div>
      <p className="absolute -top-5 left-[calc(50%-40px)] mx-auto w-20 text-4xl">
        {timeLeft}
      </p>
      <div className="my-4 mx-4 flex justify-between text-xl text-black">
        <p>{gameName}</p>
        <p>Round {round}</p>
      </div>
      {children}
    </section>
  );
}
