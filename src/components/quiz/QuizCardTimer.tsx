import React from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useTimerStore } from "../../utils/store";

type Props = {
  timeLimit: number;
};

export default function QuizCardTimer({ timeLimit }: Props) {
  const timer = useTimerStore((state) => state.timer);

  const [timerParent] = useAutoAnimate<HTMLDivElement>();

  const circleDashArray = `${
    timer === 0
      ? 0
      : (
          (timer / timeLimit - (1 / timeLimit) * (1 - timer / timeLimit)) *
          283
        ).toFixed(0)
  } 283`;

  const pathColor =
    timer / timeLimit < 0.25
      ? "#b91c1c"
      : timer / timeLimit < 0.5
      ? "#f59e0b"
      : "#10b981";

  return (
    <>
      <div
        ref={timerParent}
        className="absolute -top-16 left-[calc(50%-64px)] flex h-32 w-32 items-center justify-center rounded-full bg-indigo-50  shadow ring-1 ring-black/10"
      >
        {timer !== 0 && (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g style={{ fill: "none", stroke: "none" }}>
              <circle
                stroke-dasharray={circleDashArray}
                style={{
                  strokeWidth: "6px",
                  stroke: pathColor,
                  // strokeLinecap: "round",
                  rotate: "-90deg",
                  transformOrigin: "center",
                  transition: "1s linear all",
                }}
                cx="50"
                cy="50"
                r="44"
              />
            </g>
          </svg>
        )}
      </div>
      <p className="absolute -top-5 left-[calc(50%-40px)] mx-auto w-20 text-4xl">
        {timer}
      </p>
    </>
  );
}
