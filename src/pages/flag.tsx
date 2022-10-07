import { useState } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { NextPage } from "next";
import Image from "next/image";

import QuizCard from "../components/quiz/QuizCard";
import QuizChoices from "../components/quiz/QuizChoices";
import { trpc } from "../utils/trpc";
import useTimeout from "../utils/useTimeout";

const TIMER = 10;
const OPTIONS = ["Option 1", "Option 2", "Option 3", "Option 4"];

const Flag: NextPage = () => {
  const [timeLeft, setTimeLeft] = useState(TIMER);
  const [startTimer, setStartTimer] = useState(false);

  const [imageRef] = useAutoAnimate<HTMLImageElement>();

  const { data: quizData } = trpc.useQuery(["countries.getRandomCountry"]);

  useTimeout(
    () => {
      setTimeLeft((prev) => prev - 1);
    },
    startTimer && timeLeft > 0 ? 1000 : null,
    "interval"
  );

  return (
    <main className="container mx-auto flex h-full flex-col text-center">
      <QuizCard
        gameName="Guess by flag"
        round={1}
        timeLeft={timeLeft}
        TIMER={TIMER}
      >
        <div ref={imageRef} className="my-10 mx-auto h-52 w-80">
          {quizData && (
            <Image
              src={quizData.flag}
              alt="Flag"
              layout="fill"
              priority
              onLoad={() => setStartTimer(true)}
            />
          )}
        </div>
      </QuizCard>
      <QuizChoices options={OPTIONS} />
    </main>
  );
};

export default Flag;
