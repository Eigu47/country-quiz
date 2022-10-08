import React from "react";

import { useTimerStore } from "../../utils/store";

type Props = {
  timeLimit: number;
};

export default function QuizCardTimer({ timeLimit }: Props) {
  const { timeLeft, isTimerRunning, isTimeOver } = useTimerStore();

  const circleDashArray = `${
    isTimeOver
      ? 0
      : (
          (timeLeft / timeLimit -
            (1 / timeLimit) * (1 - timeLeft / timeLimit)) *
          283
        ).toFixed(0)
  } 283`;

  const pathColor =
    timeLeft / timeLimit < 0.25
      ? "#b91c1c"
      : timeLeft / timeLimit < 0.5
      ? "#f59e0b"
      : "#10b981";

  const normal = "1s linear all";

  const final = "0.2 linear all";

  const start = "0.2s ease-in-out all";

  const transitionAnimation =
    !isTimerRunning && isTimeOver ? start : isTimeOver ? final : normal;

  return (
    <>
      <div className="absolute -top-16 left-[calc(50%-64px)] flex h-32 w-32 items-center justify-center rounded-full bg-indigo-50  shadow ring-1 ring-black/10">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g style={{ fill: "none", stroke: "none" }}>
            <circle
              strokeDasharray={circleDashArray}
              style={{
                strokeWidth: "6px",
                stroke: pathColor,
                // strokeLinecap: "round",
                rotate: "-90deg",
                transformOrigin: "center",
                transition: transitionAnimation,
              }}
              cx="50"
              cy="50"
              r="44"
            />
          </g>
        </svg>
      </div>
      <p className="absolute -top-5 left-[calc(50%-40px)] mx-auto w-20 text-4xl">
        {timeLeft}
      </p>
    </>
  );
}
