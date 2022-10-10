import React from "react";

import {
  BsCircle,
  BsFillCheckCircleFill,
  BsFillXCircleFill,
} from "react-icons/bs";

import { Country } from "../../types/country-types";
import useGetGameMode from "../../utils/hooks/useGetGameMode";

type Props = {
  option: Country;
  handleSelectCountry: (option: string) => void;
  state: "correct" | "incorrect" | "unanswered" | "unselected";
};

export default function QuizChoicesOption({
  option,
  handleSelectCountry,
  state,
}: Props) {
  const gameMode = useGetGameMode();

  function getCurrentClass() {
    if (state === "unanswered") {
      return "text-slate-50 ring-slate-50 hover:ring-emerald-500 [&_svg]:hover:text-emerald-500";
    }
    if (state === "correct") {
      return "text-emerald-500 ring-emerald-500";
    }
    if (state === "incorrect") {
      return "text-red-500 ring-red-500";
    }
    return "text-slate-50 ring-slate-50";
  }

  return (
    <button
      className={`flex items-center justify-between rounded-xl py-2 px-6 text-lg ring-2 duration-200 sm:py-3 sm:px-10 sm:text-2xl [&_svg]:duration-200 ${getCurrentClass()}`}
      onClick={() => {
        if (state === "unanswered") handleSelectCountry(option.name);
      }}
      disabled={state !== "unanswered"}
    >
      {gameMode?.options === "name" && option.name}
      {(state === "unanswered" || state === "unselected") && <BsCircle />}
      {state === "correct" && <BsFillCheckCircleFill />}
      {state === "incorrect" && <BsFillXCircleFill />}
    </button>
  );
}
