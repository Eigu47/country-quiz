import React from "react";

import {
  BsCircle,
  BsFillCheckCircleFill,
  BsFillXCircleFill,
} from "react-icons/bs";

type Props = {
  option: string;
  handleSelectCountry: (option: string) => void;
  state: "correct" | "incorrect" | "unanswered" | "unselected";
};

export default function QuizChoicesOption({
  option,
  handleSelectCountry,
  state,
}: Props) {
  const currentClass =
    state === "unanswered"
      ? UNANSWERED_CLASS
      : state === "correct"
      ? CORRECT_CLASS
      : state === "incorrect"
      ? INCORRECT_CLASS
      : UNSELECTED_CLASS;

  return (
    <button
      key={option}
      className={`flex items-center justify-between rounded-xl py-2 px-6 text-lg ring-2 duration-200 sm:py-3 sm:px-10 sm:text-2xl [&_svg]:duration-200 ${currentClass}`}
      onClick={() => {
        if (state === "unanswered") handleSelectCountry(option);
      }}
    >
      {option}
      {(state === "unanswered" || state === "unselected") && <BsCircle />}
      {state === "correct" && <BsFillCheckCircleFill />}
      {state === "incorrect" && <BsFillXCircleFill />}
    </button>
  );
}

const UNANSWERED_CLASS =
  "text-slate-50 ring-slate-50 hover:ring-emerald-500 [&_svg]:hover:text-emerald-500";

const UNSELECTED_CLASS = "cursor-default text-slate-50 ring-slate-50";

const CORRECT_CLASS = "cursor-default text-emerald-500 ring-emerald-500";

const INCORRECT_CLASS = "cursor-default text-red-500 ring-red-500";
