import React from "react";

import { BsCircle, BsCircleFill, BsCheck2Circle } from "react-icons/bs";

type Props = {
  options: string[];
};

export default function QuizChoices({ options }: Props) {
  return (
    <section className="mx-auto my-20 flex h-full w-80 flex-col justify-between text-2xl text-slate-50 sm:w-4/6">
      {options.map((option) => (
        <button
          key={option}
          className="flex items-center justify-between rounded-xl py-3 px-10 ring-2 ring-slate-50 hover:ring-emerald-500 [&_svg]:hover:text-emerald-500"
        >
          <p>{option}</p>
          <BsCircle className="text-3xl" />
        </button>
      ))}
    </section>
  );
}
