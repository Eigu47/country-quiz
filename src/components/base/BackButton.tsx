import React from "react";

import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";

import { TIME_LIMIT } from "@/constants/game-const";
import { useRoundStore, useTimerStore } from "@/utils/store";

export default function BackButton() {
  const router = useRouter();
  const { round, resetRound } = useRoundStore();
  const startTimer = useTimerStore((state) => state.startTimer);

  return (
    <button
      className="absolute -top-11 left-2 rounded-full bg-slate-300 text-4xl ring-1 ring-black/50 duration-100 hover:scale-110 active:scale-95 sm:-top-14 sm:text-5xl"
      onClick={() => {
        if (round !== null) {
          startTimer(false, TIME_LIMIT);
          resetRound();
        }
        if (round === null) {
          router.push("/");
        }
      }}
    >
      <BiChevronLeft />
    </button>
  );
}
