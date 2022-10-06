import { useState } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { NextPage } from "next";
import Image from "next/image";
import { BsCircle, BsCircleFill, BsCheck2Circle } from "react-icons/bs";

import { trpc } from "../utils/trpc";
import useTimeout from "../utils/useTimeout";

const TIMER = 10;
const OPTIONS = ["Option 1", "Option 2", "Option 3", "Option 4"];

const Flag: NextPage = () => {
  const [timeLeft, setTimeLeft] = useState(TIMER);
  const [startTimer, setStartTimer] = useState(false);

  const { data, isLoading } = trpc.useQuery(["countries.getRandomCountry"]);
  const [imageRef] = useAutoAnimate<HTMLDivElement>();

  useTimeout(
    () => {
      setTimeLeft((prev) => prev - 1);
    },
    startTimer && timeLeft > 0 ? 1000 : null,
    "interval"
  );

  const rotation = ((TIMER - timeLeft) * 180 * 2) / TIMER;

  return (
    <main className="container mx-auto flex h-full flex-col text-center">
      <section className="relative mx-auto mt-40 rounded-xl bg-indigo-50 sm:w-4/6">
        <div className="absolute -top-16 left-[calc(50%-64px)] flex h-32 w-32 items-center justify-center rounded-full bg-indigo-50 shadow ring-1 ring-black/10">
          <div className="absolute flex h-[120px] w-[120px] overflow-hidden rounded-full">
            <div
              className={`h-full w-1/2 origin-right bg-emerald-500 transition-all ${
                timeLeft >= TIMER / 2 ? "block" : "hidden"
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
                timeLeft >= TIMER / 2
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
        <div className="my-4 mx-4 flex justify-between text-xl text-black">
          <p>Guess by flag</p>
          <p>Round 1</p>
        </div>
        <div ref={imageRef} className="my-10 mx-auto h-52 w-80">
          {!isLoading && data && (
            <Image
              src={data.flag}
              alt="Flag"
              layout="fill"
              priority
              onLoad={() => setStartTimer(true)}
            />
          )}
        </div>
      </section>
      <section className="mx-auto my-20 flex h-full w-80 flex-col justify-between text-2xl text-slate-50 sm:w-4/6">
        {OPTIONS.map((option) => (
          <button
            key={option}
            className="flex items-center justify-between rounded-xl py-3 px-10 ring-2 ring-slate-50 hover:ring-emerald-500 [&_svg]:hover:text-emerald-500"
          >
            <p>{option}</p>
            <BsCircle className="text-3xl" />
          </button>
        ))}
      </section>
    </main>
  );
};

export default Flag;
