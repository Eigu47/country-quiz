import React from "react";

import { useTimerStore } from "../../utils/store";

type Props = {
  initialTimer: number;
};

export default function QuizCardTimer({ initialTimer }: Props) {
  const timer = useTimerStore((state) => state.timer);

  const rotation = ((initialTimer - timer) * 180 * 2) / initialTimer;

  return (
    <>
      <div className="absolute -top-16 left-[calc(50%-64px)] flex h-32 w-32 items-center justify-center rounded-full bg-indigo-50 shadow ring-1 ring-black/10">
        <div className="absolute flex h-[120px] w-[120px] overflow-hidden rounded-full">
          <div
            className={`h-full w-1/2 origin-right bg-emerald-500 transition-all ${
              timer >= initialTimer / 2 ? "block" : "hidden"
            }`}
            style={{ rotate: `-${rotation}deg` }}
          />
          <div
            className={`h-full w-1/2 origin-right transition-all ${
              timer !== 0 && "bg-emerald-500"
            }`}
            style={{
              rotate: `-${rotation}deg`,
            }}
          />
          <div
            className={`absolute h-full w-1/2 origin-right ${
              timer >= initialTimer / 2
                ? "rotate-180 bg-emerald-500"
                : "bg-indigo-50"
            }`}
          />
        </div>
        <div className="absolute h-28 w-28 rounded-full bg-indigo-50" />
      </div>
      <p className="absolute -top-5 left-[calc(50%-40px)] mx-auto w-20 text-4xl">
        {timer}
      </p>
    </>
  );
}
