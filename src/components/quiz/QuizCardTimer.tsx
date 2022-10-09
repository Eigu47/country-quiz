import React from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { TIME_LIMIT } from "../../constants/game-const";
import { useTimerStore } from "../../utils/store";

export default function QuizCardTimer() {
  const { timeLeft, isTimerRunning, isTimeLeft } = useTimerStore();

  const [timerParent] = useAutoAnimate<HTMLDivElement>();

  const circleDashArray = `${((timeLeft / TIME_LIMIT) * 283).toFixed(0)} 283`;

  const pathColor =
    timeLeft / TIME_LIMIT < 0.25
      ? "#b91c1c"
      : timeLeft / TIME_LIMIT < 0.5
      ? "#f59e0b"
      : "#10b981";

  const transitionSpeed =
    !isTimerRunning && isTimeLeft ? "0.4s ease-out all" : "1s linear all";

  const timerLabel =
    !isTimerRunning && !isTimeLeft
      ? 0
      : !isTimerRunning && isTimeLeft
      ? timeLeft
      : timeLeft + 1;

  return (
    <>
      <div
        ref={timerParent}
        className="absolute -top-16 left-[calc(50%-64px)] flex h-32 w-32 items-center justify-center rounded-full bg-indigo-50  shadow ring-1 ring-black/10"
      >
        {}
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
                transition: transitionSpeed,
              }}
              cx="50"
              cy="50"
              r="44"
              d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
            />
          </g>
        </svg>
      </div>
      <p className="absolute -top-5 left-[calc(50%-40px)] mx-auto w-20 text-4xl">
        {timerLabel}
      </p>
    </>
  );
}
