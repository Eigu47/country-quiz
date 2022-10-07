import React, { useState } from "react";

import useTimeout from "../../utils/useTimeout";

type Props = {
  round: number | undefined;
  timer: number;
};

export default function QuizCardTimer({ round, timer }: Props) {
  const [timeLeft, setTimeLeft] = useState(timer);

  useTimeout(
    () => {
      setTimeLeft((prev) => prev - 1);
    },
    1000,
    round !== undefined && timeLeft > 0,
    "interval"
  );

  const rotation = ((timer - timeLeft) * 180 * 2) / timer;

  return (
    <>
      <div className="absolute -top-16 left-[calc(50%-64px)] flex h-32 w-32 items-center justify-center rounded-full bg-indigo-50 shadow ring-1 ring-black/10">
        <div className="absolute flex h-[120px] w-[120px] overflow-hidden rounded-full">
          <div
            className={`h-full w-1/2 origin-right bg-emerald-500 transition-all ${
              timeLeft >= timer / 2 ? "block" : "hidden"
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
              timeLeft >= timer / 2
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
    </>
  );
}
