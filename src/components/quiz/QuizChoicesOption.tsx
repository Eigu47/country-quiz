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
      className={currentClass}
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
  "flex items-center justify-between rounded-xl py-3 px-10 text-2xl text-slate-50 ring-2 ring-slate-50 duration-200 hover:ring-emerald-500 [&_svg]:hover:text-emerald-500 [&_svg]:duration-200";

const UNSELECTED_CLASS =
  "flex cursor-default items-center justify-between rounded-xl py-3 px-10 text-2xl text-slate-50 ring-2 ring-slate-50 duration-200 [&_svg]:duration-200";

const CORRECT_CLASS =
  "flex cursor-default items-center justify-between rounded-xl py-3 px-10 text-2xl text-emerald-500 ring-2 ring-emerald-500 duration-200 [&_svg]:duration-200";

const INCORRECT_CLASS =
  "flex cursor-default items-center justify-between rounded-xl py-3 px-10 text-2xl text-red-500 ring-2 ring-red-500 duration-200 [&_svg]:duration-200";
